import Footer from "@/components/layout/footer";
import AnimatedBackground from "@/components/custom/animitated-background";
import Navbar from "@/components/layout/navbar";

export default async function CustomerLocationPage({params,}: { params: Promise<{ orgId: string }> }) {
    const {orgId} = await params
    return (
        <>
            <main className="min-h-screen relative overflow-hidden">
                <AnimatedBackground/>
                <Navbar/>
                <Footer/>
            </main>
        </>
    )
}