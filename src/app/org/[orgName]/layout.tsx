// app/org/[dashboard]/layout.tsx
import OrgDashboardNavbar from "@/components/layout/org-dashboard-navbar";
import OrgDashboardFooter from "@/components/layout/org-dashboard-footer";

export default async function orgLayout({children, params}: { children: React.ReactNode; params: Promise<{ orgName: string }>
}) {
    const {orgName} = await params;

    return(
        <>
            <div className="flex flex-col min-h-screen">
                <OrgDashboardNavbar orgName={orgName}/>
                <div className="flex-1">{children}</div>
                <OrgDashboardFooter/>
            </div>
        </>
    )
}