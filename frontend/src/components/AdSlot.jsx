import { useEffect, useRef } from "react";

/**
 * AdSlot - AdSense placeholder styled as an intentional element.
 * When AdSense is approved and configured with real slot IDs, replace the
 * <ins className="adsbygoogle" ... /> element with a real slot ID.
 */
export default function AdSlot({
    slot = "auto",
    format = "auto",
    layout = "horizontal",
    className = "",
    testId = "ad-slot",
    label = "PUBLICIDAD",
}) {
    const adRef = useRef(null);
    const client = "ca-pub-4065544185286337";

    useEffect(() => {
        try {
            if (typeof window !== "undefined" && window.adsbygoogle) {
                window.adsbygoogle = window.adsbygoogle || [];
                window.adsbygoogle.push({});
            }
        } catch (_e) {
            /* adsense may not be loaded yet or in dev */
        }
    }, []);

    const minHeight =
        layout === "square" ? 280 :
        layout === "vertical" ? 600 :
        layout === "large" ? 280 :
        120;

    return (
        <div
            className={`relative my-6 rounded-xl border border-dashed border-white/15 bg-white/[0.015] overflow-hidden ${className}`}
            data-testid={testId}
            aria-label="Espacio publicitario"
        >
            <span className="absolute top-2 left-3 text-[10px] font-mono uppercase tracking-[0.25em] text-gray-500 bg-black/40 px-2 py-0.5 rounded">
                {label}
            </span>
            <ins
                ref={adRef}
                className="adsbygoogle block"
                style={{ display: "block", minHeight, width: "100%" }}
                data-ad-client={client}
                data-ad-slot={slot}
                data-ad-format={format}
                data-full-width-responsive="true"
            />
            {/* Fallback visual while ads not live yet */}
            <div className="absolute inset-0 grid place-items-center pointer-events-none">
                <div className="text-center">
                    <div className="font-mono text-[11px] tracking-[0.25em] text-gray-500 uppercase">Anuncio</div>
                    <div className="mt-1 font-display text-xs text-gray-600">Espacio reservado · Google AdSense</div>
                </div>
            </div>
        </div>
    );
}
