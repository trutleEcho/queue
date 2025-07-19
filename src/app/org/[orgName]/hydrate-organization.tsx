// app/org/[dashboard]/HydrateOrganization.tsx
'use client'
import { useEffect } from 'react'
import {setOrganization} from "@/stores/oraganizationStore";
import {Organization} from "@/lib/api/models/entity/organization";

export default function HydrateOrganization({ org }: { org: Organization }) {
    useEffect(() => {
        setOrganization(org)
    }, [org])

    return null
}
