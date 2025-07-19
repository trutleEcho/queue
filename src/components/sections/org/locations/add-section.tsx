"use client";

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {ErrorBoundary} from "@/components/error-boundary";
import AddLocationBlock from "@/components/blocks/add-location-block";
import {useState} from "react";
import {Organization} from "@/lib/api/models/entity/organization";
import {Location} from "@/lib/api/models/entity/location";
import {Separator} from "@/components/ui/separator";
import {motion} from "framer-motion";
import AddHostBlock from "@/components/blocks/add-host-block";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {Info} from "lucide-react";

/**
 * Renders the UI for adding a new location or host to an organization.
 */
export default function AddSection({org, location, refreshAction,}: {
    org: Organization;
    location: Location | null;
    refreshAction: () => void;
}) {
    const [open, setOpen] = useState(false);
    const [addLocation, setAddLocation] = useState(false);
    const [addHost, setAddHost] = useState(false);

    const toggleAddMode = () => {
        setOpen((prev) => !prev);
        setAddLocation(false);
        setAddHost(false);
    };

    return (
        <>
            <Card className="w-full mx-auto h-fit mb-4">
                <CardHeader
                    className="flex flex-col md:flex-row items-start md:items-end md:justify-between space-y-2 md:space-y-0">
                    <div>
                        <CardTitle className="text-lg md:text-xl font-bold">Add Location / Host</CardTitle>
                        <CardDescription className="text-muted-foreground">
                            Add a new location or host to your organization
                        </CardDescription>
                    </div>
                    <Button
                        className="bg-primary text-primary-foreground hover:bg-primary/80 text-xs font-light px-4 py-2 md:px-6 md:py-2.5 md:text-sm"
                        onClick={toggleAddMode}
                    >
                        {open ? "Cancel" : "Add"}
                    </Button>
                </CardHeader>

                {open && (
                    <>
                        <motion.section
                            initial={{opacity: 0, y: 12}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.4}}>
                            <Separator className="mb-4"/>
                            <CardContent className="space-y-3">
                                <motion.section
                                    initial={{opacity: 0, y: 12}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{duration: 0.4}}
                                    className="flex flex-wrap items-center gap-3">
                                    <Button
                                        variant={addLocation ? "secondary" : "default"}
                                        className="text-xs font-light px-4 py-2 md:text-sm hover:cursor-pointer"
                                        onClick={() => {
                                            setAddLocation((prev) => !prev);
                                            setAddHost(false);
                                        }}
                                    >
                                        {addLocation ? "Close Location Form" : "Add Location"}
                                    </Button>

                                    <Button
                                        variant={addHost ? "secondary" : "default"}
                                        className="text-xs font-light px-4 py-2 md:text-sm hover:cursor-pointer"
                                        onClick={() => {
                                            setAddHost((prev) => !prev);
                                            setAddLocation(false);
                                        }}
                                        disabled={!location}
                                    >
                                        {addHost ? "Close Host Form" : "Add Host"}
                                    </Button>

                                    {!location && (<Alert variant="default">
                                        <Info/>
                                        <AlertTitle>Start by adding a Location</AlertTitle>
                                        <AlertDescription>
                                            Wish to add a Host? Please add a Location first.
                                        </AlertDescription>
                                    </Alert>)}
                                </motion.section>
                            </CardContent>
                        </motion.section>

                        {addLocation && (
                            <CardContent>
                                <ErrorBoundary>
                                    <AddLocationBlock
                                        org={org}
                                        onSuccessAction={() => {
                                            setAddLocation(false);
                                            setOpen(false);
                                            refreshAction();
                                        }}
                                    />
                                </ErrorBoundary>
                            </CardContent>
                        )}

                        {addHost && location && (
                            <CardContent>
                                <ErrorBoundary>
                                    <AddHostBlock
                                        org={org}
                                        location={location}
                                        onSuccessAction={() => {
                                            setAddHost(false);
                                            setOpen(false);
                                            refreshAction();
                                        }}
                                    />
                                </ErrorBoundary>
                            </CardContent>
                        )}
                    </>
                )}
            </Card>
        </>
    );
}
