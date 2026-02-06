'use client';

import Link from "next/link";
import { Marquee } from "@/components/ui/marquee";

export function Footer() {
    return (
        <footer className="bg-spurs-blue text-white pt-20 pb-10 border-t border-white/10">
            {/* Big Marquee */}
            <div className="mb-20 border-y border-white/10 py-4 md:py-8 overflow-hidden">
                <Marquee speed={30} direction="right" className="opacity-30 hover:opacity-100 transition-opacity duration-500">
                    <span className="text-6xl md:text-9xl font-black tracking-tighter mx-8 md:mx-16">SPURS INC.</span>
                    <span className="text-6xl md:text-9xl font-black tracking-tighter mx-8 md:mx-16 text-transparent [-webkit-text-stroke:2px_white]">INNOVATE</span>
                    <span className="text-6xl md:text-9xl font-black tracking-tighter mx-8 md:mx-16">CREATE</span>
                    <span className="text-6xl md:text-9xl font-black tracking-tighter mx-8 md:mx-16 text-transparent [-webkit-text-stroke:2px_white]">FUTURE</span>
                </Marquee>
            </div>

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="col-span-1 md:col-span-2">
                    <Link href="/">
                        <img src="/logo-footer.png" alt="SPURS 株式会社" className="h-16 md:h-24 w-auto mb-2 brightness-0 invert" />
                    </Link>
                    <div className="text-blue-100/80 max-w-sm leading-relaxed text-sm pl-12">
                        <p>〒220-0004</p>
                        <p>神奈川県横浜市西区北幸2-10-48 むつみビル3階</p>
                        <p>TEL：045-275-0717（代表）</p>
                    </div>
                </div>

                <div>
                    <h3 className="font-bold mb-6 text-spurs-yellow uppercase tracking-widest text-sm text-white">Sitemap</h3>
                    <ul className="space-y-3 text-sm text-blue-100/80">
                        <li><Link href="/projects" className="hover:text-spurs-yellow transition-colors">案件情報一覧</Link></li>
                        <li><Link href="/engineers" className="hover:text-spurs-yellow transition-colors">要員情報一覧</Link></li>
                        <li><Link href="/contact" className="hover:text-spurs-yellow transition-colors">お打ち合わせ</Link></li>
                        <li className="pt-2"><Link href="/login" className="hover:text-spurs-yellow transition-colors italic opacity-50">管理者ログイン</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold mb-6 text-spurs-yellow uppercase tracking-widest text-sm text-white">Contact</h3>
                    <ul className="space-y-3 text-sm text-blue-100/80">
                        <li>
                            <Link href="http://spurs-inc.com/" target="_blank" className="hover:text-spurs-yellow transition-colors">コーポレートサイト</Link>
                        </li>
                        <li>
                            <Link href="/contact" className="hover:text-spurs-yellow transition-colors">お問い合わせ</Link>
                        </li>
                        <li>
                            <Link href="https://line.me/ti/g2/fPFzFYIHE4HDT7r1vq46NMxFFy0ZwYdrvIWDRw?utm_source=invitation&utm_medium=link_copy&utm_campaign=default" target="_blank" className="hover:text-spurs-yellow transition-colors block">
                                LINEチャットルーム
                            </Link>
                            <span className="text-[10px] opacity-60 block">
                                参加コード：SPURS
                            </span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-blue-100/60">
                <p>© 2026 Spurs Inc. All rights reserved.</p>
                <p>Designed with Intelligence.</p>
            </div>
        </footer>
    );
}
