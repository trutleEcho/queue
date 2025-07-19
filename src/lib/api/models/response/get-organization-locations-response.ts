import {ApiResponse} from "@/lib/api/models/common/api-response";
import {Location} from "@/lib/api/models/entity/location";

export interface GetOrganizationLocationsResponse extends ApiResponse<Location[]> {
    data: Location[]
}