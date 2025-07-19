import OrgDashboardDetailsSection from "@/components/sections/org/dashboard/org-dashboard-details-section";
import {notFound} from "next/navigation";
import {getOrganization} from "@/app/org/[orgName]/server";

export default async function Dashboard({params,}: { params: Promise<{ orgName: string }> }){
    const {orgName} = await params
    const org = await getOrganization(orgName).then((res) => res.data)

    if(!org) return notFound()

    return(
        <div className="relative z-10 py-4 px-4 lg:px-6 flex flex-col gap-8">
            <OrgDashboardDetailsSection org={org} />
        </div>
    )
}