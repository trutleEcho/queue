import {ApiResponse} from "@/lib/api/models/common/api-response";
import {Organization} from "@/lib/api/models/entity/organization";

export interface GetOrganizationResponse extends ApiResponse<Organization>{
    data: Organization
}