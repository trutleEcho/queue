export interface UpdateTokenRequest {
    organizationId: string
    tokenId: string
    name: string
    phoneNumber: string
    email?: string
    token?: string
}