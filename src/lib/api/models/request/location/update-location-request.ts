import {LocationMeta} from "@/lib/api/models/common/locationMeta";

export interface UpdateLocationRequest {
    organizationId: string;
    locationId: string;
    phoneNumber?: string | null;
    locationMeta?: LocationMeta | null;
}