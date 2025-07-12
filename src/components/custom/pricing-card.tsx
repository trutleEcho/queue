'use client';

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface PricingCardProps {
    plan: string;
    price: string;
    features: string[];
    popular?: boolean;
    delay: number;
}

export const PricingCard = ({ plan, price, features, popular, delay }: PricingCardProps) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        whileHover={{ y: -5 }}
    >
        <Card className={`p-6 h-full border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 relative ${popular ? 'border-primary/50 bg-primary/5' : ''}`}>
            {popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                        Most Popular
                    </div>
                </div>
            )}
            <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-foreground mb-2">{plan}</h3>
                <div className="mb-4">
                    <span className="text-3xl font-bold text-foreground">₹{price}</span>
                    <span className="text-muted-foreground">/month</span>
                </div>
            </div>
            <ul className="space-y-3 mb-6">
                {features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-primary mr-3 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                    </li>
                ))}
            </ul>
            <Button 
                className={`w-full ${popular ? 'bg-primary hover:bg-primary/90' : 'bg-secondary hover:bg-secondary/90'}`}
                variant={popular ? "default" : "secondary"}
            >
                Get Started
            </Button>
        </Card>
    </motion.div>
); 