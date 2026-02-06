import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { User, Code2, GraduationCap, Briefcase, Calendar, MapPin, ExternalLink, Clock } from "lucide-react";

export default async function EngineerDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    let engineer: any = null;
    try {
        engineer = await prisma.engineer.findUnique({
            where: { id: parseInt(id) }
        });
    } catch (e) {
        console.error("Database fetch error:", e);
    }

    if (!engineer || !engineer.isPublic) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <Link href="/engineers" className="text-sm font-medium text-spurs-gray hover:text-spurs-blue mb-8 inline-flex items-center gap-1 group transition-colors">
                <span className="group-hover:-translate-x-1 transition-transform">←</span> 要員一覧に戻る
            </Link>

            <div className="bg-white border border-gray-100 shadow-xl shadow-gray-200/50 rounded-2xl p-8 md:p-12 relative overflow-hidden">

                {/* Profile Header */}
                <div className="flex flex-col md:flex-row items-start gap-8 mb-10 pb-10 border-b border-gray-100">
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-spurs-blue to-blue-900 rounded-full flex items-center justify-center text-white font-bold text-4xl md:text-5xl shadow-lg shrink-0">
                        {engineer.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                            <span className="bg-spurs-green-50 text-spurs-green-700 text-xs font-bold px-3 py-1 rounded-full border border-spurs-green-100 flex items-center gap-1">
                                <span className="w-2 h-2 bg-spurs-lime rounded-full animate-pulse"></span>
                                稼働可能: {engineer.availability}
                            </span>
                            <span className="text-gray-400 text-xs font-mono">ID: ENG-{engineer.id.toString().padStart(4, '0')}</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
                            {engineer.name}
                        </h1>
                        <div className="flex items-center gap-3 mb-4">
                            <p className="text-lg text-spurs-blue font-medium">
                                {engineer.role}
                            </p>
                            {engineer.genderAge && (
                                <span className="text-sm bg-gray-100 text-gray-600 px-3 py-0.5 rounded-full font-bold">
                                    {engineer.genderAge}
                                </span>
                            )}
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-gray-400" /> 稼働開始日: {engineer.availability}</div>
                            <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-gray-400" /> {engineer.location}</div>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid md:grid-cols-3 gap-10">
                    <div className="md:col-span-2 space-y-10">

                        {/* Summary */}
                        <section>
                            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <User className="w-5 h-5 text-spurs-blue" /> プロフィール概要
                            </h2>
                            <p className="text-gray-600 leading-relaxed text-sm whitespace-pre-wrap">
                                {engineer.summary}
                            </p>
                        </section>

                        {/* Technical Skills */}
                        <section>
                            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Code2 className="w-5 h-5 text-spurs-blue" /> 技術スキル
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {engineer.skills?.split(',').map((tech: string) => (
                                    <span key={tech} className="bg-gray-50 border border-gray-200 text-gray-700 text-sm px-3 py-1 rounded-md font-medium">
                                        {tech.trim()}
                                    </span>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-spurs-blue/[0.02] border border-spurs-blue/10 rounded-xl p-6 space-y-6">
                            <div>
                                <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider font-bold">希望単価(税抜)</p>
                                <p className="font-bold text-spurs-blue text-2xl">{engineer.price}<span className="text-sm font-normal ml-1">万円/月</span></p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider font-bold">最寄り駅</p>
                                <p className="font-bold text-gray-800 text-sm">{engineer.nearestStation}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider font-bold">希望勤務形態</p>
                                <p className="font-bold text-gray-800 text-sm">{engineer.location}</p>
                            </div>
                            {engineer.genderAge && (
                                <div>
                                    <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider font-bold">性別・年齢</p>
                                    <p className="font-bold text-gray-800 text-sm">{engineer.genderAge}</p>
                                </div>
                            )}
                        </div>

                        <div className="sticky top-24 flex flex-col gap-3">
                            {engineer.skillSheetUrl && (
                                <a
                                    href={engineer.skillSheetUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group block w-full bg-white text-spurs-blue border-2 border-spurs-blue font-bold text-lg py-4 rounded-xl shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all duration-300 text-center flex items-center justify-center gap-2"
                                >
                                    <ExternalLink className="w-5 h-5" />
                                    スキルシート
                                </a>
                            )}
                            <a
                                href={`https://mail.google.com/mail/?view=cm&fs=1&to=info@spurs-inc.com&su=要員照会: ${engineer.name}&body=担当者様%0D%0A%0D%0A以下のエンジニアについて提案をお願いしたくご連絡いたしました。%0D%0A%0D%0AID: ENG-${engineer.id.toString().padStart(4, '0')}%0D%0Aエンジニア名: ${engineer.name}%0D%0A%0D%0A貴社名：%0D%0Aご担当者名：%0D%0Aご連絡先：%0D%0A%0D%0Aよろしくお願いいたします。`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group block w-full bg-spurs-blue text-white font-bold text-lg py-4 rounded-xl shadow-xl shadow-spurs-blue/20 hover:shadow-2xl hover:shadow-spurs-blue/30 hover:-translate-y-1 transition-all duration-300 text-center"
                            >
                                提案する
                                <span className="block text-[10px] font-normal opacity-70 mt-1 group-hover:opacity-100 transition-opacity">
                                    Gmailが起動します
                                </span>
                            </a>

                            <a
                                href={`mailto:info@spurs-inc.com?subject=要員照会: ${engineer.name}&body=担当者様...`}
                                className="block w-full bg-white text-gray-600 font-bold text-sm py-3 rounded-xl border border-gray-200 hover:bg-gray-50 hover:text-spurs-blue hover:border-spurs-blue/30 transition-all text-center"
                            >
                                📧 既定のメールアプリで開く
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
