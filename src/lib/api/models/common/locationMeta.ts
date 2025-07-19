import {DailySchedule} from "@/lib/api/models/common/dailySchedule";

export interface LocationMeta {
    address?: string;
    closeTime?: number;
    openTime?: number;
    schedule?: DailySchedule[];
}
