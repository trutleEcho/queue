import {Meta} from "@/lib/api/models/common/meta";

export interface Token {
    _id: string;
    locationId: string;
    hostId: string;
    name: string;
    phoneNumber: string;
    email?: string;
    token?: string;
    meta: Meta;
}
