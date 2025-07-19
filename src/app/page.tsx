"use client";

import AnimatedBackground from "@/components/custom/animitated-background";
import ContactCornerSoftwares from "@/components/custom/contact-corner-softwares";
import Navbar from "@/components/layout/navbar";
import StatsSection from "@/components/sections/main/stats-section";
import FeaturesSection from "@/components/sections/main/features-section";
import TestimonialSection from "@/components/sections/main/testimonial-section";
import PricingSection from "@/components/sections/main/pricing-section";
import AboutSection from "@/components/sections/main/about-section";
import ContactSection from "@/components/sections/main/contact-section";
import ComingSoonSection from "@/components/sections/main/coming-soon-section";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/sections/main/hero-section";

export default function Home() {
    return (
        <main className="min-h-screen relative overflow-hidden">
            <AnimatedBackground/>

            {/* Navigation */}
            <Navbar/>

            {/* Hero Section */}
            <HeroSection/>

            {/* Stats Section */}
            <StatsSection/>

            {/* Features Section */}
            <FeaturesSection/>

            {/* Testimonials */}
            <TestimonialSection/>

            <ContactCornerSoftwares/>

            {/* Pricing Section */}
            <PricingSection/>

            {/* About Section */}
            <AboutSection/>

            {/* Contact Section */}
            <ContactSection/>

            {/* Coming Soon Section */}
            <ComingSoonSection/>

            {/* Footer */}
            <Footer/>
        </main>
    );
}