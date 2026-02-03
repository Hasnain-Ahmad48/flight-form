import { useState, useEffect, useCallback } from "react"
import { useDebounce } from "./useDebounce"
import { searchCity } from "../utils/api"

export function useAutocomplete(initialValue = "") {
    const [query, setQuery] = useState(initialValue)
    const [suggestions, setSuggestions] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [selected, setSelected] = useState(null)

    const debouncedQuery = useDebounce(query, 300)

    useEffect(() => {
        // If we have a selected item and the query matches its name/code, don't search again immediately
        // or if query is empty
        if (!debouncedQuery || debouncedQuery.length < 2) {
            setSuggestions([])
            return
        }

        // specific check: if user just selected something, we might want to avoid re-searching 
        // but here we just search.

        let active = true
        setIsLoading(true)

        searchCity(debouncedQuery).then((results) => {
            if (active) {
                // Format results for consumption
                // Amadeus returns { iataCode, name, address: { cityName, countryName } }
                const formatted = results.map(item => ({
                    label: `${item.address.cityName} (${item.address.cityCode || item.iataCode})`,
                    value: item.iataCode,
                    sub: item.name, // Airport name
                    original: item
                }))
                setSuggestions(formatted)
                setIsLoading(false)
            }
        }).catch(() => {
            if (active) setIsLoading(false)
        })

        return () => {
            active = false
        }
    }, [debouncedQuery])

    return {
        query,
        setQuery,
        suggestions,
        isLoading,
        selected,
        setSelected,
        setSuggestions // allow manual clear
    }
}
