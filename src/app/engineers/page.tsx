import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function EngineersPage() {
    let engineers: any[] = [];
    try {
        engineers = await prisma.engineer.findMany({
            where: { isPublic: true },
            orderBy: { createdAt: 'desc' },
        }) || [];
    } catch (e) {
        console.error("Database fetch error:", e);
    }

    return (
        <div className="container mx-auto px-6 py-20">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-spurs-blue mb-4 tracking-tight">要員情報一覧</h1>
                <p className="text-spurs-gray mb-12 text-lg whitespace-pre-line">
                    現在、弊社注力中のエンジニア情報です。{"\n"}
                    掲載の無いスキルセットをご希望の方は、営業担当へお問い合わせください。
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {engineers.length === 0 ? (
                        <p className="text-gray-500 py-10 text-center col-span-full font-medium">現在、公開中の要員情報はありません。</p>
                    ) : (
                        engineers.map((eng: any) => (
                            <Link href={`/engineers/${eng.id}`} key={eng.id} className="block group p-6 border border-spurs-blue/10 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow flex flex-col h-full">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-14 h-14 bg-gradient-to-br from-spurs-blue to-blue-900 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-105 transition-transform shrink-0">
                                        {eng.name.charAt(0)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-2 overflow-hidden">
                                            <h3 className="font-bold text-lg text-spurs-blue group-hover:text-spurs-yellow transition-colors truncate">{eng.name}</h3>
                                            {eng.genderAge && (
                                                <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-bold whitespace-nowrap shrink-0">
                                                    {eng.genderAge}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex flex-col gap-1 mt-2">
                                            <p className="text-sm font-bold text-gray-700 truncate">
                                                {eng.role}
                                            </p>
                                            <p className="text-[10px] text-spurs-green font-bold bg-spurs-green/10 px-2 py-0.5 rounded w-fit">
                                                稼働: {eng.availability}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 bg-gray-50/50 rounded-xl space-y-3 mt-auto">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">単価目安</span>
                                            <p className="font-bold text-spurs-blue text-lg">
                                                {eng.price || "-"}
                                                <span className="text-xs font-normal ml-0.5">万円/月</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">最寄り駅</span>
                                        <p className="font-bold text-gray-700 text-sm truncate">
                                            {eng.nearestStation || "-"}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-6 flex items-center justify-center gap-1 text-spurs-blue text-sm font-bold group-hover:translate-x-1 transition-transform">
                                    詳細をチェックする <span className="text-lg">→</span>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
