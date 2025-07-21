'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, RefreshCcw } from "lucide-react";

type NotFoundProps = {
    title?: string;
    description?: string;
    message?: string;
    refreshAction: () => void;
};

export default function ResourceNotFound({
                                             title = "Not Found",
                                             description = "The content you are looking for was not found.",
                                             message = "",
                                             refreshAction,
                                         }: NotFoundProps) {
    return (
        <div className="w-full h-[80vh] flex items-center justify-center p-4">
            <Card className="w-full max-w-md text-center">
                <CardHeader className="pb-4">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                        <Building2 className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <CardTitle className="text-2xl">{title}</CardTitle>
                    <CardDescription className="text-base">{description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {message && <p className="text-sm text-destructive">{message}</p>}
                    <div className="space-y-2">
                        <Button variant="outline" className="w-full" onClick={refreshAction}>
                            <RefreshCcw className="mr-2 h-4 w-4" />
                            Retry
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
