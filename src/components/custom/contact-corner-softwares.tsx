"use client";

import {Card, CardContent, CardFooter} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";

export default function ContactCornerSoftwares() {
    return (
        <section className="w-full max-w-2xl mx-auto px-4 sm:px-6 md:px-8 py-10">
            <Card className="border-muted bg-background/80 rounded-xl shadow-sm text-center">
                <CardContent className="space-y-3 p-6">
                    <h2 className="text-xl font-semibold text-foreground">
                        Like what you see?
                    </h2>
                    <p className="text-muted-foreground text-sm">
                        Contact us to build something amazing for your business.
                    </p>
                </CardContent>

                <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-4 px-6 pb-6">
                    <div className="flex items-center gap-2">
                        <Image
                            src="/CORSW_DARK_64x64.svg"
                            alt="Corner Softwares Logo"
                            width={48}
                            height={48}
                            className="dark:hidden"
                        />
                        <Image
                            src="/CORSW_LIGHT_64x64.svg"
                            alt="Corner Softwares Logo"
                            width={48}
                            height={48}
                            className="hidden dark:block"
                        />
                        <Tooltip>
                            <Link href="https://corsw.com" target="_blank" rel="noreferrer">
                                <TooltipTrigger asChild>
                                  <span className="underline font-semibold hover:text-foreground">
                                    Corner Softwares
                                  </span>
                                </TooltipTrigger>
                            </Link>
                            <TooltipContent>
                                <p className="text-sm">
                                    We see you looking at us 🫣. Why hesitant? Come check us out!
                                </p>
                            </TooltipContent>
                        </Tooltip>

                    </div>

                    <Link
                        href="mailto:trichup20@gmail.com"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Button size="sm" variant="outline">

                            Get in Touch
                        </Button>
                    </Link>

                </CardFooter>
            </Card>
        </section>
    );
}
