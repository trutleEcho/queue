import {ApiResponse} from "@/lib/api/models/common/api-response";

export interface BooleanResponse extends ApiResponse<boolean>{
    data: boolean
}