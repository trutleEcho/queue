'use client';

import {motion} from "framer-motion";
import Image from "next/image";
import {ThemeToggle} from "@/components/custom/theme-toggle";
import {Button} from "@/components/ui/button";
import {Menu, X} from "lucide-react";
import {useState} from "react";

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>
            {/* Navigation */}
            <div className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-background via-background/80 to-background/10 rounded-b-2xl">
                <motion.nav
                    className="relative z-50 p-4 lg:p-6 flex justify-between items-center"
                    initial={{opacity: 0, y: -20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.6}}
                >
                    <Image src="/QUEUE_LOGO_TRANS_128x64.png" alt="Queue Logo" width={128} height={64}/>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        <a href="#features"
                           className="text-muted-foreground hover:text-foreground transition-colors text-sm">Features</a>
                        <a href="#pricing"
                           className="text-muted-foreground hover:text-foreground transition-colors text-sm">Pricing</a>
                        <a href="#about"
                           className="text-muted-foreground hover:text-foreground transition-colors text-sm">About</a>
                        <a href="#contact"
                           className="text-muted-foreground hover:text-foreground transition-colors text-sm">Contact</a>
                        <ThemeToggle/>
                    </div>

                    {/* Mobile Navigation */}
                    <div className="md:hidden flex items-center space-x-2">
                        <ThemeToggle/>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2"
                        >
                            {mobileMenuOpen ? <X className="w-4 h-4"/> : <Menu className="w-4 h-4"/>}
                        </Button>
                    </div>

                    {/* Mobile Menu */}
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{opacity: 0, y: -20}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -20}}
                            className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border p-4 md:hidden"
                        >
                            <div className="flex flex-col space-y-3">
                                <a href="#features"
                                   className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
                                <a href="#pricing"
                                   className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
                                <a href="#about"
                                   className="text-muted-foreground hover:text-foreground transition-colors">About</a>
                                <a href="#contact"
                                   className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
                            </div>
                        </motion.div>
                    )}
                </motion.nav>
            </div>
        </>
    );
}