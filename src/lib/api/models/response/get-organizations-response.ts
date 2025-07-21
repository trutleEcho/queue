import { ApiResponse } from "@/lib/api/models/common/api-response";

export interface GetOrganizationsResponse extends ApiResponse<OrganizationData[]> {
    data: OrganizationData[];
}

export interface OrganizationData {
    organizationId: string;
    organizationName: string;
}
