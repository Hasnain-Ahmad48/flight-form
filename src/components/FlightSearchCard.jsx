import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Search } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

import { TripTypeToggle } from "@/components/TripTypeToggle"
import { AirportAutocomplete } from "@/components/AirportAutocomplete"
import { DatePickerPopover } from "@/components/DatePickerPopover"
import { PassengerDropdown } from "@/components/PassengerDropdown"

export function FlightSearchCard() {
    const navigate = useNavigate()
    const { toast } = useToast()

    const [tripType, setTripType] = useState("one-way")
    const [origin, setOrigin] = useState("")
    const [destination, setDestination] = useState("")
    const [date, setDate] = useState()
    const [passengers, setPassengers] = useState({ adults: 1, children: 0, infants: 0 })
    const [loading, setLoading] = useState(false)

    const handleSearch = async () => {
        if (!origin || !destination || !date) {
            toast({
                variant: "destructive",
                title: "Missing requirements",
                description: "Please select origin, destination, and date.",
            })
            return
        }

        setLoading(true)
        // Simulate tiny delay for UX or just navigate
        setTimeout(() => {
            const searchParams = new URLSearchParams()
            searchParams.set("origin", origin)
            searchParams.set("destination", destination)
            searchParams.set("date", date.toISOString().split('T')[0])
            searchParams.set("adults", passengers.adults)
            searchParams.set("children", passengers.children)
            searchParams.set("infants", passengers.infants)
            searchParams.set("tripType", tripType)

            navigate(`/results?${searchParams.toString()}`)
            setLoading(false)
        }, 500)
    }

    return (
        <Card className="w-full max-w-4xl border-none shadow-2xl bg-white/80 backdrop-blur-md">
            <CardHeader className="pb-2">
                <CardTitle className="text-xl font-medium text-slate-800">
                    <TripTypeToggle value={tripType} onChange={setTripType} />
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    {/* Origin & Destination */}
                    <div className="md:col-span-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-muted-foreground uppercase">From</label>
                            <AirportAutocomplete value={origin} onChange={setOrigin} placeholder="Origin city" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-muted-foreground uppercase">To</label>
                            <AirportAutocomplete value={destination} onChange={setDestination} placeholder="Destination city" />
                        </div>
                    </div>

                    {/* Date */}
                    <div className="md:col-span-3 space-y-1">
                        <label className="text-xs font-semibold text-muted-foreground uppercase">Departure</label>
                        <DatePickerPopover date={date} setDate={setDate} />
                    </div>

                    {/* Passengers */}
                    <div className="md:col-span-2 space-y-1">
                        <label className="text-xs font-semibold text-muted-foreground uppercase">Travelers</label>
                        <PassengerDropdown passengers={passengers} setPassengers={setPassengers} />
                    </div>

                    {/* Search Button */}
                    <div className="md:col-span-2 flex items-end">
                        <Button
                            className="w-full h-10 bg-flight-blue-600 hover:bg-flight-blue-700 text-white font-bold transition-all shadow-lg hover:shadow-xl"
                            onClick={handleSearch}
                            disabled={loading}
                        >
                            {loading ? "Searching..." : (
                                <>
                                    <Search className="mr-2 h-4 w-4" /> Search
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
