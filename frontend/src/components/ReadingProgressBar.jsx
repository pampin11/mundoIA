import { useEffect, useState } from "react";

export default function ReadingProgressBar() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const update = () => {
            const article = document.querySelector("[data-article-content]");
            if (!article) {
                setProgress(0);
                return;
            }
            const rect = article.getBoundingClientRect();
            const total = rect.height - window.innerHeight;
            const read = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
            setProgress((read / Math.max(total, 1)) * 100);
        };
        update();
        window.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);
        return () => {
            window.removeEventListener("scroll", update);
            window.removeEventListener("resize", update);
        };
    }, []);

    return (
        <div
            className="reading-progress"
            style={{ width: `${progress}%` }}
            data-testid="reading-progress-bar"
            aria-hidden
        />
    );
}
