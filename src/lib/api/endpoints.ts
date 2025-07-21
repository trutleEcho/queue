const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
    console.warn("⚠️ Missing NEXT_PUBLIC_API_URL. API calls may fail.");
}

export const ApiEndpoints = {
    organization:{
        fetch: `${API_URL}/core/organization`,
        fetchAll: `${API_URL}/core/organization/all`,
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
        validate: `${API_URL}/queue/tokens/validate`,
        create: `${API_URL}/queue/tokens/create`,
        update: `${API_URL}/queue/tokens/update`,
        delete: `${API_URL}/queue/tokens/delete`,
    }
}