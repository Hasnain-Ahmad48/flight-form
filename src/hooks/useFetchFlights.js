import { useState, useCallback } from "react"
import { searchFlights } from "../utils/api"

export function useFetchFlights() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [flights, setFlights] = useState([])

    const fetchFlights = useCallback(async (searchParams) => {
        setLoading(true)
        setError(null)
        try {
            const results = await searchFlights(searchParams)
            setFlights(results)
        } catch (err) {
            setError(err)
        } finally {
            setLoading(false)
        }
    }, [])

    return { loading, error, flights, fetchFlights }
}
