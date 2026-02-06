'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { Marquee } from "@/components/ui/marquee";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    // Force scroll to top on navigation to prevent "cut off" issue
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, [pathname]);
    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex flex-col">
            {/* Top News Marquee */}
            <div className="w-full bg-spurs-yellow text-spurs-blue text-xs font-bold uppercase tracking-widest py-1">
                <Marquee speed={40} direction="left" className="gap-4">
                    <span className="mx-4">We are hiring engineers!</span>
                    <span className="mx-4">•</span>
                    <span className="mx-4">Spurs Inc. 2026 Vision Released</span>
                    <span className="mx-4">•</span>
                    <span className="mx-4">Check our latest projects</span>
                    <span className="mx-4">•</span>
                    <span className="mx-4">Innovation meets Intelligence</span>
                    <span className="mx-4">•</span>
                </Marquee>
            </div>

            {/* Main Nav */}
            <div className="w-full backdrop-blur-md bg-white/90 border-b border-spurs-blue/5">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="hover:opacity-80 transition-opacity flex items-center">
                        <img src="/logo.png" alt="SPURS" className="h-10 md:h-14 w-auto" />
                    </Link>

                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="/projects" className="text-sm font-medium text-spurs-gray hover:text-spurs-blue transition-colors">
                            案件情報
                        </Link>
                        <Link href="/engineers" className="text-sm font-medium text-spurs-gray hover:text-spurs-blue transition-colors">
                            要員情報
                        </Link>
                        <Link href="/contact" className="text-sm font-medium text-spurs-gray hover:text-spurs-blue transition-colors">
                            お打ち合わせ
                        </Link>
                        <Link href="http://spurs-inc.com/" target="_blank" className="text-sm font-medium text-spurs-gray hover:text-spurs-blue transition-colors">
                            会社情報
                        </Link>
                    </nav>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-sm font-bold text-spurs-blue uppercase border border-spurs-blue/20 px-3 py-1 rounded hover:bg-spurs-blue/5 z-50 relative"
                    >
                        {isOpen ? "Close" : "Menu"}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 top-[100px] z-40 bg-white/95 backdrop-blur-lg md:hidden flex flex-col p-6 border-t border-gray-100 shadow-xl"
                    >
                        <nav className="flex flex-col gap-6 text-lg font-bold text-spurs-blue mt-4">
                            <Link href="/projects" onClick={() => setIsOpen(false)} className="py-2 border-b border-gray-100 flex justify-between items-center group">
                                案件情報
                                <span className="text-spurs-yellow text-2xl group-hover:translate-x-1 transition-transform">→</span>
                            </Link>
                            <Link href="/engineers" onClick={() => setIsOpen(false)} className="py-2 border-b border-gray-100 flex justify-between items-center group">
                                要員情報
                                <span className="text-spurs-yellow text-2xl group-hover:translate-x-1 transition-transform">→</span>
                            </Link>
                            <Link href="/contact" onClick={() => setIsOpen(false)} className="py-2 border-b border-gray-100 flex justify-between items-center group">
                                お打ち合わせ
                                <span className="text-spurs-yellow text-2xl group-hover:translate-x-1 transition-transform">→</span>
                            </Link>
                            <Link href="http://spurs-inc.com/" target="_blank" onClick={() => setIsOpen(false)} className="py-2 border-b border-gray-100 flex justify-between items-center group">
                                会社情報
                                <span className="text-spurs-yellow text-2xl group-hover:translate-x-1 transition-transform">→</span>
                            </Link>
                        </nav>

                        <div className="mt-auto mb-20 text-xs text-center text-gray-400 font-mono">
                            SPURS INC. EST 2026.
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
