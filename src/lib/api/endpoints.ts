const API_URL = "https://dr-tanvisphysiocare-be.onrender.com"

if (!API_URL) {
    console.warn("⚠️ Missing NEXT_PUBLIC_API_URL. API calls may fail.");
}

export const ApiEndpoints = {
    organization:{
        fetch: `${API_URL}/core/organization`
    },
    location: {
        fetch: `${API_URL}/queue/locations`,
        create: `${API_URL}/queue/locations/create`,
        update: `${API_URL}/queue/locations/update`,
        updateStatus: `${API_URL}/queue/locations/update-status`,
    },
    host: {
        fetch: `${API_URL}/queue/hosts`,
        create: `${API_URL}/queue/hosts/create`,
        update: `${API_URL}/queue/hosts/update`,
        updateStatus: `${API_URL}/queue/hosts/update-status`,
        delete: `${API_URL}/queue/hosts/delete`,
    },
    token: {
        fetch: `${API_URL}/queue/tokens`,
        create: `${API_URL}/queue/tokens/create`,
        update: `${API_URL}/queue/tokens/update`,
        delete: `${API_URL}/queue/tokens/delete`,
    }
}