'use client';

import {motion} from "framer-motion";
import {ArrowRight, CheckCircle, Clock} from "lucide-react";
import {Card} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useState} from "react";

export default function ComingSoonSection(){
    const [email, setEmail] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setIsSubscribed(true);
            setEmail("");
        }
    };

    return(
        <section className="relative z-10 py-24 px-4 lg:px-6">
            <div className="max-w-3xl mx-auto text-center">
                <motion.div
                    initial={{opacity: 0, y: 50}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    transition={{duration: 0.8}}
                >
                    <div
                        className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-6">
                        <Clock className="w-4 h-4 text-primary mr-2"/>
                        <span className="text-primary text-sm font-medium">Next Generation Features</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Coming Soon
              </span>
                    </h2>

                    <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
                        Advanced integrations, enhanced automation, and next-level features
                        are launching soon. Be the first to experience the future of queue management.
                    </p>

                    {!isSubscribed ? (
                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true}}
                            transition={{duration: 0.6, delay: 0.3}}
                        >
                            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 max-w-md mx-auto">
                                <h3 className="text-xl font-bold text-foreground mb-4">Get Early Access</h3>
                                <form onSubmit={handleSubscribe} className="space-y-3">
                                    <Input
                                        type="email"
                                        placeholder="Enter your business email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="h-10"
                                        required
                                    />
                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="w-full h-10"
                                    >
                                        Join Waitlist <ArrowRight className="w-4 h-4 ml-2"/>
                                    </Button>
                                </form>
                                <p className="text-muted-foreground text-xs mt-3">
                                    Join 2,000+ businesses already on our waitlist
                                </p>
                            </Card>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{scale: 0.9, opacity: 0}}
                            animate={{scale: 1, opacity: 1}}
                            transition={{duration: 0.5}}
                        >
                            <Card
                                className="p-6 bg-green-500/10 backdrop-blur-sm border-green-500/20 max-w-md mx-auto">
                                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4"/>
                                <h3 className="text-2xl font-bold text-foreground mb-3">Welcome Aboard!</h3>
                                <p className="text-muted-foreground">
                                    You&apos;ll be among the first to experience our revolutionary new features.
                                </p>
                            </Card>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </section>
    )
}