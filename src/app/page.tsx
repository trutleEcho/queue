import AnimatedBackground from "@/components/custom/animitated-background";
import Footer from "@/components/layout/footer";
import LandingNavbar from "@/components/layout/landing-navbar";
import LandingHeroSection from "@/components/sections/landing/landing-hero-section";

export default function LandingPage() {
    return (
        <main className="min-h-screen relative overflow-hidden">
            <AnimatedBackground/>

            {/* Navigation */}
            <LandingNavbar/>

            {/* Hero Section */}
            <LandingHeroSection/>

            {/* Footer */}
            <Footer/>
        </main>
    );
}