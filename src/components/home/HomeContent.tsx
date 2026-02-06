'use client';

import React from 'react';
import { motion } from "framer-motion";
import { ArrowRight, Search, Calendar, Zap, CheckCircle2, MessageSquare, Send, Handshake } from "lucide-react";
import Link from "next/link";

interface HomeContentProps {
    activeProjectsCount: number;
    activeEngineersCount: number;
}

export default function HomeContent({ activeProjectsCount, activeEngineersCount }: HomeContentProps) {
    return (
        <div className="flex flex-col min-h-screen overflow-hidden">
            {/* Hero Section - Inspired by Leverages Design */}
            <section className="relative min-h-[70vh] pt-0 pb-6 flex items-center justify-center overflow-hidden bg-white">

                {/* Dynamic Abstract Background */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    {/* Animated Skewed Lines */}
                    <motion.div
                        initial={{ x: '-100%', skewY: -10 }}
                        animate={{ x: '100%' }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute top-[20%] left-0 w-[200%] h-px bg-gradient-to-r from-transparent via-spurs-blue/30 to-transparent"
                    />
                    <motion.div
                        initial={{ x: '100%', skewY: 10 }}
                        animate={{ x: '-100%' }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute top-[60%] left-0 w-[200%] h-px bg-gradient-to-r from-transparent via-spurs-red/20 to-transparent"
                    />

                    {/* Large Animated Background Shapes */}
                    <motion.div
                        animate={{
                            y: [0, -20, 0],
                            rotate: [-6, -4, -6]
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -top-[5%] -left-[5%] w-[110%] h-[25%] bg-spurs-blue/5 -rotate-6 transform origin-top-left"
                    />
                    <motion.div
                        animate={{
                            y: [0, 20, 0],
                            rotate: [3, 5, 3]
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-[15%] -right-[5%] w-[90%] h-[20%] bg-spurs-red/5 rotate-3 transform origin-bottom-right"
                    />

                    {/* Floating Accents */}
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.3, 0.5, 0.3],
                            x: [0, 30, 0],
                            y: [0, -30, 0]
                        }}
                        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-[30%] left-[15%] w-64 h-64 bg-spurs-yellow/10 rounded-full blur-3xl"
                    />
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.2, 0.4, 0.2],
                            x: [0, -50, 0],
                            y: [0, 50, 0]
                        }}
                        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-[20%] right-[20%] w-96 h-96 bg-spurs-green/10 rounded-full blur-3xl"
                    />

                    {/* Decorative Ring with Rotation */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                        className="absolute top-[10%] right-[10%] w-[45rem] h-[45rem] border-[1px] border-spurs-blue/5 rounded-full flex items-center justify-center"
                    >
                        <div className="w-[35rem] h-[35rem] border-[1px] border-spurs-green/10 rounded-full border-dashed" />
                    </motion.div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col md:flex-row items-center md:items-start justify-between gap-12">

                    {/* Left: Main Vertical/Large Text */}
                    <div className="flex flex-col md:flex-row items-start gap-10">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="hidden md:flex flex-col items-center gap-4"
                        >
                            <span className="[writing-mode:vertical-rl] text-spurs-red font-black text-xl tracking-[0.5em] h-fit">
                                INNOVATION
                            </span>
                            <div className="w-px h-24 bg-spurs-red" />
                        </motion.div>

                        <div className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="mb-10"
                            >
                                <img src="/hero-main.png" alt="Spurs Logo" className="w-[400px] md:w-[600px] lg:w-[800px] h-auto" />
                            </motion.div>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 0.6 }}
                                className="text-spurs-gray text-lg md:text-xl font-medium max-w-md leading-relaxed border-l-4 border-spurs-green pl-6"
                            >
                                再委託可能案件80％以上<br />
                                弊社独占情報や弊社優先情報で<br />
                                なりたい、やりたいを叶える。
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.8 }}
                                className="flex items-center gap-4 pt-4 border-t border-gray-100/50 w-fit"
                            >
                                <div className="bg-white p-1 rounded-sm shadow-sm border border-gray-100">
                                    <img src="/line-qr.jpg" alt="LINE QR" className="w-16 h-16 md:w-20 md:h-20 grayscale hover:grayscale-0 transition-all" />
                                </div>
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-xs font-bold text-spurs-blue tracking-wider flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 bg-[#06C755] rounded-full animate-pulse" />
                                        LINE配信実施中
                                    </span>
                                    <span className="text-[10px] text-spurs-gray font-mono uppercase">
                                        参加コード <span className="text-spurs-red font-bold">"spurs"</span>
                                    </span>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Right: CTA and Secondary Info */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="flex flex-col gap-6 w-full md:w-auto mt-12 md:mt-0 items-end"
                    >
                        <div className="text-right mb-6 hidden md:block text-spurs-blue">
                            <p className="text-[10px] font-black tracking-[0.3em] uppercase mb-1">Available Now</p>
                            <p className="font-bold text-lg">{activeProjectsCount} PROJECTS / {activeEngineersCount} ENGINEERS</p>
                        </div>

                        <div className="flex flex-col gap-4 w-full md:w-72">
                            <Link href="/projects" className="group relative overflow-hidden bg-spurs-blue text-white px-8 py-5 rounded-sm font-bold tracking-widest text-center transition-all shadow-2xl shadow-spurs-blue/20">
                                <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-spurs-blue transition-colors duration-500">
                                    案件を探す <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                                <div className="absolute top-0 -left-full w-full h-full bg-spurs-yellow transition-all duration-500 group-hover:left-0 -z-0" />
                            </Link>

                            <Link href="/engineers" className="group border-2 border-spurs-blue text-spurs-blue px-8 py-4 rounded-sm font-bold tracking-widest text-center hover:bg-spurs-blue hover:text-white transition-all">
                                要員を探す
                            </Link>

                            <Link href="/contact" className="group relative mt-4 text-center text-sm font-bold text-spurs-gray hover:text-spurs-blue transition-colors flex items-center justify-center gap-2 w-fit mx-auto pb-1">
                                ご協業のご相談はコチラから <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-spurs-blue origin-right scale-x-0 group-hover:scale-x-100 group-hover:origin-left transition-transform duration-300 ease-out" />
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-6 left-10 hidden md:flex items-center gap-6">
                    <div className="flex flex-col gap-1 text-[8px] font-black text-spurs-blue/30 uppercase tracking-[0.4em]">
                        <span>EST 2026</span>
                        <span>Spurs Inc.</span>
                    </div>
                </div>

                <div className="absolute right-0 bottom-[15%] w-1 h-32 bg-gradient-to-b from-spurs-blue via-spurs-red to-spurs-green hidden lg:block" />
            </section>

            {/* Stats Section - Compact Floating Cards */}
            <section className="py-12 bg-spurs-blue text-white relative overflow-hidden flex items-center">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-spurs-yellow via-spurs-green to-spurs-yellow" />

                {/* Background decorative ornaments */}
                <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                    <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] bg-spurs-yellow/10 blur-[120px] rounded-full" />
                    <div className="absolute -bottom-[10%] -right-[5%] w-[40%] h-[40%] bg-spurs-green/10 blur-[120px] rounded-full" />
                </div>

                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-4 w-full relative z-10">
                    {[
                        {
                            label: "Active Projects",
                            value: activeProjectsCount,
                            color: "text-spurs-yellow",
                            sub: null,
                            jp: "公開案件数",
                            href: "/projects"
                        },
                        {
                            label: "Total Engineers",
                            value: activeEngineersCount,
                            color: "text-spurs-green",
                            sub: null,
                            jp: "紹介可能要員数",
                            href: "/engineers"
                        },
                        {
                            label: "Open Streams",
                            value: "80.5%",
                            color: "text-white",
                            sub: null,
                            jp: "商流不問案件率"
                        },
                        {
                            label: "Response Time",
                            value: "3",
                            unit: "h",
                            color: "text-white",
                            sub: "Within",
                            jp: "平均レスポンス時間"
                        }
                    ].map((stat, idx) => {
                        const isLink = !!stat.href;
                        const cardContent = (
                            <>
                                {/* Japanese Translation Tag */}
                                <span className={`absolute bottom-2 right-3 text-[8px] font-bold tracking-tight transition-colors pointer-events-none ${isLink ? 'text-blue-100/60 group-hover:text-white' : 'text-blue-100/90'}`}>
                                    {stat.jp}
                                </span>

                                <div className="min-h-[2rem] flex items-center justify-center">
                                    <p className={`text-blue-100 text-xs font-black uppercase tracking-wider text-center transition-opacity ${isLink ? 'opacity-90 group-hover:opacity-100' : 'opacity-100'}`}>
                                        {stat.label}
                                    </p>
                                </div>

                                <div className="flex flex-col items-center justify-center">
                                    {stat.label === "Response Time" ? (
                                        <div className="flex items-baseline gap-0.5">
                                            <span className="text-4xl md:text-5xl font-black tracking-tighter text-white leading-none">3</span>
                                            <span className="text-xl font-bold text-white/60 uppercase">h</span>
                                        </div>
                                    ) : (
                                        <p className={`text-4xl md:text-5xl font-black tracking-tighter leading-none ${stat.color}`}>
                                            {stat.value}
                                        </p>
                                    )}
                                    {stat.sub && (
                                        <p className={`text-[10px] font-black uppercase tracking-[0.2em] mt-1 -mr-[0.2em] ${stat.label === "Total Engineers" ? "text-spurs-green/60" : "text-white/30"}`}>
                                            {stat.sub}
                                        </p>
                                    )}
                                </div>
                            </>
                        );

                        const baseClasses = "relative bg-white/5 backdrop-blur-sm border border-white/10 p-5 rounded-xl flex flex-col items-center justify-center space-y-2 shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition-all duration-300 group";

                        if (isLink) {
                            return (
                                <Link href={stat.href!} key={stat.label} className="w-full">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                                        whileHover={{ y: -5, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                                        className={`${baseClasses} hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] cursor-pointer h-full`}
                                    >
                                        {cardContent}
                                    </motion.div>
                                </Link>
                            );
                        }

                        return (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: idx * 0.05 }}
                                className={`${baseClasses} cursor-default`}
                            >
                                {cardContent}
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* Service Flow Section */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-spurs-blue font-mono text-sm tracking-widest uppercase mb-4">How to Use</h2>
                        <h3 className="text-3xl md:text-4xl font-bold text-spurs-blue">ご利用の流れ</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: Search, title: "案件・要員を探す", text: "スキル、単価、稼働時期など詳細な条件から、ご希望にマッチする情報を検索。" },
                            { icon: Send, title: "提案する", text: "案件、要員情報詳細ページから提案が可能。\nボタンが正しく動作しない方は「support@spurs-inc.com」まで" },
                            { icon: Zap, title: "マッチング成立", text: "専任の担当者がスピード感を持ってサポート。最短1営業日でマッチングを確定。" },
                            { icon: Handshake, title: "パートナーシップを構築する", text: "ご協業や、より詳しい案件情報が気になる方。\n弊社営業と直接連携をご希望の方は日程を調整。" },
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm relative">
                                <div className="absolute -top-4 -left-4 w-10 h-10 bg-spurs-yellow rounded-full flex items-center justify-center font-black text-spurs-blue text-sm shadow-lg">
                                    0{idx + 1}
                                </div>
                                <div className="w-12 h-12 bg-spurs-blue rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-spurs-blue/10">
                                    <item.icon className="w-6 h-6 text-white" />
                                </div>
                                <h4 className="text-xl font-bold text-spurs-blue mb-4 leading-tight">{item.title}</h4>
                                <p className="text-spurs-gray text-sm leading-relaxed whitespace-pre-line">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Spurs Section */}
            <section className="py-24 bg-white relative">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-spurs-blue font-mono text-sm tracking-widest uppercase mb-4">Why Choose Us</h2>
                            <h3 className="text-4xl md:text-5xl font-extrabold text-spurs-blue leading-tight">
                                現場の「ズレ」をなくし、<br />
                                最高のパフォーマンスを。
                            </h3>
                        </div>
                        <ul className="space-y-4">
                            {[
                                "掲載案件の80％以上が再委託可能・商流不問",
                                "最短1時間〜平均3時間以内の迅速なレスポンス",
                                "案件・要員情報のリアルタイム公開による高い透明性",
                                "パートナー企業様との強固な連携による継続的な共創"
                            ].map((text, i) => (
                                <li key={i} className="flex items-center gap-3 text-gray-700 font-medium group">
                                    <span className="w-6 h-6 rounded-full bg-spurs-green/10 flex items-center justify-center shrink-0 group-hover:bg-spurs-green transition-colors">
                                        <CheckCircle2 className="w-4 h-4 text-spurs-green group-hover:text-white transition-colors" />
                                    </span>
                                    {text}
                                </li>
                            ))}
                        </ul>
                        <div className="pt-4">
                            <Link href="/contact" className="inline-flex items-center gap-2 group text-spurs-blue font-bold border-b-2 border-spurs-yellow pb-2 hover:border-spurs-green transition-all">
                                パートナー提携について相談する
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-tr from-spurs-yellow to-spurs-green opacity-20 blur-2xl rounded-full animate-pulse" />
                        <div className="relative bg-spurs-blue rounded-3xl p-8 md:p-12 shadow-2xl space-y-8">
                            <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                                    <MessageSquare className="w-6 h-6 text-spurs-yellow" />
                                </div>
                                <h4 className="text-white font-bold text-lg">スピード回答をお約束</h4>
                            </div>
                            <p className="text-blue-100/80 text-sm leading-relaxed">
                                Spursのポータルサイトでは、すべての問い合わせに対し**最短1時間〜平均3時間以内**のレスポンスを徹底しています。
                                「案件はあるが人がいない」「人はいるが案件が決まらない」そんなビジネスの停滞を、圧倒的なスピードで解消します。
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                    <p className="text-[10px] text-blue-200 font-bold uppercase mb-1">Open Streams</p>
                                    <p className="text-xl font-black text-spurs-green">80.5%</p>
                                </div>
                                <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex flex-col justify-center">
                                    <p className="text-[10px] text-blue-200 font-bold uppercase mb-1">Speed to Match</p>
                                    <div className="flex items-baseline gap-1">
                                        <p className="text-xl font-black text-spurs-yellow">1</p>
                                        <p className="text-[10px] font-bold text-spurs-yellow/80 uppercase">Business Day</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
