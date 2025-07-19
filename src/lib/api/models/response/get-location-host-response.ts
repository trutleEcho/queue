import {ApiResponse} from "@/lib/api/models/common/api-response";
import {Host} from "@/lib/api/models/entity/host";

export interface GetLocationHostResponse extends ApiResponse<Host> {
    data: Host
}