import * as React from "react"
import { Check, ChevronsUpDown, Plane } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useAutocomplete } from "@/hooks/useAutocomplete"
import { Skeleton } from "@/components/ui/skeleton"

export function AirportAutocomplete({ value, onChange, placeholder = "Select airport..." }) {
    const [open, setOpen] = React.useState(false)
    const {
        query,
        setQuery,
        suggestions,
        isLoading,
        setSuggestions
    } = useAutocomplete("")

    const handleSelect = (item) => {
        onChange(item.value) // pass IATA code
        setOpen(false)
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    {value
                        ? (value) // Ideally lookup name from value, but for now show value
                        : <span className="text-muted-foreground">{placeholder}</span>}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0" align="start">
                <Command shouldFilter={false}>
                    <CommandInput
                        placeholder="Search city or airport..."
                        value={query}
                        onValueChange={setQuery}
                    />
                    <CommandList>
                        {isLoading && (
                            <div className="p-2 space-y-2">
                                <Skeleton className="h-8 w-full" />
                                <Skeleton className="h-8 w-full" />
                            </div>
                        )}
                        {!isLoading && suggestions.length === 0 && query.length >= 2 && (
                            <CommandEmpty>No results found.</CommandEmpty>
                        )}
                        {!isLoading && (
                            <CommandGroup>
                                {suggestions.map((item) => (
                                    <CommandItem
                                        key={item.value}
                                        value={item.value}
                                        onSelect={() => handleSelect(item)}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === item.value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        <div className="flex flex-col">
                                            <span>{item.label}</span>
                                            <span className="text-xs text-muted-foreground">{item.sub}</span>
                                        </div>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
