import React from 'react';
import { prisma } from '@/lib/prisma';
import { format } from 'date-fns';
import { Mail, Phone, Building2, Calendar } from "lucide-react";

export default async function AdminInquiriesPage() {
    const inquiries = await prisma.inquiry.findMany({
        orderBy: { createdAt: 'desc' },
    });

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">お問い合わせ一覧</h1>
                <p className="text-sm text-gray-500">全 {inquiries.length} 件</p>
            </div>

            <div className="grid gap-6">
                {inquiries.length === 0 ? (
                    <div className="bg-white p-12 text-center rounded-xl border border-dashed border-gray-300">
                        <p className="text-gray-500">まだお問い合わせはありません。</p>
                    </div>
                ) : (
                    inquiries.map((inquiry) => (
                        <div key={inquiry.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 md:p-8 space-y-6">
                                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <h2 className="text-xl font-bold text-gray-900">{inquiry.name} 様</h2>
                                            {inquiry.company && (
                                                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded flex items-center gap-1">
                                                    <Building2 className="w-3 h-3" /> {inquiry.company}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs text-gray-400">受信日: {format(new Date(inquiry.createdAt), 'yyyy/MM/dd HH:mm')}</p>
                                    </div>
                                    <div className="flex flex-wrap gap-4 text-sm">
                                        <div className="flex items-center gap-1.5 text-gray-600">
                                            <Mail className="w-4 h-4 text-spurs-blue" /> {inquiry.email}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-gray-600">
                                            <Phone className="w-4 h-4 text-spurs-blue" /> {inquiry.phone}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-spurs-blue/5 rounded-lg border border-spurs-blue/10">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold text-spurs-blue uppercase flex items-center gap-1">
                                            <Calendar className="w-3 h-3" /> 第1希望日程
                                        </p>
                                        <p className="text-sm font-medium text-gray-800">{inquiry.date1}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase">第2希望日程</p>
                                        <p className="text-sm text-gray-600">{inquiry.date2 || "-"}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase">第3希望日程</p>
                                        <p className="text-sm text-gray-600">{inquiry.date3 || "-"}</p>
                                    </div>
                                </div>

                                {inquiry.content && (
                                    <div className="space-y-2">
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">その他相談内容</p>
                                        <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                                            {inquiry.content}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
