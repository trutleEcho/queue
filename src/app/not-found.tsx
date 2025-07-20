import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {ArrowLeft, Building2} from "lucide-react";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function NotFound(){
    return(
        <div className="w-full h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-md text-center">
                <CardHeader className="pb-4">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                        <Building2 className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <CardTitle className="text-2xl">Page Not Found</CardTitle>
                    <CardDescription className="text-base">

                        The page you&apos;re looking for doesn&apos;t exist or may have been removed.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Button variant="outline" asChild className="w-full bg-transparent">
                            <Link href="/">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Home
                            </Link>
                        </Button>
                    </div>
                    <div className="pt-4 border-t">
                        <p className="text-sm text-muted-foreground mb-3">Need help?</p>
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/support">Contact Support</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}