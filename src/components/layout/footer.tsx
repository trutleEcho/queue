import Image from "next/image";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";

export default function Footer(){
    return(
        <footer className="relative z-10 py-8 px-4 lg:px-6 border-t border-border/50">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <Image src="/QUEUE_LOGO_TRANS_128x64.png" alt="Queue Logo" width={128} height={64}/>

                    <div className="flex items-center space-x-6 text-sm">
                        <a href="#"
                           className="text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
                        <a href="#"
                           className="text-muted-foreground hover:text-foreground transition-colors">Terms</a>
                        <a href="#"
                           className="text-muted-foreground hover:text-foreground transition-colors">Support</a>
                    </div>
                    <div className="flex flex-col items-center gap-2 text-center bg-muted/50 rounded-lg p-6 px-12">
                        <span className="text-xs">Developed & maintained by</span>
                        <div className="flex flex-col items-center">
                            <Image
                                src="/CORSW_DARK_64x64.svg" // use a neutral or default logo for static rendering
                                alt="Corner Softwares"
                                width={48}
                                height={48}
                                priority
                                className="block dark:hidden"
                            />
                            <Image
                                src="/CORSW_LIGHT_64x64.svg" // use a neutral or default logo for static rendering
                                alt="Corner Softwares"
                                width={48}
                                height={48}
                                priority
                                className="hidden dark:block"
                            />
                            <Tooltip>
                                <TooltipTrigger className="mt-2">
                                    <span className="text-lg font-medium">Corner Softwares</span>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>We don’t just build. We architect.</p>
                                </TooltipContent>
                            </Tooltip>
                            <a
                                className="underline font-extralight"
                                href="mailto:trichup20@gmail.com"
                            >
                                Contact Developer
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-6 pt-6 border-t border-border/50 text-center">
                    <p className="text-muted-foreground text-sm">
                        © 2025 Queue. Transforming customer experiences worldwide.
                    </p>
                </div>
            </div>
        </footer>
    )
}