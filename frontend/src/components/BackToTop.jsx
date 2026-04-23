import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handler = () => setVisible(window.scrollY > 600);
        window.addEventListener("scroll", handler, { passive: true });
        return () => window.removeEventListener("scroll", handler);
    }, []);

    if (!visible) return null;

    return (
        <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-24 right-5 md:bottom-8 md:right-8 z-40 h-11 w-11 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white grid place-items-center shadow-[0_0_28px_rgba(168,85,247,0.5)] hover:scale-110 transition-transform animate-fade-in"
            aria-label="Volver arriba"
            data-testid="back-to-top-btn"
        >
            <ArrowUp className="h-5 w-5" strokeWidth={2} />
        </button>
    );
}
