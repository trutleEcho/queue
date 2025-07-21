import Footer from "@/components/layout/footer";
import AnimatedBackground from "@/components/custom/animitated-background";
import CusLandingHeroSection from "@/components/sections/cus/landing/cus-landing-hero-section";
import CusLandingNavbar from "@/components/layout/cus-landing-navbar";
import {ErrorBoundary} from "@/components/error-boundary";

export default async function CustomerLocationPage({params,}: { params: Promise<{ orgId: string }> }) {
    const {orgId} = await params
    return (
        <>
            <main className="min-h-screen relative overflow-hidden">

                {/* Animated Background */}
                <AnimatedBackground/>

                {/* Navigation */}
                <CusLandingNavbar/>

                {/* Hero Section */}
                <ErrorBoundary>
                    <CusLandingHeroSection orgId={orgId}/>
                </ErrorBoundary>

                {/* Footer */}
                <Footer/>
            </main>
        </>
    )
}