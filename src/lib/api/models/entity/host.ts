import {Meta} from "@/lib/api/models/common/meta";

export interface Host {
    _id: string; // ObjectId serialized as string
    locationId: string;
    locationName: string;
    name: string;
    phoneNumber?: string;
    token?: string;
    hostIn: boolean;
    meta: Meta;
}
