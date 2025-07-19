import {motion} from "framer-motion";
import {PricingCard} from "@/components/custom/pricing-card";

export default function PricingSection(){
    return(
        <section id="pricing" className="relative z-10 py-16 px-4 lg:px-6">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{opacity: 0, y: 30}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    transition={{duration: 0.8}}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                        Choose the Right Plan for Your Business
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Flexible pricing options to suit your needs and budget.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    <PricingCard
                        plan="Starter Edition"
                        price="250"
                        features={[
                            "Basic Queue Management",
                            "Real-time Analytics",
                        ]}
                        delay={0.1}
                    />
                    <PricingCard
                        plan="Pro Edition"
                        price="350"
                        features={[
                            "Advanced Queue Management",
                            "Real-time Analytics",
                            "Priority Queues",
                        ]}
                        delay={0.2}
                    />
                    <PricingCard
                        plan="Bussiness Edition"
                        price="650"
                        features={[
                            "Advanced Analytics",
                            "Advanced Reporting",
                            "Priority Queues",
                            "Custom Branding",
                            "24/7 Support"
                        ]}
                        popular
                        delay={0.3}
                    />
                </div>
            </div>
        </section>
    )
}