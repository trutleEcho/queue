import Image from "next/image";
import pkg from '../../../package.json';

export default function OrgDashboardFooter() {
    return (
        <>
            <section className="z-10 pb-8 pt-4 px-4 lg:px-6 border-t border-border/50">
                <div className="flex justify-center md:justify-start">
                    <Image src="/QUEUE_LOGO_TRANS_128x64.png" alt="Queue Logo" width={128} height={64}/>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex flex-row space-x-4">
                        <span className="text-muted-foreground">Privacy</span>
                        <span className="text-muted-foreground">Terms</span>
                        <span  className="text-muted-foreground">Support</span>
                    </div>
                    <span className="text-muted-foreground text-sm">Version {pkg.version}</span>
                    <span  className="text-muted-foreground text-sm">@ 2025 Corner Softwares. All rights reserved</span>
                </div>
            </section>
        </>
    )
}