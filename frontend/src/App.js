import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Article from "@/pages/Article";
import Category from "@/pages/Category";
import Search from "@/pages/Search";
import Contact from "@/pages/Contact";
import About from "@/pages/About";
import Privacy from "@/pages/Privacy";
import Cookies from "@/pages/Cookies";
import NotFound from "@/pages/NotFound";

function ScrollToTop() {
    // Handled at route-change level inside pages when needed
    return null;
}

function App() {
    useEffect(() => {
        document.documentElement.classList.add("dark");
    }, []);

    return (
        <div className="App">
            <BrowserRouter>
                <ScrollToTop />
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/articulo/:slug" element={<Article />} />
                        <Route path="/categoria/:slug" element={<Category />} />
                        <Route path="/buscar" element={<Search />} />
                        <Route path="/contacto" element={<Contact />} />
                        <Route path="/sobre-nosotros" element={<About />} />
                        <Route path="/privacidad" element={<Privacy />} />
                        <Route path="/cookies" element={<Cookies />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Layout>
            </BrowserRouter>
            <Toaster
                position="bottom-right"
                toastOptions={{
                    style: {
                        background: "rgba(10,10,15,0.9)",
                        border: "1px solid rgba(168,85,247,0.3)",
                        color: "#F8F9FA",
                        backdropFilter: "blur(16px)",
                    },
                }}
            />
        </div>
    );
}

export default App;
