import {Meta} from "@/lib/api/models/common/meta";

export interface Organization {
    _id: string; // ObjectId serialized as string
    dbName: string;
    name: string;
    logo?: string;
    address?: string;
    phoneNumber?: string;
    email?: string;
    website?: string;
    description?: string;
    services?: string[];
    employees?: string[];
    meta: Meta;
}
