import {motion} from "framer-motion";
import {Globe, Heart, Lightbulb} from "lucide-react";

export default function AboutSection(){
    return(
        <section id="about" className="relative z-10 py-16 px-4 lg:px-6">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{opacity: 0, y: 30}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    transition={{duration: 0.8}}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                        About Us
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        We are a team of passionate developers and customer service experts dedicated to
                        transforming the way businesses manage their customer queues.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 p-4">
                    <div>
                        <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            To empower businesses of all sizes to provide exceptional customer experiences by
                            leveraging cutting-edge technology and expert support.
                        </p>
                    </div>
                    <div className="flex md:justify-self-center flex-col">
                        <h3 className="text-2xl font-bold text-foreground mb-4">Our Values</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <Lightbulb className="w-5 h-5 text-primary mr-3 flex-shrink-0"/>
                                <span className="text-muted-foreground">Innovation and Excellence</span>
                            </li>
                            <li className="flex items-start">
                                <Heart className="w-5 h-5 text-primary mr-3 flex-shrink-0"/>
                                <span className="text-muted-foreground">Customer-Centric Approach</span>
                            </li>
                            <li className="flex items-start">
                                <Globe className="w-5 h-5 text-primary mr-3 flex-shrink-0"/>
                                <span className="text-muted-foreground">Global Reach</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                    {/*<TeamMemberCard*/}
                    {/*    name="John Doe"*/}
                    {/*    role="CEO & Founder"*/}
                    {/*    description="With over 15 years of experience in the tech industry, John leads the strategic direction of Queue."*/}
                    {/*    delay={0.1}*/}
                    {/*/>*/}
                    {/*<TeamMemberCard*/}
                    {/*    name="Jane Smith"*/}
                    {/*    role="CTO"*/}
                    {/*    description="Jane is a technology visionary and drives our innovation and product development."*/}
                    {/*    delay={0.2}*/}
                    {/*/>*/}
                    {/*<TeamMemberCard*/}
                    {/*    name="Mike Johnson"*/}
                    {/*    role="Customer Success Manager"*/}
                    {/*    description="Mike ensures our customers have the best experience and are successful with Queue."*/}
                    {/*    delay={0.3}*/}
                    {/*/>*/}
                </div>
            </div>
        </section>
    )
}