import {Meta} from "@/lib/api/models/common/meta";

export interface CreateHostRequest{
    organizationId: string;
    locationId: string;
    locationName: string;
    name: string;
    phoneNumber?: string;
    meta: Meta
}