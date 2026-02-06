import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function ProjectsPage() {
    // データベースのエラー（定義の不一致）が起きてもサイトが落ちないようにトライキャッチで保護
    let projects: any[] = [];
    try {
        projects = await prisma.project.findMany({
            where: { isPublic: true },
            orderBy: { createdAt: 'desc' },
        }) || [];
    } catch (e) {
        console.error("Database error:", e);
    }

    return (
        <div className="container mx-auto px-6 py-20">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-spurs-blue mb-4 tracking-tight">案件情報一覧</h1>
                <p className="text-spurs-gray mb-12 text-lg whitespace-pre-line">
                    掲載可能な弊社注力中の案件のみご紹介をしております。{"\n"}
                    この他、掲載不可案件等については営業担当へお問い合わせください。
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.length === 0 ? (
                        <p className="text-gray-500 py-10 text-center col-span-2">
                            現在、情報を読み込み中か、公開中の案件はありません。<br />
                            （データベースの更新が完了するまで少々お待ちください）
                        </p>
                    ) : (
                        projects.map((project: any) => (
                            <Link
                                key={project.id}
                                href={`/projects/${project.id}`}
                                className="group border border-spurs-blue/10 rounded-2xl shadow-sm bg-white hover:shadow-xl hover:shadow-spurs-blue/5 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden"
                            >
                                <div className="p-8 pb-4">
                                    <div className="flex flex-col gap-2 mb-6">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-0.5">
                                                <span className="text-[10px] text-gray-400 font-bold mr-1">注力度：</span>
                                                {Array.from({ length: 5 }).map((_, i) => (
                                                    <span key={i} className={`text-sm ${i < (project.priority ?? 1) ? 'text-spurs-yellow' : 'text-gray-200'}`}>
                                                        ★
                                                    </span>
                                                ))}
                                            </div>
                                            <span className="text-[10px] text-gray-400 font-medium">
                                                最終更新: {project.updatedAt ? new Date(project.updatedAt).toLocaleDateString('ja-JP') : '-'}
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            <span className="text-[10px] font-bold text-spurs-blue uppercase tracking-widest bg-spurs-blue/5 px-2 py-1 rounded w-fit">
                                                {project.commercialStream || "商流未定"}
                                            </span>
                                            {/* フィールド名が変更前のcontractTypeでも変更後のcommercialRestrictionでも表示できるように保護 */}
                                            {(project.commercialRestriction || project.contractType) && (
                                                <span className="text-[10px] font-bold text-spurs-green uppercase tracking-widest bg-spurs-green/5 px-2 py-1 rounded w-fit">
                                                    {project.commercialRestriction || project.contractType}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <h3 className="font-bold text-xl text-spurs-blue mb-4 group-hover:text-blue-700 transition-colors">
                                        {project.title}
                                    </h3>

                                    <div className="grid grid-cols-2 gap-4 mb-6 py-4 border-y border-gray-50">
                                        <div>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Location</p>
                                            <p className="text-xs text-gray-700 font-medium">{project.location || "-"}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Joining Period</p>
                                            <p className="text-xs text-gray-700 font-medium">{project.joiningPeriod || "-"}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.requiredSkills?.split(',').map((skill: string) => (
                                            <span key={skill} className="text-[10px] bg-gray-50 border border-gray-200 px-2 py-1 rounded text-gray-500 font-medium">
                                                {skill.trim()}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-auto bg-gray-50/80 px-8 py-6 border-t border-gray-100 flex items-center justify-between">
                                    <div className="text-spurs-blue font-black text-2xl flex items-baseline gap-1">
                                        {project.price || "-"}
                                        {project.price && /^\d+$/.test(project.price) && (
                                            <span className="text-sm font-bold opacity-60">万円/月</span>
                                        )}
                                    </div>
                                    <div className="text-spurs-green text-xs font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                        VIEW DETAILS <span>→</span>
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
