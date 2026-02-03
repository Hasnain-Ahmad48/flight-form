import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Plane } from "lucide-react"

export function FlightCard({ flight }) {
    // Amadeus returns complex structure. We need to parse it.
    // flight.itineraries[0].segments...
    // flight.price.total
    // flight.validatingAirlineCodes[0]

    const itinerary = flight.itineraries[0]
    const firstSegment = itinerary.segments[0]
    const lastSegment = itinerary.segments[itinerary.segments.length - 1]

    const depTime = new Date(firstSegment.departure.at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const arrTime = new Date(lastSegment.arrival.at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    const duration = itinerary.duration.replace("PT", "").replace("H", "h ").replace("M", "m")
    const stops = itinerary.segments.length - 1

    const airline = flight.validatingAirlineCodes[0]
    const price = flight.price.total
    const currency = flight.price.currency

    return (
        <Card className="mb-4 hover:shadow-md transition-shadow">
            <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    {/* Airline Info */}
                    <div className="flex items-center space-x-4 w-full md:w-1/4">
                        <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center text-xs font-bold text-slate-600">
                            {airline}
                        </div>
                        <div>
                            <p className="font-semibold text-slate-800">Airline {airline}</p>
                            <p className="text-xs text-muted-foreground">Flight {firstSegment.number}</p>
                        </div>
                    </div>

                    {/* Flight Times */}
                    <div className="flex flex-1 items-center justify-between w-full md:w-auto px-0 md:px-8">
                        <div className="text-center">
                            <p className="text-lg font-bold text-slate-800">{depTime}</p>
                            <p className="text-sm text-muted-foreground">{firstSegment.departure.iataCode}</p>
                        </div>

                        <div className="flex flex-col items-center flex-1 px-4">
                            <p className="text-xs text-muted-foreground mb-1">{duration}</p>
                            <div className="w-full h-[2px] bg-slate-300 relative">
                                <Plane className="h-4 w-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary rotate-90" />
                            </div>
                            <p className="text-xs text-flight-blue-600 mt-1 font-medium">
                                {stops === 0 ? "Non-stop" : `${stops} Stop${stops > 1 ? 's' : ''}`}
                            </p>
                        </div>

                        <div className="text-center">
                            <p className="text-lg font-bold text-slate-800">{arrTime}</p>
                            <p className="text-sm text-muted-foreground">{lastSegment.arrival.iataCode}</p>
                        </div>
                    </div>

                    {/* Price & Action */}
                    <div className="flex flex-col items-end justify-center w-full md:w-auto text-right border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-6 mt-4 md:mt-0">
                        <p className="text-2xl font-bold text-slate-900 mb-2">
                            {currency} {price}
                        </p>
                        <Button className="w-full md:w-auto font-semibold">
                            Select
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
