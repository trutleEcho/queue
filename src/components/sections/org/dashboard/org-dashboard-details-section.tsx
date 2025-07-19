import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Organization } from "@/lib/api/models/entity/organization";
import {conversionUtil} from "@/lib/conversion-util";

export default function OrgDashboardOverview({ org }: { org: Organization }) {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>
                    <div className="flex flex-col md:flex-row justify-between gap-2">
                        <span className="text-2xl">Organization Dashboard</span>
                        <span className="text-sm text-muted-foreground">
              Org Name - <span className="text-foreground font-semibold">{org?.name?.toUpperCase() ?? "N/A"}</span>
            </span>
                    </div>
                </CardTitle>
                <CardDescription className="text-muted-foreground">Manage your organization</CardDescription>
            </CardHeader>

            <CardContent>
                <Separator className="mb-4" />

                {/* Organization Details */}
                <section className="space-y-6">
                    <div className="rounded-xl p-4 md:p-5 bg-card shadow-sm">
                        <h2 className="text-sm font-semibold text-muted-foreground mb-4 border-b pb-2">
                            Organization Details
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Detail label="Organization Name" value={org?.dbName?.replaceAll("_", " ") ?? "N/A"} />
                                <Detail label="ID" value={org?._id ?? "N/A"} mono />
                                <Detail label="Email" value={org?.email ?? "N/A"} />
                                <Detail label="Phone" value={org?.phoneNumber ?? "N/A"} />
                            </div>

                            <div className="space-y-2 sm:text-right">
                                <Detail label="Address" value={org?.address ?? "N/A"} />
                                <Detail label="Website" value={org?.website ?? "N/A"} />
                                <Detail label="Joined On" value={org?.meta?.createdAt ? conversionUtil.formatDate(org.meta.createdAt) : "N/A"} />
                            </div>

                            {org?.description && (
                                <div className="col-span-full border-t pt-4">
                                    <Detail label="Description" value={org.description} />
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </CardContent>
        </Card>
    );
}

function Detail({
                    label,
                    value,
                    mono = false,
                    alignRightOnSm = false,
                }: {
    label: string;
    value: string;
    mono?: boolean;
    alignRightOnSm?: boolean;
}) {
    return (
        <div
            className={`flex items-center space-x-2 ${alignRightOnSm ? "sm:justify-end" : ""} overflow-hidden`}
        >
            <span className="text-xs text-muted-foreground whitespace-nowrap">{label}:</span>
            <span
                className={`text-sm text-foreground/80 font-medium truncate ${
                    mono ? "font-mono" : ""
                }`}
                title={value}
            >
        {value}
      </span>
        </div>
    );
}
