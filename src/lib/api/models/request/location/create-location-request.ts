import {LocationMeta} from "@/lib/api/models/common/locationMeta";
import {Meta} from "@/lib/api/models/common/meta";

export interface CreateLocationRequest {
    organizationId: string;
    name: string;
    phoneNumber?: string | null;
    locationMeta?: LocationMeta | null;
    meta: Meta;
}
