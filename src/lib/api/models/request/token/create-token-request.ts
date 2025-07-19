import {Meta} from "@/lib/api/models/common/meta";

export interface CreateTokenRequest {
    organizationId: string
    locationId: string
    hostId: string
    name: string
    phoneNumber: string
    email?: string
    token?: string
    meta: Meta
}