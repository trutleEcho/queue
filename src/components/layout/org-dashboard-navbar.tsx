// components/org-dashboard-navbar.tsx
import Image from "next/image";
import { ThemeToggle } from "@/components/custom/theme-toggle";
import Link from "next/link";

export default function OrgDashboardNavbar({ orgName }: { orgName: string }) {
    return (
        <div className="top-0 left-0 z-50 bg-gradient-to-b from-background via-background/80 to-background/10 rounded-b-2xl">
            <header className="relative z-50 p-4 lg:p-6 flex justify-between items-center">
                <Image src="/QUEUE_LOGO_TRANS_128x64.png" alt="Queue Logo" width={128} height={64} />

                <div className="flex items-center space-x-2 md:space-x-6">
                    <Link
                        href={`/org/${orgName}/dashboard`}
                        className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                        Dashboard
                    </Link>
                    <Link href={`/org/${orgName}`} className="text-muted-foreground hover:text-foreground transition-colors text-sm">Locations</Link>
                    <ThemeToggle />
                </div>
            </header>
        </div>
    );
}
