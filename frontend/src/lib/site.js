import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({
    baseURL: API,
    headers: { "Content-Type": "application/json" },
});

export const CATEGORY_META = {
    "herramientas-ia": { name: "Herramientas IA", color: "#3B82F6", glow: "rgba(59,130,246,0.35)" },
    "prompts": { name: "Prompts", color: "#A855F7", glow: "rgba(168,85,247,0.35)" },
    "ganar-dinero": { name: "Ganar dinero con IA", color: "#10B981", glow: "rgba(16,185,129,0.35)" },
    "automatizacion": { name: "Automatización", color: "#F59E0B", glow: "rgba(245,158,11,0.35)" },
    "ia-estudiantes": { name: "IA para estudiantes", color: "#EC4899", glow: "rgba(236,72,153,0.35)" },
};

export const SITE = {
    name: "Mundo IA",
    tagline: "Inteligencia artificial aplicada al día a día",
    subtitle: "Descubre cómo la IA puede ayudarte a ahorrar tiempo y ganar dinero",
    email: "hola@mundoia.com",
};

export const formatDate = (iso) => {
    try {
        const d = new Date(iso);
        return d.toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });
    } catch {
        return "";
    }
};

export const renderMarkdown = (md) => {
    // Simple markdown -> HTML for our seeded articles (## ### ** - | blockquote)
    const lines = md.split("\n");
    const html = [];
    let inList = null;
    let inTable = false;
    let tableBuffer = [];

    const flushList = () => {
        if (inList) {
            html.push(`</${inList}>`);
            inList = null;
        }
    };
    const flushTable = () => {
        if (inTable && tableBuffer.length) {
            const [header, _align, ...rows] = tableBuffer;
            const headCells = header.split("|").filter(c => c.trim()).map(c => `<th>${c.trim()}</th>`).join("");
            const bodyRows = rows.map(r => {
                const cells = r.split("|").filter(c => c.trim()).map(c => `<td>${inlineFormat(c.trim())}</td>`).join("");
                return `<tr>${cells}</tr>`;
            }).join("");
            html.push(`<table><thead><tr>${headCells}</tr></thead><tbody>${bodyRows}</tbody></table>`);
            tableBuffer = [];
            inTable = false;
        }
    };

    const inlineFormat = (text) => {
        return text
            .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
            .replace(/\*(.+?)\*/g, "<em>$1</em>")
            .replace(/`(.+?)`/g, "<code>$1</code>");
    };

    const slugify = (text) =>
        text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.startsWith("|") && line.includes("|")) {
            flushList();
            inTable = true;
            tableBuffer.push(line);
            continue;
        } else if (inTable) {
            flushTable();
        }
        if (line.startsWith("### ")) {
            flushList();
            const t = line.slice(4);
            html.push(`<h3 id="${slugify(t)}">${inlineFormat(t)}</h3>`);
        } else if (line.startsWith("## ")) {
            flushList();
            const t = line.slice(3);
            html.push(`<h2 id="${slugify(t)}">${inlineFormat(t)}</h2>`);
        } else if (line.startsWith("# ")) {
            flushList();
            const t = line.slice(2);
            html.push(`<h1 id="${slugify(t)}">${inlineFormat(t)}</h1>`);
        } else if (line.startsWith("> ")) {
            flushList();
            html.push(`<blockquote>${inlineFormat(line.slice(2))}</blockquote>`);
        } else if (/^\d+\.\s/.test(line)) {
            if (inList !== "ol") {
                flushList();
                html.push("<ol>");
                inList = "ol";
            }
            html.push(`<li>${inlineFormat(line.replace(/^\d+\.\s/, ""))}</li>`);
        } else if (line.startsWith("- ")) {
            if (inList !== "ul") {
                flushList();
                html.push("<ul>");
                inList = "ul";
            }
            html.push(`<li>${inlineFormat(line.slice(2))}</li>`);
        } else if (line.trim() === "") {
            flushList();
        } else {
            flushList();
            html.push(`<p>${inlineFormat(line)}</p>`);
        }
    }
    flushList();
    flushTable();
    return html.join("\n");
};

export const extractHeadings = (md) => {
    const lines = md.split("\n");
    const headings = [];
    const slugify = (text) =>
        text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
    for (const line of lines) {
        if (line.startsWith("## ")) {
            const text = line.slice(3).replace(/\*\*/g, "");
            headings.push({ level: 2, text, id: slugify(text) });
        } else if (line.startsWith("### ")) {
            const text = line.slice(4).replace(/\*\*/g, "");
            headings.push({ level: 3, text, id: slugify(text) });
        }
    }
    return headings;
};
