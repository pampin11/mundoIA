import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import BackToTop from "@/components/BackToTop";

export default function Layout({ children }) {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, [location.pathname]);

    return (
        <div className="relative min-h-screen flex flex-col bg-[#05050A]" data-testid="app-layout">
            {/* Ambient orbs */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
                <div className="absolute -top-40 -left-40 h-[500px] w-[500px] bg-orb-blue opacity-30 animate-orb-drift" />
                <div className="absolute top-[40%] -right-60 h-[600px] w-[600px] bg-orb-purple opacity-25 animate-orb-drift" style={{ animationDelay: "6s" }} />
            </div>
            <Header />
            <main className="flex-1 relative z-[2]">{children}</main>
            <Footer />
            <CookieBanner />
            <BackToTop />
        </div>
    );
}
