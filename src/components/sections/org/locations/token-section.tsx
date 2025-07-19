'use client';

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import {Location} from "@/lib/api/models/entity/location";
import {Host} from "@/lib/api/models/entity/host";
import {useEffect, useState} from "react";
import {toast} from "sonner";
import {getLocationHosts} from "@/app/org/[orgId]/server";
import {FetchError} from "@/lib/api/fetchData";
import Loading from "@/components/ui/loading";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {ErrorBoundary} from "@/components/error-boundary";
import UpdateTokenBlock from "@/components/blocks/update-token-block";

export default function TokenSection({location}: { location: Location }) {
    const [loading, setLoading] = useState(false);
    const [host, setHost] = useState<Host>();
    const [selectedHostName, setSelectedHostName] = useState<string>(location.hosts[0]?.hostName ?? "");
    const [selectedHostId, setSelectedHostId] = useState<string>(location.hosts[0]?.hostId ?? "");

    const fetchLocationHost = async () => {
        setLoading(true);

        if (!selectedHostId) {
            toast.error("No location selected.");
            setLoading(false);
            return;
        }

        try {
            const response = await getLocationHosts(location.organizationId, selectedHostId);
            if (response.data) {
                setHost(response.data);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            if (error instanceof FetchError) {
                toast.error(error.message);
            } else {
                toast.error("Unexpected error occurred.");
            }
        }
    };

    const handleHostChange = (value: string) => {
        if (location.hosts === null) {
            toast.error("No hosts found.");
            return;
        }
        setSelectedHostId(location.hosts.find((host) => host.hostName === value)?.hostId ?? "");
        setSelectedHostName(value);
        fetchLocationHost();
    };

    useEffect(() => {
        fetchLocationHost();
    }, []);

    return (
        <>
            {loading && <Loading message="Loading hosts..."/>}
            <Card className="my-4 ">
                <CardHeader className="space-y-0">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                        <div>
                            <CardTitle className="text-lg md:text-xl font-bold">Token</CardTitle>
                            <CardDescription>Update tokens for host</CardDescription>
                        </div>
                        <Select value={selectedHostName} onValueChange={handleHostChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a host"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem disabled value="Select a host">Select a host</SelectItem>
                                {location.hosts.map((host) => (
                                    <SelectItem key={host.hostId} value={host.hostName}>
                                        {host.hostName}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </CardHeader>
                <CardContent>
                    <Separator className="mb-4"/>

                    {host && (
                        <ErrorBoundary>
                            <UpdateTokenBlock orgId={location.organizationId} host={host}/>
                        </ErrorBoundary>
                    )}

                </CardContent>
            </Card>
        </>
    )
}