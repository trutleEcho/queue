// app/org/[dashboard]/server.ts
import {fetchData} from "@/lib/api/fetchData";
import {ApiEndpoints} from "@/lib/api/endpoints";
import {GetOrganizationResponse} from "@/lib/api/models/response/get-organization-response";
import {GetOrganizationLocationsResponse} from "@/lib/api/models/response/get-organization-locations-response";
import {notFound} from "next/navigation";
import {CreateLocationRequest} from "@/lib/api/models/request/location/create-location-request";
import {BooleanResponse} from "@/lib/api/models/response/boolean-response";
import {UpdateLocationRequest} from "@/lib/api/models/request/location/update-location-request";
import {UpdateLocationStatusRequest} from "@/lib/api/models/request/location/update-location-status-request";
import {GetLocationHostResponse} from "@/lib/api/models/response/get-location-host-response";
import {CreateHostRequest} from "@/lib/api/models/request/host/create-host-request";
import {UpdateHostRequest} from "@/lib/api/models/request/host/update-host-request";
import {UpdateHostStatusRequest} from "@/lib/api/models/request/host/update-host-status-request";
import {DeleteHostRequest} from "@/lib/api/models/request/host/delete-host-request";
import {GetHostTokens} from "@/lib/api/models/response/get-host-tokens";
import {CreateTokenRequest} from "@/lib/api/models/request/token/create-token-request";
import {UpdateTokenRequest} from "@/lib/api/models/request/token/update-token-request";
import {DeleteTokenRequest} from "@/lib/api/models/request/token/delete-token-request";

/**
 * Fetch organization by name. Redirects to Not Found page if not found.
 */
export async function getOrganization(
    orgId: string
): Promise<GetOrganizationResponse> {
    try {
        const res = await fetchData<GetOrganizationResponse>(
            `${ApiEndpoints.organization.fetch}?orgId=${encodeURIComponent(orgId)}`,
            {method: "GET"}
        );

        if (!res || !res.data) {
            notFound(); // redirects to not-found.tsx
        }

        return res;
    } catch (error) {
        // If fetch fails or org not found, fallback to not found page
        throw error;
    }
}

{/* Location API */
}

export async function getOrganizationLocations(orgId: string, query?: string): Promise<GetOrganizationLocationsResponse> {
    try {
        return await fetchData<GetOrganizationLocationsResponse>(
            `${ApiEndpoints.location.fetch}?orgId=${encodeURIComponent(orgId)}${query ? `&${query}` : ''}`,
            {method: "GET"}
        );
    } catch (error) {
        throw error;
    }
}

export function createOrganizationLocation(request: CreateLocationRequest): Promise<BooleanResponse> {
    try {
        return fetchData<BooleanResponse>(`${ApiEndpoints.location.create}`, {
            method: "POST",
            body: JSON.stringify(request)
        });
    } catch (error) {
        throw error;
    }
}

export async function updateOrganizationLocation(request: UpdateLocationRequest): Promise<BooleanResponse> {
    try {
        return await fetchData<BooleanResponse>(`${ApiEndpoints.location.update}`, {
                method: "PATCH",
                body: JSON.stringify(request)
            }
        );
    } catch (error) {
        throw error;
    }
}

export async function updateOrganizationLocationStatus(request: UpdateLocationStatusRequest): Promise<BooleanResponse> {
    try {
        return await fetchData<BooleanResponse>(`${ApiEndpoints.location.updateStatus}`, {
                method: "PATCH",
                body: JSON.stringify(request)
            }
        );
    } catch (error) {
        throw error;
    }
}

// export async function deleteOrganizationLocation(locationId: string): Promise<BooleanResponse> {
//     try {
//         return await fetchData<BooleanResponse>(`${ApiEndpoints.location.delete}?locationId=${encodeURIComponent(locationId)}`, {method: "DELETE"});
//     } catch (error) {
//         throw error;
//     }
// }

{/* Host API */
}

export async function getLocationHosts(orgId: string, hostId: string): Promise<GetLocationHostResponse> {
    try {
        return await fetchData<GetLocationHostResponse>(
            `${ApiEndpoints.host.fetch}?orgId=${encodeURIComponent(orgId)}&hostId=${encodeURIComponent(hostId)}`,
            {method: "GET"}
        );
    } catch (error) {
        throw error;
    }
}

export async function createLocationHost(request: CreateHostRequest): Promise<BooleanResponse> {
    try {
        return await fetchData<BooleanResponse>(`${ApiEndpoints.host.create}`, {
            method: "POST",
            body: JSON.stringify(request)
        });
    } catch (error) {
        throw error;
    }
}

export async function updateLocationHost(request: UpdateHostRequest): Promise<BooleanResponse> {
    try {
        return await fetchData<BooleanResponse>(`${ApiEndpoints.host.update}`, {
            method: "PATCH",
            body: JSON.stringify(request)
        });
    } catch (error) {
        throw error;
    }
}

export async function updateLocationHostStatus(request: UpdateHostStatusRequest): Promise<BooleanResponse> {
    try {
        return await fetchData<BooleanResponse>(`${ApiEndpoints.host.updateStatus}`, {
            method: "PATCH",
            body: JSON.stringify(request)
        });
    } catch (error) {
        throw error;
    }
}

export async function deleteLocationHost(request: DeleteHostRequest): Promise<BooleanResponse> {
    try {
        return await fetchData<BooleanResponse>(`${ApiEndpoints.host.delete}`, {
            method: "DELETE",
            body: JSON.stringify(request)
        });
    } catch (error) {
        throw error;
    }
}

{/* Token API */
}

export async function getHostTokens(
    orgId: string,
    locationId?: string,
    hostId?: string,
    startDate?: string,
    endDate?: string,
    query?: string
): Promise<GetHostTokens> {
    try {
        const url = `${ApiEndpoints.token.fetch}?orgId=${encodeURIComponent(orgId)}${
            locationId ? `&locationId=${encodeURIComponent(locationId)}` : ''
        }${
            hostId ? `&hostId=${encodeURIComponent(hostId)}` : ''
        }${
            startDate ? `&startDate=${encodeURIComponent(startDate)}` : ''
        }${
            endDate ? `&endDate=${encodeURIComponent(endDate)}` : ''
        }${
            query ? `&${query}` : ''
        }`;

        return await fetchData<GetHostTokens>(url, {method: "GET"});
    } catch (error) {
        throw error;
    }
}

export async function createHostToken(request: CreateTokenRequest): Promise<BooleanResponse> {
    try {
        return await fetchData<BooleanResponse>(`${ApiEndpoints.token.create}`, {
            method: "POST",
            body: JSON.stringify(request)
        });
    } catch (error) {
        throw error;
    }
}

export async function updateHostToken(request: UpdateTokenRequest): Promise<BooleanResponse> {
    try {
        return await fetchData<BooleanResponse>(`${ApiEndpoints.token.update}`, {
            method: "PATCH",
            body: JSON.stringify(request)
        });
    } catch (error) {
        throw error;
    }
}

export async function deleteHostToken(request: DeleteTokenRequest): Promise<BooleanResponse> {
    try {
        return await fetchData<BooleanResponse>(`${ApiEndpoints.token.delete}`, {
            method: "DELETE",
            body: JSON.stringify(request)
        });
    } catch (error) {
        throw error;
    }
}