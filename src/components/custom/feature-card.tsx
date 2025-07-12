'use client';

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    metric: string;
    delay: number;
}

export const FeatureCard = ({ icon: Icon, title, description, metric, delay }: FeatureCardProps) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        whileHover={{ y: -2 }}
    >
        <Card className="p-6 h-full border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 group">
            <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-lg font-semibold text-foreground">{metric}</div>
                </div>
                <div>
                    <h3 className="font-semibold text-foreground mb-2">{title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
                </div>
            </div>
        </Card>
    </motion.div>
); 