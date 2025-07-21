import {Meta} from "@/lib/api/models/common/meta";

export interface CreateTokenRequest {
    organizationId: string
    locationId: string
    hostId: string
    name: string
    phoneNumber: string
    email?: string
    date?: number
    meta: Meta
}