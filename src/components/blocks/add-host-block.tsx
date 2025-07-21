'use client'

import {useState} from "react";
import {Organization} from "@/lib/api/models/entity/organization";
import {toast} from "sonner";
import {CreateHostRequest} from "@/lib/api/models/request/host/create-host-request";
import Loading from "@/components/ui/loading";
import {motion} from "framer-motion";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {createLocationHost} from "@/app/org/[orgId]/server";
import {Location} from "@/lib/api/models/entity/location";
import {FetchError} from "@/lib/api/fetchData";

type FormData = {
    name: string;
    phoneNumber: string;
};

export default function AddHostBlock({org, location, onSuccessAction,}: {
    org: Organization; location: Location; onSuccessAction: () => void;
}) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        name: "",
        phoneNumber: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (loading) {
            return;
        }

        if(!org) {
            toast.error("Organization not found.");
            return;
        }

        if(!location) {
            toast.error("Host not found.");
            return;
        }

        if (!formData.name || !formData.phoneNumber) {
            toast.error("Please fill in all the fields.");
            return;
        }
        try {
            setLoading(true);
            const request: CreateHostRequest = {
                organizationId: org._id,
                locationId: location._id,
                locationName: location.name,
                name: formData.name,
                phoneNumber: formData.phoneNumber,
                meta: {
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                },
            }
            const response = await createLocationHost(request);
            if (response.data) {
                toast.success("Host created successfully!");

                setFormData({
                    name: "",
                    phoneNumber: "",
                });
                onSuccessAction();
            } else {
                toast.error("Error creating host!");
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

    return (
        <>
            {loading && <Loading message="Creating location..."/>}
            <motion.section
                initial={{opacity: 0, y: 12}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.4}}
                className="w-full mx-auto p-4 md:p-6 rounded-xl border  shadow-sm space-y-6"
            >
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Host Name */}
                    <div className="col-span-1">
                        <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">
                            Host Name
                        </label>
                        <Input
                            id="name"
                            placeholder="Pradyumna"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            required
                        />
                    </div>

                    {/* Phone Number */}
                    <div className="col-span-1">
                        <label htmlFor="phone" className="block text-sm font-medium text-muted-foreground mb-1">
                            Phone Number
                        </label>
                        <Input
                            id="phone"
                            placeholder="9876543210"
                            maxLength={10}
                            value={formData.phoneNumber}
                            onChange={(e) => {
                                const cleaned = e.target.value.replace(/[^0-9]/g, "");
                                setFormData({...formData, phoneNumber: cleaned});
                            }}
                        />
                    </div>

                    {/* Submit */}
                    <div className="col-span-1 md:col-span-2 flex justify-end pt-2">
                        <Button type="submit" className="w-full md:w-fit px-6">
                            Submit
                        </Button>
                    </div>
                </form>
            </motion.section>
        </>
    )
}