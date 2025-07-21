import {ApiResponse} from "@/lib/api/models/common/api-response";

export interface ValidateTokenResponse extends ApiResponse<number>{
    data: number
}