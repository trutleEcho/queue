'use client';

import {motion, useScroll, useTransform} from "framer-motion";
import {ArrowRight, Zap} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useRef} from "react";

export default function HeroSection(){
    const containerRef = useRef<HTMLDivElement>(null);

    const {scrollYProgress} = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const heroY = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return(
        <motion.section
            ref={containerRef}
            className="relative z-10 min-h-[80vh] md:min-h-screen flex items-center justify-center px-4 lg:px-6"
            style={{y: heroY, opacity: heroOpacity}}
        >
            <div className="max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{opacity: 0, y: 30}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.8, delay: 0.2}}
                >
                    <motion.div
                        initial={{opacity: 0, scale: 0.9}}
                        animate={{opacity: 1, scale: 1}}
                        transition={{duration: 0.8, delay: 0.3}}
                        className="mb-8"
                    >
                        <div
                            className="inline-flex items-center px-3 py-1 bg-primary/10 rounded-full border border-primary/20 mb-6">
                            <Zap className="w-3 h-3 text-primary mr-2"/>
                            <span className="text-primary text-xs font-medium">Smart Queue Management</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
                            Transform Your
                            <span
                                className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent block">
                  Customer Flow
                </span>
                        </h1>
                    </motion.div>

                    <motion.p
                        className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{duration: 0.8, delay: 0.6}}
                    >
                        Eliminate wait time frustration with intelligent queue management.
                        Boost customer satisfaction by <span className="text-primary font-semibold">85%</span> and
                        increase operational efficiency across all touchpoints.
                    </motion.p>

                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.6, delay: 0.8}}
                        className="flex flex-col sm:flex-row gap-3 justify-center items-center"
                    >
                        <Button size="lg" className="px-6">
                            Request Demo <ArrowRight className="w-4 h-4 ml-2"/>
                        </Button>
                        {/*<Button size="lg" variant="outline" className="px-6">*/}
                        {/*    Watch Video*/}
                        {/*</Button>*/}
                    </motion.div>
                </motion.div>
            </div>
        </motion.section>
    )
}