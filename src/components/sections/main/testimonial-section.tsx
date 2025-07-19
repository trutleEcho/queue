import {motion} from "framer-motion";
import {TestimonialCard} from "@/components/custom/testimonial-card";

export default function TestimonialSection(){
    return(
        <section className="relative z-10 py-16 px-4 lg:px-6 bg-muted/30">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{opacity: 0, y: 30}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    transition={{duration: 0.8}}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Trusted by Industry Leaders
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        See what our customers are saying about Queue
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <TestimonialCard
                        name="Sarah Chen"
                        company="Metro Hospital"
                        quote="Queue reduced our patient wait times by 70%. The staff loves the automated notifications and patients appreciate the transparency."
                        delay={0.1}
                    />
                    <TestimonialCard
                        name="Marcus Rodriguez"
                        company="City Bank"
                        quote="Implementation was seamless and ROI was immediate. Customer satisfaction scores increased by 40% in the first month."
                        delay={0.2}
                    />
                    <TestimonialCard
                        name="Emily Watson"
                        company="TechCorp Support"
                        quote="The analytics dashboard gives us insights we never had before. We can now predict busy periods and staff accordingly."
                        delay={0.3}
                    />
                </div>
            </div>
        </section>
    )
}