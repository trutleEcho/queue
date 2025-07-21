import {motion} from "framer-motion";
import {FeatureCard} from "@/components/custom/feature-card";
import {BarChart3, Building2, Clock, Shield, Smartphone, TrendingUp} from "lucide-react";

export default function FeaturesSection(){
    return(
        <section id="features" className="relative z-10 py-16 px-4 lg:px-6">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{opacity: 0, y: 30}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    transition={{duration: 0.8}}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                        Powerful Features for
                        <span
                            className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent block">
                Modern Businesses
              </span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Everything you need to revolutionize your customer flow and eliminate wait time frustration
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <FeatureCard
                        icon={BarChart3}
                        title="Real-time Analytics"
                        description="Get deep insights into queue patterns, peak times, and customer behavior with advanced analytics dashboard"
                        metric="Live Data"
                        delay={0.1}
                    />
                    <FeatureCard
                        icon={Smartphone}
                        title="Mobile Integration"
                        description="Customers can join queues remotely, receive notifications, and track their position in real-time"
                        metric="iOS & Android"
                        delay={0.2}
                    />
                    <FeatureCard
                        icon={Shield}
                        title="Enterprise Security"
                        description="Bank-level encryption, GDPR compliance, and SOC 2 certification ensure your data stays protected"
                        metric="99.9% Secure"
                        delay={0.3}
                    />
                    <FeatureCard
                        icon={TrendingUp}
                        title="Smart Optimization"
                        description="Advanced algorithms predict busy periods and optimize staff allocation automatically"
                        metric="Smart Insights"
                        delay={0.4}
                    />
                    <FeatureCard
                        icon={Clock}
                        title="Wait Time Prediction"
                        description="Accurate wait time estimates help customers plan their visit and reduce perceived wait times"
                        metric="±2 min accuracy"
                        delay={0.5}
                    />
                    <FeatureCard
                        icon={Building2}
                        title="Multi-location Support"
                        description="Manage queues across multiple locations with centralized dashboard and unified reporting"
                        metric="Unlimited Locations"
                        delay={0.6}
                    />
                </div>
            </div>
        </section>
    )
}