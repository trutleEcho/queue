'use client'

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {useState} from "react";
import {Separator} from "@/components/ui/separator";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import {toast} from "sonner";
import {Location} from "@/lib/api/models/entity/location";
import {Host} from "@/lib/api/models/entity/host";
import {validateToken, createHostToken} from "@/app/org/[orgId]/server";
import {FetchError} from "@/lib/api/fetchData";
import {CreateTokenRequest} from "@/lib/api/models/request/token/create-token-request";
import {conversionUtil} from "@/lib/conversion-util";

// Props for the section
type Props = {
    orgId: string;
    location: Location;
    host: Host;
};

export default function BookTokenSection({orgId, location, host}: Props) {
    const [modalOpen, setModalOpen] = useState(false);
    const [step, setStep] = useState<'phone' | 'showToken' | 'details'>('phone');
    const [loading, setLoading] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [tokenNumber, setTokenNumber] = useState<number | null>(null);
    const [formData, setFormData] = useState({name: '', email: ''});

    // Handles phone number submit
    const handlePhoneSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!phoneNumber || phoneNumber.length < 10) {
            toast.error('Please enter a valid phone number.');
            return;
        }
        setLoading(true);
        try {
            const res = await validateToken(orgId, phoneNumber);
            if (res?.data) {
                setTokenNumber(res.data);
                setStep('showToken');
            } else {
                setStep('details');
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
    };

    // Handles new token creation
    const handleCreateToken = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!phoneNumber || phoneNumber.length < 10) {
            toast.error('Please enter a valid phone number.');
            return;
        }
        if (!formData.name) {
            toast.error('Please enter your name.');
            return;
        }
        setLoading(true);
        try {
            const req : CreateTokenRequest = {
                organizationId: location.organizationId,
                locationId: location._id,
                hostId: host._id,
                name: formData.name,
                phoneNumber,
                email: formData.email,
                date: conversionUtil.getStartOfTodayInMillis(),
                meta: {createdAt: Date.now()},
            };
            const res = await createHostToken(req);
            if (res?.data) {
                setTokenNumber(res.data);
                setStep('showToken');
            } else {
                toast.error('Failed to create token.');
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
    };

    // Reset modal state on close
    const handleModalOpenChange = (open: boolean) => {
        setModalOpen(open);
        if (!open) {
            setStep('phone');
            setPhoneNumber('');
            // setTokenNumber(null); // Do not clear token on close
            setFormData({name: '', email: ''});
        }
    };

    // If token is present, show it instead of Book Token card
    if (tokenNumber) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl md:text-2xl">Your Token</CardTitle>
                    <CardDescription className="text-muted-foreground">
                        This is your current token number. Please show it at the counter.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center gap-4 mt-4">
                        <div className="text-2xl font-bold text-primary">Token Number</div>
                        <div className="text-5xl font-extrabold text-primary drop-shadow-lg">{tokenNumber}</div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl md:text-2xl">Book Token</CardTitle>
                    <CardDescription className="text-muted-foreground">
                        Book a token for your next visit
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Separator className="mb-4"/>
                    <Dialog open={modalOpen} onOpenChange={handleModalOpenChange}>
                        <DialogTrigger asChild>
                            <Button className="w-full" variant="default" size="lg">
                                Book Token
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Book Your Token</DialogTitle>
                                <DialogDescription>
                                    {step === 'phone' && 'Enter your phone number to check for an existing token.'}
                                    {step === 'showToken' && 'You already have a token. See below.'}
                                    {step === 'details' && 'No token found. Please provide your details to book a new token.'}
                                </DialogDescription>
                            </DialogHeader>
                            {step === 'phone' && (
                                <form onSubmit={handlePhoneSubmit} className="flex flex-col gap-4 mt-2">
                                    <Input
                                        id="phone"
                                        placeholder="9876543210"
                                        maxLength={10}
                                        value={phoneNumber}
                                        onChange={e => setPhoneNumber(e.target.value.replace(/[^0-9]/g, ""))}
                                        disabled={loading}
                                        autoFocus
                                    />
                                    <DialogFooter>
                                        <Button type="submit" disabled={loading} className="w-full">Check Token</Button>
                                    </DialogFooter>
                                </form>
                            )}
                            {step === 'showToken' && (
                                <div className="flex flex-col items-center gap-4 mt-4">
                                    <div className="text-2xl font-bold text-primary">Your Token Number</div>
                                    <div
                                        className="text-5xl font-extrabold text-primary drop-shadow-lg">{tokenNumber}</div>
                                    <Button className="mt-4 w-full"
                                            onClick={() => handleModalOpenChange(false)}>Close</Button>
                                </div>
                            )}
                            {step === 'details' && (
                                <form onSubmit={handleCreateToken} className="flex flex-col gap-4 mt-2">
                                    <Input
                                        id="phone"
                                        placeholder="9876543210"
                                        maxLength={10}
                                        value={phoneNumber}
                                        disabled
                                    />
                                    <Input
                                        id="name"
                                        placeholder="Your Name"
                                        value={formData.name}
                                        onChange={e => setFormData({...formData, name: e.target.value})}
                                        disabled={loading}
                                        autoFocus
                                    />
                                    <Input
                                        id="email"
                                        placeholder="Email (optional)"
                                        value={formData.email}
                                        onChange={e => setFormData({...formData, email: e.target.value})}
                                        disabled={loading}
                                    />
                                    <DialogFooter>
                                        <Button type="submit" disabled={loading} className="w-full">Book Token</Button>
                                    </DialogFooter>
                                </form>
                            )}
                        </DialogContent>
                    </Dialog>
                </CardContent>
            </Card>
        </>
    );
}