import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Switch} from "@/components/ui/switch";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {conversionUtil} from "@/lib/conversion-util";
import {Location} from "@/lib/api/models/entity/location";
import {useEffect, useState} from "react";
import {Separator} from "@/components/ui/separator";
import {toast} from "sonner";
import {
    updateOrganizationLocation,
    updateOrganizationLocationStatus
} from "@/app/org/[orgId]/server";
import {FetchError} from "@/lib/api/fetchData";
import {UpdateLocationRequest} from "@/lib/api/models/request/location/update-location-request";
import Loading from "@/components/ui/loading";
import {UpdateLocationStatusRequest} from "@/lib/api/models/request/location/update-location-status-request";

type FormDataType = {
    address?: string;
    phoneNumber?: string;
    openTime?: number;
    closeTime?: number;
};

export default function LocationDetailsBlock({location}: { location: Location }) {
    const [formData, setFormData] = useState<FormDataType>({
        address: "",
        phoneNumber: "",
    });
    const [open, setOpen] = useState(location.open);
    const [loading, setLoading] = useState(false);

    const updateLocationStatus = async () => {
        if (!location) {
            toast.error("No location selected.");
            return;
        }

        try {
            setLoading(true);
            const request: UpdateLocationStatusRequest = {
                organizationId: location.organizationId,
                locationId: location._id,
                open: open
            }
            const response = await updateOrganizationLocationStatus(request);
            if (response.data) {
                toast.success("Location status updated.");
            }
            setLoading(false);
        } catch (error) {
            if (error instanceof FetchError) {
                toast.error(error.message);
            } else {
                toast.error("Unexpected error occurred.");
            }
            setLoading(false);
        }
    }

    const updateLocationDetails = async () => {
        if (!location) {
            toast.error("No location selected.");
            return;
        }

        try {
            setLoading(true);
            const request: UpdateLocationRequest = {
                organizationId: location.organizationId,
                locationId: location._id,
                phoneNumber: formData.phoneNumber,
                locationMeta: {
                    address: formData.address,
                    closeTime: formData.closeTime,
                    openTime: formData.openTime,
                    schedule: location?.locationMeta?.schedule
                }
            }
            const response = await updateOrganizationLocation(request);
            if (response.data) {
                toast.success("Location status updated.");
            }
            setLoading(false);
        } catch (error) {
            if (error instanceof FetchError) {
                toast.error(error.message);
            } else {
                toast.error("Unexpected error occurred.");
            }
            setLoading(false);
        }
    }

    useEffect(() => {
        if (location) {
            setFormData({
                address: location?.locationMeta?.address,
                phoneNumber: location.phoneNumber,
                closeTime: location?.locationMeta?.closeTime,
                openTime: location?.locationMeta?.openTime
            });
        }
    }, [location]);

    useEffect(() => {
        updateLocationStatus();
    }, [open]);

    return (
        <>
            {loading && (<Loading message="Updating location details..."/>)}
            <Card className="w-full mx-auto mb-6">
                <CardHeader className="flex flex-row justify-between items-center">
                    <div>
                        <CardTitle className="text-lg font-bold md:text-xl">
                            Location Details
                        </CardTitle>
                        <CardDescription>
                            View and update your location details
                        </CardDescription>
                    </div>
                    <Button onClick={updateLocationDetails} className="text-xs font-light p-2 md:p-3 md:text-sm">
                        Update Location
                    </Button>
                </CardHeader>

                <CardContent>
                    <Separator className="mb-4"/>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm text-muted-foreground">Location Name:</label>
                                <p className="text-sm font-medium">{location?.name ?? "N/A"}</p>
                            </div>

                            <div>
                                <label className="text-sm text-muted-foreground">Address</label>
                                <Input
                                    value={formData?.address ?? ""}
                                    placeholder="Address"
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            address: e.target.value,
                                        }))
                                    }
                                />
                            </div>

                            <div>
                                <label className="text-sm text-muted-foreground">Phone</label>
                                <Input
                                    value={formData?.phoneNumber ?? ""}
                                    placeholder="Phone Number"
                                    maxLength={10}
                                    onChange={(e) => {
                                        const clean = e.target.value.replace(/[^0-9]/g, '');
                                        setFormData((prev) => ({...prev, phoneNumber: clean}));
                                    }}
                                />
                            </div>
                        </div>

                        <div className="space-y-6 flex flex-col justify-between">
                            <div className="flex flex-row gap-6">
                                <div className="flex flex-col space-y-1">
                                    <label className="text-sm text-muted-foreground">Open Hours:</label>
                                    <Input
                                        type="time"
                                        className="text-sm"
                                        value={conversionUtil.msToTimeString(formData.openTime ?? 28800000)} // 8 AM IST default
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                openTime: conversionUtil.timeStringToMilliseconds(e.target.value),
                                            }))
                                        }
                                    />
                                </div>
                                <div className="flex flex-col space-y-1">
                                    <label className="text-sm text-muted-foreground">Close Hours:</label>
                                    <Input
                                        type="time"
                                        className="text-sm"
                                        value={conversionUtil.msToTimeString(formData.closeTime ?? 61200000)}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                closeTime: conversionUtil.timeStringToMilliseconds(e.target.value)
                                            }))
                                        }
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-sm text-muted-foreground mb-1 block">Location Open</label>
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="open"
                                        checked={open}
                                        onCheckedChange={() => {
                                            setOpen((prev) => !prev);
                                        }}
                                    />
                                    <span className="text-sm text-muted-foreground">
                                        {open ? "Open" : "Closed"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    );
}
