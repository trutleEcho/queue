'use client'

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import {Minus, Plus} from "lucide-react";
import {Switch} from "@/components/ui/switch";
import {useEffect, useState} from "react";
import {Host} from "@/lib/api/models/entity/host";
import {toast} from "sonner";
import {FetchError} from "@/lib/api/fetchData";
import {UpdateHostStatusRequest} from "@/lib/api/models/request/host/update-host-status-request";
import {updateLocationHostStatus} from "@/app/org/[orgName]/server";

export default function UpdateTokenBlock({orgId, host}: { orgId: string, host: Host }) {

    const updateHostStatus = async () => {
        if (!host) {
            toast.error("No host selected.");
            return;
        }

        if (!orgId) {
            toast.error("No organization selected.");
            return;
        }

        try {
            const request: UpdateHostStatusRequest = {
                organizationId: orgId,
                hostId: host._id,
                token: formData.token,
                hostIn: formData.hostIn
            }
            const response = await updateLocationHostStatus(request);
            if (response.data) {
                toast.success("Host status updated.");
            }
        } catch (error) {
            if (error instanceof FetchError) {
                toast.error(error.message);
            } else {
                toast.error("Unexpected error occurred.");
            }
        }
    };

    const [formData, setFormData] = useState({
        token: host?.token ?? '0',
        hostIn: host?.hostIn
    });

    useEffect(() => {
        updateHostStatus();
    }, [formData]);

    return (
        <>
            <Card className="w-full max-w-xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-center text-lg md:text-2xl font-bold">Current Token</CardTitle>
                </CardHeader>
                <CardContent>
                    <Separator className="mb-4"/>

                    <div className="flex sm:flex-row sm:gap-4 gap-2 items-center justify-between">
                        {/* Decrement Button */}
                        <Button
                            size="icon"
                            onClick={() => {
                                setFormData(prev => ({
                                    ...prev,
                                    token: prev.token ? (Number(prev.token) - 1).toString() : "1",
                                }))
                            }
                            }
                            aria-label="Decrement token"
                        >
                            <Minus className="h-4 w-4"/>
                        </Button>

                        {/* Input and label */}
                        <div className="flex flex-col items-center">
                            {/*<Input*/}
                            {/*    id="token"*/}
                            {/*    value={formData.token ?? ""}*/}
                            {/*    placeholder="Enter token"*/}
                            {/*    className="text-sm font-medium leading-none w-full"*/}
                            {/*    onChange={(e) => {*/}
                            {/*        e.target.value.replace(/[^0-9]/g, '')*/}
                            {/*        setFormData(prev => ({*/}
                            {/*            ...prev,*/}
                            {/*            token: e.target.value,*/}
                            {/*        }))*/}
                            {/*    }*/}
                            {/*    }*/}
                            {/*    maxLength={2}*/}
                            {/*/>*/}
                            <span className="text-6xl font-medium w-full">
                                        {formData.token ?? ""}
                                    </span>
                        </div>

                        {/* Increment Button */}
                        <Button
                            size="icon"
                            onClick={() => {
                                setFormData(prev => ({
                                    ...prev,
                                    token: prev.token ? (Number(prev.token) + 1).toString() : "1",
                                }));
                            }}
                            aria-label="Increment token"
                        >
                            <Plus className="h-4 w-4"/>
                        </Button>
                    </div>

                    <div className="space-y-1 mt-8 flex flex-col items-center">
                        <label
                            htmlFor="open"
                            className=" text-muted-foreground leading-snug"
                        >
                            Host In / Out
                        </label>
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="open"
                                checked={formData.hostIn}
                                onCheckedChange={(checked: boolean) => {
                                    setFormData(prev => ({
                                        ...prev,
                                        hostIn: checked,
                                    }));
                                }}
                            />
                            <span className="text-muted-foreground leading-snug">
                                                            {formData?.hostIn ? "In" : "Out"}
                                                        </span>
                        </div>
                    </div>

                </CardContent>
            </Card>
        </>
    )
}