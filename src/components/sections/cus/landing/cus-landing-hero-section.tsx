'use client';

import {
    Card,
    CardHeader,
    CardContent, CardFooter
} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {LucideRefreshCcw} from "lucide-react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Skeleton} from "@/components/ui/skeleton";

import {useEffect, useState, useCallback} from "react";
import {toast} from "sonner";

import {Location} from "@/lib/api/models/entity/location";
import {Host} from "@/lib/api/models/entity/host";
import {getLocationHosts, getOrganizationLocations} from "@/app/org/[orgId]/server";
import {FetchError} from "@/lib/api/fetchData";
import ResourceNotFound from "@/components/blocks/resource-not-found";
import {Separator} from "@/components/ui/separator";
import {ErrorBoundary} from "@/components/error-boundary";
import CustomerLocationHostDisplay from "@/components/blocks/customer-location-host-display";
import BookTokenSection from "@/components/sections/cus/landing/book-token-section";

export default function CusLandingHeroSection({orgId}: { orgId: string }) {
    const [loading, setLoading] = useState(true);
    const [locations, setLocations] = useState<Location[]>([]);
    const [location, setLocation] = useState<Location | null>(null);
    const [host, setHost] = useState<Host>();
    const [selectedLocation, setSelectedLocation] = useState<string>("");
    const [selectedHostName, setSelectedHostName] = useState<string>("");
    const [selectedHostId, setSelectedHostId] = useState<string>("");

    const fetchLocations = useCallback(async () => {
        setLoading(true);
        try {
            const response = await getOrganizationLocations(orgId);
            const data = response.data;

            if (data.length === 0) {
                toast.warning("No locations found.");
                setSelectedLocation("No locations");
                setLocation(null);
                setSelectedHostId("");
                setSelectedHostName("");
            } else {
                const defaultLocation = data[0];
                const defaultHost = defaultLocation.hosts?.[0];

                setLocations(data);
                setSelectedLocation(defaultLocation.name);
                setLocation(defaultLocation);
                setSelectedHostName(defaultHost?.hostName ?? "");
                setSelectedHostId(defaultHost?.hostId ?? "");

                // ✅ Use values directly to fetch host data
                if (defaultHost?.hostId) {
                    await fetchLocationHost(defaultLocation.organizationId, defaultHost.hostId);
                }
            }
        } catch (error) {
            if (error instanceof FetchError) {
                toast.error(error.message);
            } else {
                toast.error("Unexpected error occurred.");
            }
        } finally {
            setLoading(false);
        }
    }, [orgId]);

    const fetchLocationHost = async (orgId?: string, hostId?: string) => {
        const organizationId = orgId ?? location?.organizationId;
        const id = hostId ?? selectedHostId;

        if (!organizationId || !id) {
            toast.error("No location or host selected.");
            return;
        }

        try {
            const response = await getLocationHosts(organizationId, id);
            if (response.data) {
                setHost(response.data);
            }
        } catch (error) {
            if (error instanceof FetchError) {
                toast.error(error.message);
            } else {
                toast.error("Unexpected error occurred.");
            }
        }
    };

    const handleHostChange = (value: string) => {
        if (!location?.hosts?.length) {
            toast.error("No hosts found.");
            return;
        }

        const host = location.hosts.find((host) => host.hostName === value);
        if (!host) return;

        setSelectedHostName(host.hostName);
        setSelectedHostId(host.hostId);

        fetchLocationHost(location.organizationId, host.hostId);
    };

    const handleChange = (value: string) => {
        const loc = locations.find((l) => l.name === value) ?? null;
        setSelectedLocation(value);
        setLocation(loc);
        setSelectedHostName(loc?.hosts?.[0]?.hostName ?? "");
        setSelectedHostId(loc?.hosts?.[0]?.hostId ?? "");
    };

    useEffect(() => {
        fetchLocations();
    }, [fetchLocations]);

    if (loading) {
        return (
            <div className="m-5">
                <Card>
                    <CardHeader>
                        <Skeleton className="h-6 w-1/3 mb-2"/>
                        <Skeleton className="h-4 w-2/3"/>
                    </CardHeader>
                    <CardContent className="flex gap-4">
                        <Skeleton className="h-10 w-24"/>
                        <Skeleton className="h-10 w-40"/>
                        <Skeleton className="h-10 w-40"/>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return locations.length > 0 ? (
        <>
            <div className="relative z-10 py-4 px-4 lg:px-6 flex flex-col gap-6">
                <Card>
                    <CardHeader className="flex justify-end">
                        {/* Refresh Button */}
                        <Button variant="ghost" size="sm" onClick={fetchLocations} className="mt-1">
                            <LucideRefreshCcw className="mr-1 h-4 w-4" />
                            Refresh
                        </Button>
                    </CardHeader>
                    <CardContent className="px-3">

                        <ErrorBoundary>
                            <CustomerLocationHostDisplay location={location} host={host} isLoading={loading} />
                        </ErrorBoundary>

                        <Separator className="my-4" />
                    </CardContent>
                    <CardFooter className="flex flex-col md:flex-row justify-end gap-4">
                        <div className="flex flex-wrap items-end gap-4">
                            {/* Location Select */}
                            <div className="flex flex-col space-y-1">
                                <label htmlFor="location" className="text-sm font-medium">
                                    Location
                                </label>
                                <Select disabled={!locations.length} value={selectedLocation} onValueChange={handleChange}>
                                    <SelectTrigger id="location" className="min-w-[160px]">
                                        <SelectValue placeholder="Select a location" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Select a location" disabled>Select a location</SelectItem>
                                        {locations.map((location) => (
                                            <SelectItem key={location._id} value={location.name}>
                                                {location.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Host Select */}
                            <div className="flex flex-col space-y-1">
                                <label htmlFor="host" className="text-sm font-medium">
                                    Host
                                </label>
                                <Select disabled={!location} value={selectedHostName} onValueChange={handleHostChange}>
                                    <SelectTrigger id="host" className="min-w-[160px]">
                                        <SelectValue placeholder="Select a host" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {location?.hosts && location.hosts.length > 0 ? (
                                            <>
                                                <SelectItem value="Select a host" disabled>Select a host</SelectItem>
                                                {location.hosts.map((host) => (
                                                    <SelectItem key={host.hostId} value={host.hostName}>
                                                        {host.hostName}
                                                    </SelectItem>
                                                ))}
                                            </>
                                        ) : (
                                            <SelectItem disabled value="No hosts available">No hosts available</SelectItem>
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardFooter>
                </Card>

                {location && host && (
                    <ErrorBoundary>
                        <BookTokenSection orgId={orgId} location={location} host={host}/>
                    </ErrorBoundary>
                )}
            </div>
        </>
    ) : (
        <div className="relative z-10 py-4 px-2 lg:px-6">
            <ResourceNotFound
                title="No locations found"
                description="Seems like your organization has no locations yet."
                message="Reach out to the organization to check for any alternative options."
                refreshAction={fetchLocations}
            />
        </div>
    );
}
