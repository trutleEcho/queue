'use client'

import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {useEffect, useState} from "react";
import {Location} from "@/lib/api/models/entity/location";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import TokenSection from "@/components/sections/org/locations/token-section";
import {ErrorBoundary} from "@/components/error-boundary";
import {Organization} from "@/lib/api/models/entity/organization";
import {getOrganizationLocations} from "@/app/org/[orgName]/server";
import {FetchError} from "@/lib/api/fetchData";
import {toast} from "sonner";
import {LucideRefreshCcw} from "lucide-react";
import Loading from "@/components/ui/loading";
import LocationDetailsBlock from "@/components/blocks/location-details-block";
import AddSection from "@/components/sections/org/locations/add-section";

export default function LocationSection({org}: { org: Organization }) {
    const [loading, setLoading] = useState(false);
    const [locations, setLocations] = useState<Location[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<string>(locations[0]?.name ?? "No locations");
    const [location, setLocation] = useState<Location | null>(locations[0]);

    const refresh = () => {
        fetchLocations();
    }

    const fetchLocations = async () => {
        setLoading(true);
        try {
            const response = await getOrganizationLocations(org._id);
            const data = response.data;

            if (data.length === 0) {
                toast.warning("No locations found.");
                setSelectedLocation("No locations");
                setLocation(null);
                setLoading(false);
            } else {
                setLocations(data);
                setSelectedLocation(data[0].name);
                setLocation(data[0]);
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            if (error instanceof FetchError) {
                toast.error(error.message);
            } else {
                toast.error("Unexpected error occurred.");
            }
        }
    };

    const handleChange = (value: string) => {
        setSelectedLocation(value);
        setLocation(locations.find((loc) => loc.name === value) ?? null)
        console.log("Selected location:", location);
        // Optional: update store or perform logic here
    };

    useEffect(() => {
        fetchLocations();
    }, []);

    return (
        <>
            {loading && <Loading message="Loading locations..."/>}
            <Card id="location">
                <CardHeader className="flex flex-col md:flex-row md:items-center gap-4 justify-between space-y-0 pb-2">
                    <div>
                        <CardTitle className="text-foreground text-xl md:text-2xl">Locations</CardTitle>
                        <CardDescription className="text-muted-foreground">Select a location</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => refresh()}>
                            <LucideRefreshCcw/>
                            Refresh
                        </Button>
                        <Select value={selectedLocation} onValueChange={handleChange}>
                            <SelectTrigger className="w-[120px] md:w-fit">
                                <SelectValue>{selectedLocation}</SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem disabled value="Select a location" className="text-muted-foreground">
                                    <span className="text-sm">Select a location</span>
                                </SelectItem>
                                {locations.map((location) => (
                                    <SelectItem key={location._id} value={location.name} className="text-foreground">
                                        {location.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </CardHeader>
                <CardContent>
                    <Separator className="mb-4"/>

                    {/* Token details */}
                    {location && (
                        <ErrorBoundary>
                            <TokenSection location={location}/>
                        </ErrorBoundary>
                    )}

                    <section className="grid md:grid-cols-2 gap-4">
                        {/* Location details */}
                        {location && (
                            <ErrorBoundary>
                                <LocationDetailsBlock location={location}/>
                            </ErrorBoundary>
                        )}

                        {/* Add section button */}
                        <ErrorBoundary>
                            <AddSection org={org} location={location} refreshAction={refresh}/>
                        </ErrorBoundary>
                    </section>
                </CardContent>
            </Card>
        </>
    );
}
