'use client';

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Users } from "lucide-react";

interface TeamMemberCardProps {
    name: string;
    role: string;
    description: string;
    delay: number;
}

export const TeamMemberCard = ({ name, role, description, delay }: TeamMemberCardProps) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        whileHover={{ y: -2 }}
    >
        <Card className="p-6 h-full border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300">
            <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{name}</h3>
                <p className="text-primary text-sm font-medium mb-3">{role}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
            </div>
        </Card>
    </motion.div>
); 