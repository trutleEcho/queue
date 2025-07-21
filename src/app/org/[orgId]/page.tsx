// app/org/[orgId]/page.tsx
import {getOrganization} from './server'
import HydrateOrganization from './hydrate-organization'
import {ErrorBoundary} from "@/components/error-boundary";
import LocationSection from "@/components/sections/org/locations/location-section";

export default async function OrgPage({params,}: { params: Promise<{ orgId: string }> }) {
    const {orgId} = await params;
    const org = await getOrganization(orgId).then((res) => res.data)

    return (
        <>
            <div>
                <HydrateOrganization org={org}/>
                <section className="relative z-10 py-4 px-2 lg:px-6 flex flex-col gap-8">
                    <ErrorBoundary>
                        <LocationSection org={org}/>
                    </ErrorBoundary>
                </section>
            </div>
        </>
    )
}