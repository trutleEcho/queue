import {Meta} from "@/lib/api/models/common/meta";
import {LocationMeta} from "@/lib/api/models/common/locationMeta";

export interface Location {
    _id: string;
    organizationId: string;
    hosts: LocationHost[];
    name: string;
    phoneNumber?: string;
    open: boolean;
    locationMeta?: LocationMeta;
    meta: Meta;
}

export interface LocationHost {
    hostId: string;
    hostName: string;
    hostPhoneNumber?: string;
}