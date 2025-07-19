import {ApiResponse} from "@/lib/api/models/common/api-response";
import {Token} from "@/lib/api/models/entity/token";

export interface GetHostTokens extends ApiResponse<Token[]>{
    data: Token[]
}