"use client";

import {motion, useScroll, useTransform} from "framer-motion";
import {useState, useRef} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Card} from "@/components/ui/card";
import {ThemeToggle} from "@/components/theme-toggle";
import {
    Clock,
    Zap,
    ArrowRight,
    CheckCircle,
    BarChart3,
    Shield,
    Smartphone,
    TrendingUp,
    Building2,
    Menu,
    X,
    Heart,
    Globe,
    Lightbulb,
    ArrowUpRight,
    Mail,
    Phone,
} from "lucide-react";
import AnimatedBackground from "@/components/custom/animitated-background";
import {FeatureCard} from "@/components/custom/feature-card";
import {TestimonialCard} from "@/components/custom/testimonial-card";
import {PricingCard} from "@/components/custom/pricing-card";
import {ContactForm} from "@/components/custom/contact-form";
import Image from "next/image";
import ContactCornerSoftwares from "@/components/custom/contact-corner-softwares";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import Link from "next/link";

export default function Home() {
    const [email, setEmail] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const {scrollYProgress} = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const heroY = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setIsSubscribed(true);
            setEmail("");
        }
    };

    return (
        <main ref={containerRef} className="min-h-screen relative overflow-hidden">
            <AnimatedBackground/>

            {/* Navigation */}
            <motion.nav
                className="relative z-50 p-4 lg:p-6 flex justify-between items-center"
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6}}
            >
                <Image src="/QUEUE_LOGO_TRANS_128x64.png" alt="Queue Logo" width={128} height={64}/>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-6">
                    <a href="#features"
                       className="text-muted-foreground hover:text-foreground transition-colors text-sm">Features</a>
                    <a href="#pricing"
                       className="text-muted-foreground hover:text-foreground transition-colors text-sm">Pricing</a>
                    <a href="#about"
                       className="text-muted-foreground hover:text-foreground transition-colors text-sm">About</a>
                    <a href="#contact"
                       className="text-muted-foreground hover:text-foreground transition-colors text-sm">Contact</a>
                    <ThemeToggle/>
                </div>

                {/* Mobile Navigation */}
                <div className="md:hidden flex items-center space-x-2">
                    <ThemeToggle/>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-2"
                    >
                        {mobileMenuOpen ? <X className="w-4 h-4"/> : <Menu className="w-4 h-4"/>}
                    </Button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <motion.div
                        initial={{opacity: 0, y: -20}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -20}}
                        className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border p-4 md:hidden"
                    >
                        <div className="flex flex-col space-y-3">
                            <a href="#features"
                               className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
                            <a href="#pricing"
                               className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
                            <a href="#about"
                               className="text-muted-foreground hover:text-foreground transition-colors">About</a>
                            <a href="#contact"
                               className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
                        </div>
                    </motion.div>
                )}
            </motion.nav>

            {/* Hero Section */}
            <motion.section
                className="relative z-10 min-h-[80vh] md:min-h-screen flex items-center justify-center px-4 lg:px-6"
                style={{y: heroY, opacity: heroOpacity}}
            >
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{opacity: 0, y: 30}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.8, delay: 0.2}}
                    >
                        <motion.div
                            initial={{opacity: 0, scale: 0.9}}
                            animate={{opacity: 1, scale: 1}}
                            transition={{duration: 0.8, delay: 0.3}}
                            className="mb-8"
                        >
                            <div
                                className="inline-flex items-center px-3 py-1 bg-primary/10 rounded-full border border-primary/20 mb-6">
                                <Zap className="w-3 h-3 text-primary mr-2"/>
                                <span className="text-primary text-xs font-medium">Smart Queue Management</span>
                            </div>

                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
                                Transform Your
                                <span
                                    className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent block">
                  Customer Flow
                </span>
                            </h1>
                        </motion.div>

                        <motion.p
                            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{duration: 0.8, delay: 0.6}}
                        >
                            Eliminate wait time frustration with intelligent queue management.
                            Boost customer satisfaction by <span className="text-primary font-semibold">85%</span> and
                            increase operational efficiency across all touchpoints.
                        </motion.p>

                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.6, delay: 0.8}}
                            className="flex flex-col sm:flex-row gap-3 justify-center items-center"
                        >
                            <Button size="lg" className="px-6">
                                Request Demo <ArrowRight className="w-4 h-4 ml-2"/>
                            </Button>
                            {/*<Button size="lg" variant="outline" className="px-6">*/}
                            {/*    Watch Video*/}
                            {/*</Button>*/}
                        </motion.div>
                    </motion.div>
                </div>
            </motion.section>

            {/* Stats Section */}
            <motion.section
                className="relative z-10 py-16 px-4 lg:px-6"
                initial={{opacity: 0}}
                whileInView={{opacity: 1}}
                viewport={{once: true}}
                transition={{duration: 0.8}}
            >
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        {[
                            {number: "85%", label: "Reduced Wait Times"},
                            {number: "50+", label: "Happy Businesses"},
                            {number: "2k+", label: "Customers Served"},
                            {number: "99.9%", label: "Uptime Guarantee"}
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{opacity: 0, y: 20}}
                                whileInView={{opacity: 1, y: 0}}
                                viewport={{once: true}}
                                transition={{duration: 0.5, delay: index * 0.1}}
                            >
                                <div
                                    className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-1">
                                    {stat.number}
                                </div>
                                <div className="text-muted-foreground text-sm">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Features Section */}
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

            {/* Testimonials */}
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

            <ContactCornerSoftwares/>

            {/* Pricing Section */}
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

            {/* About Section */}
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

            {/* Contact Section */}
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

            {/* Coming Soon Section */}
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

            {/* Footer */}
            <footer className="relative z-10 py-8 px-4 lg:px-6 border-t border-border/50">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <Image src="/QUEUE_LOGO_TRANS_128x64.png" alt="Queue Logo" width={128} height={64}/>

                        <div className="flex items-center space-x-6 text-sm">
                            <a href="#"
                               className="text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
                            <a href="#"
                               className="text-muted-foreground hover:text-foreground transition-colors">Terms</a>
                            <a href="#"
                               className="text-muted-foreground hover:text-foreground transition-colors">Support</a>
                        </div>
                        <div className="flex flex-col items-center gap-2 text-center bg-muted/50 rounded-lg p-6 px-12">
                            <span className="text-xs">Developed & maintained by</span>
                            <div className="flex flex-col items-center">
                                <Image
                                    src="/CORSW_DARK_64x64.svg" // use a neutral or default logo for static rendering
                                    alt="Corner Softwares"
                                    width={48}
                                    height={48}
                                    priority
                                    className="block dark:hidden"
                                />
                                <Image
                                    src="/CORSW_LIGHT_64x64.svg" // use a neutral or default logo for static rendering
                                    alt="Corner Softwares"
                                    width={48}
                                    height={48}
                                    priority
                                    className="hidden dark:block"
                                />
                                <Tooltip>
                                    <TooltipTrigger className="mt-2">
                                        <span className="text-lg font-medium">Corner Softwares</span>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>We don’t just build. We architect.</p>
                                    </TooltipContent>
                                </Tooltip>
                                <a
                                    className="underline font-extralight"
                                    href="mailto:trichup20@gmail.com"
                                >
                                    Contact Developer
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-border/50 text-center">
                        <p className="text-muted-foreground text-sm">
                            © 2025 Queue. Transforming customer experiences worldwide.
                        </p>
                    </div>
                </div>
            </footer>
        </main>
    );
}