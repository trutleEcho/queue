import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { getHostTokens, deleteHostToken } from "@/app/org/[orgId]/server";
import { Host } from "@/lib/api/models/entity/host";
import { Token } from "@/lib/api/models/entity/token";
import { FetchError } from "@/lib/api/fetchData";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface HostTokensBlockProps {
    orgId: string;
    locationId: string;
    host: Host;
}

export default function HostTokensBlock({ orgId, locationId, host }: HostTokensBlockProps) {
    const [tokens, setTokens] = useState<Token[]>([]);
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState<string | null>(null); // tokenId for which action is loading

    const fetchTokens = async (hostId: string) => {
        setLoading(true);
        try {
            const res = await getHostTokens(orgId, locationId, hostId);
            setTokens(res.data || []);
        } catch (error) {
            if (error instanceof FetchError) {
                toast.error(error.message);
            } else {
                toast.error("Unexpected error occurred.");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTokens(host._id);
    }, [host._id]);

    // Delete or Complete action
    const handleDelete = async (tokenId: string) => {
        setActionLoading(tokenId);
        try {
            const res = await deleteHostToken({ organizationId: orgId, tokenId });
            if (res.data) {
                toast.success("Token deleted/completed.");
                fetchTokens(host._id);
            } else {
                toast.error("Failed to delete token.");
            }
        } catch (error) {
            if (error instanceof FetchError) {
                toast.error(error.message);
            } else {
                toast.error("Unexpected error occurred.");
            }
        } finally {
            setActionLoading(null);
        }
    };

    // // Update action (example: mark as completed, you can customize fields)
    // const handleUpdate = async (token: Token) => {
    //     setActionLoading(token._id);
    //     try {
    //         const req = {
    //             organizationId: orgId,
    //             tokenId: token._id,
    //             name: token.name,
    //             phoneNumber: token.phoneNumber,
    //             email: token.email,
    //             token: token.token,
    //         };
    //         const res = await updateHostToken(req);
    //         if (res.data) {
    //             toast.success("Token updated.");
    //             fetchTokens(host._id);
    //         } else {
    //             toast.error("Failed to update token.");
    //         }
    //     } catch (error) {
    //         if (error instanceof FetchError) {
    //             toast.error(error.message);
    //         } else {
    //             toast.error("Unexpected error occurred.");
    //         }
    //     } finally {
    //         setActionLoading(null);
    //     }
    // };

    return (
        <Card className="w-full mx-auto my-6">
            <CardHeader>
                <CardTitle>Host Tokens</CardTitle>
                <CardDescription>View all tokens for this host</CardDescription>
            </CardHeader>
            <CardContent>
                <Separator className="mb-4" />
                {loading ? (
                    <div>Loading tokens...</div>
                ) : tokens.length === 0 ? (
                    <div className="text-muted-foreground">No tokens found for this host.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Token</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Phone</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {tokens.map((token) => (
                                    <TableRow key={token._id}>
                                        <TableCell className="font-bold text-primary">{token.token}</TableCell>
                                        <TableCell>{token.name}</TableCell>
                                        <TableCell>{token.phoneNumber}</TableCell>
                                        <TableCell>{token.email || '-'}</TableCell>
                                        <TableCell>
                                            <Badge variant="secondary">Active</Badge>
                                        </TableCell>
                                        <TableCell className="flex gap-2 justify-end">
                                            <Button
                                                size="sm"
                                                variant="default"
                                                className="bg-red-500/50 hover:bg-red-600 text-white"
                                                disabled={actionLoading === token._id}
                                                onClick={() => handleDelete(token._id)}
                                            >
                                                {actionLoading === token._id ? "..." : "Delete"}
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="default"
                                                className="bg-green-500/50 hover:bg-green-600 text-white"
                                                disabled={actionLoading === token._id}
                                                onClick={() => handleDelete(token._id)}
                                            >
                                                {actionLoading === token._id ? "..." : "Complete"}
                                            </Button>
                                            {/*<Button*/}
                                            {/*    size="sm"*/}
                                            {/*    variant="outline"*/}
                                            {/*    disabled={actionLoading === token._id}*/}
                                            {/*    onClick={() => handleUpdate(token)}*/}
                                            {/*>*/}
                                            {/*    {actionLoading === token._id ? "..." : "Update"}*/}
                                            {/*</Button>*/}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </CardContent>
        </Card>
    );
} 