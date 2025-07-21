import {motion} from "framer-motion";
import {ArrowUpRight, Mail, Phone} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {ContactForm} from "@/components/custom/contact-form";

export default function ContactSection(){
    return(
        <section id="contact" className="relative z-10 py-16 px-4 lg:px-6 bg-muted/30">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{opacity: 0, y: 30}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    transition={{duration: 0.8}}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                        Get in Touch
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Ready to transform your customer experience? Let&apos;s discuss how Queue can help
                        your business.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12  px-4">
                    {/* Contact Information */}
                    <motion.div
                        initial={{opacity: 0, x: -30}}
                        whileInView={{opacity: 1, x: 0}}
                        viewport={{once: true}}
                        transition={{duration: 0.8}}
                    >
                        <h3 className="text-2xl font-bold text-foreground mb-6">Contact Information</h3>
                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="p-3 bg-primary/10 rounded-lg">
                                    <Mail className="w-5 h-5 text-primary"/>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-foreground mb-1">Email</h4>
                                    <p className="text-muted-foreground">trichup20@gmail.com</p>
                                    <p className="text-muted-foreground text-sm">We&apos;ll respond within 24
                                        hours</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="p-3 bg-primary/10 rounded-lg">
                                    <Phone className="w-5 h-5 text-primary"/>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-foreground mb-1">Phone</h4>
                                    <p className="text-muted-foreground">+91 9175395577</p>
                                    <p className="text-muted-foreground text-sm">Mon-Fri 9AM-6PM IST</p>
                                </div>
                            </div>
                            {/*<div className="flex items-start space-x-4">*/}
                            {/*    <div className="p-3 bg-primary/10 rounded-lg">*/}
                            {/*        <MapPin className="w-5 h-5 text-primary" />*/}
                            {/*    </div>*/}
                            {/*    <div>*/}
                            {/*        <h4 className="font-semibold text-foreground mb-1">Office</h4>*/}
                            {/*        <p className="text-muted-foreground">123 Innovation Drive</p>*/}
                            {/*        <p className="text-muted-foreground">San Francisco, CA 94105</p>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </div>

                        <div className="mt-8">
                            <h4 className="font-semibold text-foreground mb-4">Follow Us</h4>
                            <div className="flex space-x-4">
                                <Link href={"https://facebook.com/CornerSoftwares"} target="_blank">
                                    <Button variant="outline" size="sm" className="flex items-center">
                                        <ArrowUpRight className="w-4 h-4 mr-2"/>
                                        Instagram
                                    </Button>
                                </Link>
                                <Link href={"https://facebook.com/CornerSoftwares"} target="_blank">
                                    <Button variant="outline" size="sm" className="flex items-center">
                                        <ArrowUpRight className="w-4 h-4 mr-2"/>
                                        Facebook
                                    </Button>
                                </Link>

                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <ContactForm/>
                </div>
            </div>
        </section>
    )
}