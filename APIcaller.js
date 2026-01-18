async function fetchData(endpoint) {
    try {
        const response = await fetch(`https://grooveintheback.onrender.com/api/${endpoint}`, {
            method: "GET"
        });
        
        if (!response.ok) {
            throw new Error(`API responded with status ${response.status}`);
        }
        
        const data = await response.json();
        
        return data.payload; // Return raw data for other endpoints
    } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
        throw error;
    }
}


async function fetchClientRequest() {
    console.log(fetchData("clients"));
    return fetchData("clients");
}

async function fetchBookingsRequest() {
    console.log(await fetchData("bookings"));
    return fetchData("bookings");
}

export { fetchClientRequest, fetchBookingsRequest };