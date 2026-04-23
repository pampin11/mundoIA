import { useEffect, useState } from "react";
import { Send, CheckCircle2, Mail, MessageSquare, User } from "lucide-react";
import { toast } from "sonner";
import { api, SITE } from "@/lib/site";

export default function Contact() {
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    useEffect(() => {
        document.title = `Contacto | ${SITE.name}`;
    }, []);

    const onChange = (key) => (e) => setForm((s) => ({ ...s, [key]: e.target.value }));

    const submit = async (e) => {
        e.preventDefault();
        if (form.name.length < 2 || !form.email.includes("@") || form.subject.length < 2 || form.message.length < 10) {
            toast.error("Revisa que todos los campos estén completos");
            return;
        }
        setLoading(true);
        try {
            await api.post("/contact", form);
            toast.success("Mensaje enviado. Respondemos en menos de 48 h.");
            setSent(true);
            setForm({ name: "", email: "", subject: "", message: "" });
        } catch {
            toast.error("No se pudo enviar. Intenta más tarde.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16" data-testid="page-contact">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-blue-300">Contacto</p>
            <h1 className="mt-2 font-display text-4xl md:text-5xl font-bold tracking-tight">Hablemos</h1>
            <p className="mt-3 text-gray-400 max-w-2xl">
                ¿Colaboraciones, sugerencias o dudas sobre IA? Escríbenos y respondemos en menos de 48 h laborables.
            </p>

            <div className="mt-10 grid md:grid-cols-5 gap-8">
                <div className="md:col-span-3">
                    <form onSubmit={submit} className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8" data-testid="contact-form">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <label className="block">
                                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-400">Nombre</span>
                                <div className="relative mt-1.5">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                    <input
                                        type="text"
                                        value={form.name}
                                        onChange={onChange("name")}
                                        required
                                        className="w-full h-11 pl-10 pr-3 rounded-lg bg-black/50 border border-white/10 focus:border-purple-500/50 focus:outline-none"
                                        data-testid="contact-name"
                                    />
                                </div>
                            </label>
                            <label className="block">
                                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-400">Correo</span>
                                <div className="relative mt-1.5">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                    <input
                                        type="email"
                                        value={form.email}
                                        onChange={onChange("email")}
                                        required
                                        className="w-full h-11 pl-10 pr-3 rounded-lg bg-black/50 border border-white/10 focus:border-purple-500/50 focus:outline-none"
                                        data-testid="contact-email"
                                    />
                                </div>
                            </label>
                        </div>
                        <label className="block">
                            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-400">Asunto</span>
                            <input
                                type="text"
                                value={form.subject}
                                onChange={onChange("subject")}
                                required
                                className="mt-1.5 w-full h-11 px-3 rounded-lg bg-black/50 border border-white/10 focus:border-purple-500/50 focus:outline-none"
                                data-testid="contact-subject"
                            />
                        </label>
                        <label className="block">
                            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-400">Mensaje</span>
                            <div className="relative mt-1.5">
                                <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                                <textarea
                                    rows={6}
                                    value={form.message}
                                    onChange={onChange("message")}
                                    required
                                    className="w-full pl-10 pr-3 py-3 rounded-lg bg-black/50 border border-white/10 focus:border-purple-500/50 focus:outline-none resize-none"
                                    data-testid="contact-message"
                                />
                            </div>
                        </label>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium inline-flex items-center justify-center gap-2 shadow-[0_0_28px_rgba(168,85,247,0.35)] hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] transition-shadow disabled:opacity-60"
                            data-testid="contact-submit"
                        >
                            {sent ? <><CheckCircle2 className="h-4 w-4" /> Enviado</> : <><Send className="h-4 w-4" /> {loading ? "Enviando…" : "Enviar mensaje"}</>}
                        </button>
                    </form>
                </div>

                <div className="md:col-span-2 space-y-5">
                    <div className="rounded-2xl border border-white/10 p-6 bg-white/[0.02]">
                        <h3 className="font-display font-semibold text-lg">¿Por qué escribirnos?</h3>
                        <ul className="mt-3 space-y-3 text-sm text-gray-400">
                            <li className="flex gap-2"><span className="text-purple-400">→</span> Propuestas de colaboración o reseñas de herramientas.</li>
                            <li className="flex gap-2"><span className="text-purple-400">→</span> Correcciones o actualizaciones de artículos.</li>
                            <li className="flex gap-2"><span className="text-purple-400">→</span> Ideas de temas que te gustaría leer.</li>
                            <li className="flex gap-2"><span className="text-purple-400">→</span> Publicidad y patrocinios.</li>
                        </ul>
                    </div>
                    <div className="rounded-2xl border border-white/10 p-6 bg-gradient-to-br from-blue-500/10 to-transparent">
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-400">Correo directo</p>
                        <a href={`mailto:${SITE.email}`} className="mt-1 block font-display text-xl hover:text-blue-300">{SITE.email}</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
