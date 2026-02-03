const CLIENT_ID = import.meta.env.VITE_AMADEUS_API_KEY;
const CLIENT_SECRET = import.meta.env.VITE_AMADEUS_API_SECRET;

let accessToken = null;
let tokenExpiry = null;

async function getAmadeusToken() {
    if (accessToken && tokenExpiry && Date.now() < tokenExpiry) {
        return accessToken;
    }

    try {
        const response = await fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                grant_type: "client_credentials",
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to fetch access token");
        }

        const data = await response.json();
        accessToken = data.access_token;
        // Expire slightly before actual expiry (expires_in is in seconds)
        tokenExpiry = Date.now() + (data.expires_in - 10) * 1000;
        return accessToken;
    } catch (error) {
        console.error("Error getting Amadeus token:", error);
        throw error;
    }
}

export async function searchCity(keyword) {
    if (!keyword || keyword.length < 2) return [];

    try {
        const token = await getAmadeusToken();
        const response = await fetch(
            `https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY,AIRPORT&keyword=${keyword}&page[limit]=5`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!response.ok) return [];

        const data = await response.json();
        return data.data || [];
    } catch (error) {
        console.warn("City search failed:", error);
        return [];
    }
}

export async function searchFlights({ origin, destination, date, adults = 1, children = 0, infants = 0, tripType = "one-way" }) {
    try {
        const token = await getAmadeusToken();
        const url = new URL("https://test.api.amadeus.com/v2/shopping/flight-offers");

        url.searchParams.append("originLocationCode", origin);
        url.searchParams.append("destinationLocationCode", destination);
        url.searchParams.append("departureDate", date);
        url.searchParams.append("adults", adults);
        if (children > 0) url.searchParams.append("children", children);
        if (infants > 0) url.searchParams.append("infants", infants);
        url.searchParams.append("max", "10"); // limit results
        url.searchParams.append("currencyCode", "USD");

        const response = await fetch(url.toString(), {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            const err = await response.text();
            console.error("Flight search error:", err);
            throw new Error("Failed to fetch flights");
        }

        const data = await response.json();
        return data.data || [];

    } catch (error) {
        console.error("Search flights failed:", error);

        // Mock fallback for demonstration
        console.log("Returning mock data due to API failure/limit.");
        return [
            {
                id: "mock-1",
                validatingAirlineCodes: ["EK"],
                price: { total: "850.00", currency: "USD" },
                itineraries: [
                    {
                        duration: "PT14H30M",
                        segments: [
                            {
                                departure: { at: `${date}T10:00:00`, iataCode: origin },
                                arrival: { at: `${date}T20:00:00`, iataCode: "DXB" },
                                number: "202"
                            },
                            {
                                departure: { at: `${date}T22:00:00`, iataCode: "DXB" },
                                arrival: { at: `${date}T08:30:00`, iataCode: destination },
                                number: "204"
                            }
                        ]
                    }
                ]
            },
            {
                id: "mock-2",
                validatingAirlineCodes: ["QR"],
                price: { total: "920.00", currency: "USD" },
                itineraries: [
                    {
                        duration: "PT13H15M",
                        segments: [
                            {
                                departure: { at: `${date}T11:00:00`, iataCode: origin },
                                arrival: { at: `${date}T00:15:00`, iataCode: destination },
                                number: "505"
                            }
                        ]
                    }
                ]
            },
            {
                id: "mock-3",
                validatingAirlineCodes: ["TK"],
                price: { total: "780.00", currency: "USD" },
                itineraries: [
                    {
                        duration: "PT15H00M",
                        segments: [
                            {
                                departure: { at: `${date}T09:00:00`, iataCode: origin },
                                arrival: { at: `${date}T23:59:00`, iataCode: destination },
                                number: "1923"
                            }
                        ]
                    }
                ]
            }
        ];
    }
}
