'use client';

import React, { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Location } from "@/lib/api/models/entity/location";
import { Host } from "@/lib/api/models/entity/host";
import { Hash, User, Phone, Info } from "lucide-react";
import { conversionUtil } from "@/lib/conversion-util";

interface LocationHostDisplayProps {
    location?: Location | null;
    host?: Host;
    isLoading?: boolean;
}

export default function CustomerLocationHostDisplay({ location, host, isLoading }: LocationHostDisplayProps) {
    const [countdown, setCountdown] = useState<string>("");

    // Helper: Get today's open/close time from schedule or fallback
    function getTodayTimes() {
        const meta = location?.locationMeta;
        const today = new Date();
        const dayName = today.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
        let openTime: number | undefined, closeTime: number | undefined;
        if (meta?.schedule && Array.isArray(meta.schedule)) {
            const todaySchedule = meta.schedule.find(s => s.day.toLowerCase() === dayName);
            if (todaySchedule) {
                openTime = todaySchedule.openTime;
                closeTime = todaySchedule.closeTime;
            }
        }
        if (openTime === undefined && meta?.openTime) openTime = meta.openTime;
        if (closeTime === undefined && meta?.closeTime) closeTime = meta.closeTime;
        return { openTime, closeTime };
    }

    /**
     * Converts a 1970-style ms time to a full Date of today in IST, then returns the countdown string.
     */
    function getCountdownString(closeTime?: number): string {
        if (closeTime === undefined) return "-";

        const now = new Date();

        // Get today's date in IST
        const istNow = new Date(now.getTime() + (330 * 60 * 1000)); // +5:30 offset
        const year = istNow.getUTCFullYear();
        const month = istNow.getUTCMonth();
        const day = istNow.getUTCDate();

        // Create today's close time using the provided ms (from 1970-01-01 IST)
        const closeIST = new Date(Date.UTC(year, month, day, 0, 0, 0) + closeTime);

        const diff = closeIST.getTime() - now.getTime();
        if (diff <= 0) return "Closed";

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        return `${hours > 0 ? hours + 'h ' : ''}${minutes}m ${seconds}s`;
    }

    // Live countdown effect
    useEffect(() => {
        const { closeTime } = getTodayTimes();
        if (!closeTime) return;
        const updateCountdown = () => setCountdown(getCountdownString(closeTime));
        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);
        return () => clearInterval(interval);
    }, [location]);


    if (isLoading) {
        return (
            <div className="flex justify-center items-center">
                <Card className="w-full max-w-xl">
                    <div className="flex flex-col items-center gap-6">
                        <Skeleton className="h-10 w-32 mb-2 rounded-xl" />
                        <Skeleton className="h-16 w-40 mb-4 rounded-lg" />
                        <div className="w-full flex gap-4">
                            <Skeleton className="h-6 w-1/2 rounded" />
                            <Skeleton className="h-6 w-1/2 rounded" />
                        </div>
                        <Skeleton className="h-4 w-full mt-4" />
                        <Skeleton className="h-4 w-2/3" />
                    </div>
                </Card>
            </div>
        );
    }

    if (!location || !host) {
        return <p className="p-4 text-center text-muted-foreground">No data available</p>;
    }

    // Get today's open/close times
    const { openTime, closeTime } = getTodayTimes();

    return (
        <div className="flex flex-col gap-6 justify-center items-center w-full">
            {/* Main Card: Location, Status, Token, Open/Close, Countdown */}
            <Card className="w-full max-w-xl shadow-lg border-2 border-primary/20">
                <CardHeader className="flex flex-col items-center gap-2 pb-2">
                    <CardTitle className="text-xl text-center md:text-2xl font-bold flex items-center gap-2">
                        {location.name}
                    </CardTitle>
                    <CardDescription className="flex flex-col items-center gap-1 text-base">
                        {host.name && (
                            <span className="flex items-center gap-1"><User className="w-4 h-4" />{host.name}</span>
                        )}
                        {location.phoneNumber && (
                            <span className="flex items-center gap-1"><Phone className="w-4 h-4" />{location.phoneNumber}</span>
                        )}
                        <span className="flex items-center gap-1">
                            <Badge variant={location.open ? "default" : "destructive"} color={location.open ? "green" : "red"} className="ml-1">
                                {location.open ? "Open" : "Closed"}
                            </Badge>
                            <Badge variant={host.hostIn ? "default" : "destructive"} className="ml-1">
                                {host.hostIn ? "Host In" : "Host Out"}
                            </Badge>
                        </span>
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-4 pt-0">
                    {/* Token Emphasis */}
                    <div className="flex flex-col items-center bg-primary/10 rounded-xl p-4 w-full mb-2 border-2 border-primary/30">
                        <span className="uppercase text-xs tracking-widest text-primary font-semibold mb-1 flex items-center gap-1">
                            <Hash className="w-4 h-4" /> Current Token Number
                        </span>
                        <span className="text-5xl font-extrabold text-primary drop-shadow-lg flex items-center gap-2">
                            {host.token ?? "N/A"}
                        </span>
                        {/* Open/Close times and countdown */}
                        <div className="mt-3 flex flex-col items-center gap-1 w-full">
                            <div className="w-full flex justify-around md:justify-center md:gap-8 text-sm text-muted-foreground">
                                <span className="flex flex-col"><span>Opens: </span><b>{openTime ? conversionUtil.formatTime(openTime) : '-'}</b></span>
                                <span className="flex flex-col"><span>Closes: </span><b>{closeTime ? conversionUtil.formatTime(closeTime) : '-'}</b></span>
                            </div>
                            <div className="text-xs text-primary font-semibold mt-1">
                                {location.open && closeTime ? (
                                    <>Closes in: {countdown}</>
                                ) : (
                                    <>Currently Closed</>
                                )}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Host Details OUTSIDE Card */}
            {/*<div className="w-full max-w-xl bg-muted/50 rounded-lg p-4 border flex flex-col gap-2">*/}
            {/*    <div className="flex items-center gap-2 mb-1">*/}
            {/*        <User className="w-5 h-5 text-muted-foreground" />*/}
            {/*        <span className="font-semibold text-base">Host Details</span>*/}
            {/*    </div>*/}
            {/*    <div className="text-sm space-y-1">*/}
            {/*        <div>{host.name}</div>*/}
            {/*        {host.phoneNumber && <div className="flex items-center gap-1"><Phone className="w-4 h-4" />{host.phoneNumber}</div>}*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/* Location Meta OUTSIDE Card */}
            <div className="w-full max-w-xl bg-muted/50 rounded-lg p-4 border flex flex-col gap-2">
                <div className="flex items-center gap-2 mb-1">
                    <Info className="w-5 h-5 text-muted-foreground" />
                    <span className="font-semibold text-base">Location Details</span>
                </div>
                {location.locationMeta?.address && (
                    <div className="text-sm"><b>Address:</b> {location.locationMeta.address}</div>
                )}
            </div>
        </div>
    );
}
