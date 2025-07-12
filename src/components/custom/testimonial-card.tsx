'use client';

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

interface TestimonialCardProps {
    name: string;
    company: string;
    quote: string;
    delay: number;
}

export const TestimonialCard = ({ name, company, quote, delay }: TestimonialCardProps) => (
    <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
    >
        <Card className="p-6 h-full border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center mb-3">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-yellow-500 fill-current" />
                ))}
            </div>
            <p className="text-muted-foreground mb-4 text-sm italic">&quot;{quote}&quot;</p>
            <div>
                <p className="text-foreground font-medium text-sm">{name}</p>
                <p className="text-muted-foreground text-xs">{company}</p>
            </div>
        </Card>
    </motion.div>
); 