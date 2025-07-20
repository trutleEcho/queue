'use client';

import AnimatedBackground from "@/components/custom/animitated-background";
import ContactCornerSoftwares from "@/components/custom/contact-corner-softwares";
import Navbar from "@/components/layout/navbar";
import StatsSection from "@/components/sections/home/stats-section";
import FeaturesSection from "@/components/sections/home/features-section";
import TestimonialSection from "@/components/sections/home/testimonial-section";
import PricingSection from "@/components/sections/home/pricing-section";
import AboutSection from "@/components/sections/home/about-section";
import ContactSection from "@/components/sections/home/contact-section";
import ComingSoonSection from "@/components/sections/home/coming-soon-section";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/sections/home/hero-section";

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