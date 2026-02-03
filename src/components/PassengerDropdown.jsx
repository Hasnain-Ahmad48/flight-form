import { useState } from "react"
import { Users, Minus, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function PassengerDropdown({ passengers, setPassengers }) {
    const total = passengers.adults + passengers.children + passengers.infants

    const updateCount = (type, delta) => {
        setPassengers(prev => {
            const newValue = prev[type] + delta
            if (type === 'adults' && newValue < 1) return prev
            if (newValue < 0) return prev
            return { ...prev, [type]: newValue }
        })
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <Users className="mr-2 h-4 w-4" />
                    <span>{total} Passenger{total !== 1 ? 's' : ''}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80" align="start">
                <DropdownMenuLabel>Select Passengers</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <div className="flex items-center justify-between p-2">
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold">Adults</span>
                        <span className="text-xs text-muted-foreground">Age 12+</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={(e) => { e.preventDefault(); updateCount('adults', -1) }}>
                            <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-4 text-center">{passengers.adults}</span>
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={(e) => { e.preventDefault(); updateCount('adults', 1) }}>
                            <Plus className="h-3 w-3" />
                        </Button>
                    </div>
                </div>

                <div className="flex items-center justify-between p-2">
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold">Children</span>
                        <span className="text-xs text-muted-foreground">Age 2-11</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={(e) => { e.preventDefault(); updateCount('children', -1) }}>
                            <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-4 text-center">{passengers.children}</span>
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={(e) => { e.preventDefault(); updateCount('children', 1) }}>
                            <Plus className="h-3 w-3" />
                        </Button>
                    </div>
                </div>

                <div className="flex items-center justify-between p-2">
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold">Infants</span>
                        <span className="text-xs text-muted-foreground">Under 2</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={(e) => { e.preventDefault(); updateCount('infants', -1) }}>
                            <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-4 text-center">{passengers.infants}</span>
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={(e) => { e.preventDefault(); updateCount('infants', 1) }}>
                            <Plus className="h-3 w-3" />
                        </Button>
                    </div>
                </div>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}
