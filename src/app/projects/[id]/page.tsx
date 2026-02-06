import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { FileText, CheckCircle2, Clock, MapPin, Briefcase, Calendar } from "lucide-react";

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    let project: any = null;
    try {
        project = await prisma.project.findUnique({
            where: { id: parseInt(id) }
        });
    } catch (e) {
        console.error("Database detail fetch error:", e);
    }

    if (!project || !project.isPublic) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <Link href="/projects" className="text-sm font-medium text-spurs-gray hover:text-spurs-blue mb-8 inline-flex items-center gap-1 group transition-colors">
                <span className="group-hover:-translate-x-1 transition-transform">←</span> 案件一覧に戻る
            </Link>

            <div className="bg-white border border-gray-100 shadow-xl shadow-gray-200/50 rounded-2xl p-8 md:p-12">
                {/* Header Section */}
                <div className="mb-10 pb-10 border-b border-gray-100">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="bg-spurs-blue text-white text-[10px] font-black px-3 py-1 rounded-full tracking-tighter">
                            {project.commercialStream || "商流未定"}
                        </span>
                        <span className="text-gray-400 text-xs font-mono">ID: PRJ-{project.id.toString().padStart(4, '0')}</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-spurs-blue mb-6 tracking-tight leading-tight">
                        {project.title}
                    </h1>
                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center">
                            <span className="text-[10px] text-gray-400 font-bold mr-2 uppercase tracking-wider">注力度</span>
                            <div className="flex items-center gap-0.5">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <span key={i} className={`text-base ${i < (project.priority ?? 1) ? 'text-spurs-yellow' : 'text-gray-200'}`}>
                                        ★
                                    </span>
                                ))}
                            </div>
                        </div>
                        {project.commercialRestriction && (
                            <div className="flex items-center">
                                <span className="text-[10px] text-gray-400 font-bold mr-2 uppercase tracking-wider">商流制限</span>
                                <span className="text-sm text-spurs-blue font-bold tracking-tight">
                                    {project.commercialRestriction}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Overview Section */}
                <div className="grid md:grid-cols-3 gap-10 mb-12">
                    <div className="md:col-span-2 space-y-10">
                        <section>
                            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-spurs-blue" /> 案件概要
                            </h2>
                            <p className="text-gray-600 leading-relaxed text-sm whitespace-pre-wrap">
                                {project.description}
                            </p>
                            {project.content && (
                                <div className="mt-6 text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
                                    {project.content}
                                </div>
                            )}
                        </section>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <section>
                                <h2 className="text-md font-bold text-gray-900 mb-4">必須スキル</h2>
                                <ul className="space-y-3">
                                    {project.requiredSkills?.split(',').map((skill: string, idx: number) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                                            <CheckCircle2 className="w-4 h-4 text-spurs-green mt-0.5 shrink-0" />
                                            {skill.trim()}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                            <section>
                                <h2 className="text-md font-bold text-gray-900 mb-4 text-gray-400">尚可・歓迎スキル</h2>
                                <ul className="space-y-3">
                                    {project.preferredSkills?.split(',').map((skill: string, idx: number) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-400">
                                            <CheckCircle2 className="w-4 h-4 text-gray-200 mt-0.5 shrink-0" />
                                            {skill.trim()}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        </div>
                    </div>

                    {/* Conditions Card */}
                    <aside className="space-y-6">
                        <div className="bg-gray-50/50 border border-gray-100 rounded-xl p-6 space-y-5">
                            <h3 className="text-sm font-bold text-gray-900 border-b border-gray-200 pb-3">募集条件</h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Briefcase className="w-4 h-4 text-gray-400 mt-1" />
                                    <div>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase">Price</p>
                                        <div className="text-xl text-spurs-blue font-black flex items-baseline gap-0.5">
                                            {project.price || "-"}
                                            {project.price && /^\d+$/.test(project.price) && (
                                                <span className="text-[10px] font-bold opacity-60">万円/月</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                                    <div>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase">Location</p>
                                        <p className="text-sm text-gray-700 font-medium">{project.location}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Calendar className="w-4 h-4 text-gray-400 mt-1" />
                                    <div>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase">Interview</p>
                                        <p className="text-sm text-gray-700 font-medium">{project.interviewCount}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Clock className="w-4 h-4 text-gray-400 mt-1" />
                                    <div>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase">Working Hours</p>
                                        <p className="text-sm text-gray-700 font-medium">{project.workingHours}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Calendar className="w-4 h-4 text-gray-400 mt-1" />
                                    <div>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase">Joining Period</p>
                                        <p className="text-sm text-gray-700 font-medium">{project.joiningPeriod || "-"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Apply Buttons */}
                        <div className="flex flex-col gap-3">
                            <a
                                href={`https://mail.google.com/mail/?view=cm&fs=1&to=support@spurs-inc.com&su=案件応募: ${project.title}&body=担当者様%0D%0A%0D%0A以下の案件に応募したくご連絡いたしました。%0D%0A%0D%0A案件名：${project.title}%0D%0A%0D%0A氏名：%0D%0Aご連絡先：%0D%0A%0D%0Aよろしくお願いいたします。`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group block w-full bg-spurs-blue text-white font-bold text-center py-4 rounded-xl shadow-xl shadow-spurs-blue/10 hover:-translate-y-1 transition-all"
                            >
                                提案する
                                <span className="block text-[8px] font-normal opacity-70 mt-1">Gmailが起動します</span>
                            </a>
                            <a
                                href={`mailto:support@spurs-inc.com?subject=案件応募: ${project.title}&body=担当者様...`}
                                className="block w-full bg-white text-gray-500 font-bold text-xs text-center py-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-all"
                            >
                                📧 既定のメールアプリで開く
                            </a>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
