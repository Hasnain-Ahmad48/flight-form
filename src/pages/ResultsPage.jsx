import { useEffect } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

import { Layout } from "@/components/Layout"
import { FlightCard } from "@/components/FlightCard"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useFetchFlights } from "@/hooks/useFetchFlights"

export function ResultsPage() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const { loading, error, flights, fetchFlights } = useFetchFlights()

    const origin = searchParams.get("origin")
    const destination = searchParams.get("destination")
    const date = searchParams.get("date")
    const adults = searchParams.get("adults")

    useEffect(() => {
        if (origin && destination && date) {
            fetchFlights({ origin, destination, date, adults })
        }
    }, [origin, destination, date, adults, fetchFlights])

    return (
        <Layout>
            <div className="container mx-auto px-4 py-8 min-h-screen">
                <div className="mb-6">
                    <Button variant="ghost" className="text-white hover:text-white hover:bg-white/20" onClick={() => navigate(-1)}>
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Search
                    </Button>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters (scaffold) */}
                    <div className="hidden lg:block w-64 bg-white/90 backdrop-blur rounded-lg p-6 h-fit">
                        <h3 className="font-bold mb-4">Filters</h3>
                        <div className="space-y-4">
                            <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                            <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                            <div className="h-4 bg-slate-200 rounded w-full"></div>
                        </div>
                    </div>

                    {/* Results List */}
                    <div className="flex-1">
                        <div className="mb-4 text-white">
                            <h2 className="text-2xl font-bold">Flights from {origin} to {destination}</h2>
                            <p>{date} • {adults} Adult(s)</p>
                        </div>

                        {loading && (
                            <div className="space-y-4">
                                {[1, 2, 3].map(i => (
                                    <Skeleton key={i} className="h-40 w-full rounded-xl" />
                                ))}
                            </div>
                        )}

                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                                Error fetching flights. Please try again.
                            </div>
                        )}

                        {!loading && !error && flights.length === 0 && (
                            <div className="bg-white/80 p-8 rounded-xl text-center">
                                <p className="text-lg text-slate-600">No flights found for this route/date.</p>
                                <div className="flex flex-col items-center justify-center p-8 text-muted-foreground">

                                    <p className="text-sm mt-2">Try searching between major airports (e.g., LHR to JFK).</p>
                                </div>
                            </div>
                        )}

                        <div className="space-y-4">
                            {flights.map((flight) => (
                                <FlightCard key={flight.id} flight={flight} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
