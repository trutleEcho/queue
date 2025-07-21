import {fetchData} from "@/lib/api/fetchData";
import {ApiEndpoints} from "@/lib/api/endpoints";
import {GetOrganizationsResponse} from "@/lib/api/models/response/get-organizations-response";

export async function getOrganizations(): Promise<GetOrganizationsResponse> {
    try {
        return await fetchData<GetOrganizationsResponse>(
            `${ApiEndpoints.organization.fetchAll}`,
            {method: "GET"}
        );
    } catch (error) {
        // If fetch fails or org not found, fallback to not found page
        throw error;
    }
}