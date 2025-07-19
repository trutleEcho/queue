"use client";

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {Organization} from "@/lib/api/models/entity/organization";
import {conversionUtil} from "@/lib/conversion-util";
import {createOrganizationLocation} from "@/app/org/[orgId]/server";
import {toast} from "sonner";
import {motion} from "framer-motion";
import Loading from "@/components/ui/loading";
import {FetchError} from "@/lib/api/fetchData";

type FormData = {
    organizationId: string;
    name: string;
    phoneNumber?: string;
    locationMeta: {
        address: string;
        closeTime?: number;
        openTime?: number;
    };
    meta: {
        createdAt: number;
        updatedAt: number;
    };
};

export default function AddLocationBlock({org, onSuccessAction,}: {
    org: Organization; onSuccessAction: () => void;
}) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        organizationId: org._id,
        name: "",
        phoneNumber: "",
        locationMeta: {
            address: "",
            closeTime: undefined,
            openTime: undefined,
        },
        meta: {
            createdAt: Date.now(),
            updatedAt: Date.now(),
        },
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await createOrganizationLocation(formData);
            if (response.data) {
                toast.success("Location created successfully!");

                setFormData({
                    organizationId: org._id,
                    name: "",
                    phoneNumber: "",
                    locationMeta: {
                        address: "",
                        closeTime: undefined,
                        openTime: undefined,
                    },
                    meta: {
                        createdAt: Date.now(),
                        updatedAt: Date.now(),
                    },
                });
                onSuccessAction();
            } else {
                toast.error("Error creating location!");
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
                    {/* Location Name */}
                    <div className="col-span-1">
                        <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">
                            Location Name
                        </label>
                        <Input
                            id="name"
                            placeholder="HQ Branch"
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

                    {/* Address */}
                    <div className="col-span-1 md:col-span-2">
                        <label htmlFor="address" className="block text-sm font-medium text-muted-foreground mb-1">
                            Address
                        </label>
                        <Input
                            id="address"
                            placeholder="123 Street Name, City"
                            value={formData.locationMeta.address}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    locationMeta: {...formData.locationMeta, address: e.target.value},
                                })
                            }
                            required
                        />
                    </div>

                    {/* Open Time */}
                    <div className="col-span-1">
                        <label htmlFor="openTime" className="block text-sm font-medium text-muted-foreground mb-1">
                            Open Time
                        </label>
                        <Input
                            id="openTime"
                            type="time"
                            className="text-sm"
                            value={conversionUtil.msToTimeString(
                                formData.locationMeta.openTime ?? 10 * 60 * 60 * 1000
                            )}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    locationMeta: {
                                        ...formData.locationMeta,
                                        openTime: conversionUtil.timeStringToMilliseconds(e.target.value),
                                    },
                                })
                            }
                            required
                        />
                    </div>

                    {/* Close Time */}
                    <div className="col-span-1">
                        <label htmlFor="closeTime" className="block text-sm font-medium text-muted-foreground mb-1">
                            Close Time
                        </label>
                        <Input
                            id="closeTime"
                            type="time"
                            className="text-sm"
                            value={conversionUtil.msToTimeString(
                                formData.locationMeta.closeTime ?? 18 * 60 * 60 * 1000
                            )}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    locationMeta: {
                                        ...formData.locationMeta,
                                        closeTime: conversionUtil.timeStringToMilliseconds(e.target.value),
                                    },
                                })
                            }
                            required
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
    );
}
