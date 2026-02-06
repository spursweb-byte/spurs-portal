'use client';

import React, { useState } from 'react';
import { submitInquiry } from '@/lib/actions/inquiries';
import { CheckCircle2 } from "lucide-react";

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const result = await submitInquiry(formData);

        if (result.success) {
            setIsSuccess(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            // エラーメッセージの処理を改善
            if (typeof result.error === 'string') {
                setError(result.error);
            } else {
                // バリデーションエラーの場合、最初のエラーを表示
                const firstError = Object.values(result.error || {})[0];
                setError(Array.isArray(firstError) ? firstError[0] : "入力内容に誤りがあります。");
            }
        }
        setIsSubmitting(false);
    }

    if (isSuccess) {
        return (
            <div className="container mx-auto px-6 py-32">
                <div className="max-w-2xl mx-auto text-center space-y-6">
                    <div className="flex justify-center">
                        <CheckCircle2 className="w-20 h-20 text-spurs-green" />
                    </div>
                    <h1 className="text-4xl font-bold text-spurs-blue tracking-tight">送信が完了しました</h1>
                    <p className="text-spurs-gray text-lg">
                        お問い合わせありがとうございます。<br />
                        内容を確認の上、担当者より折り返しご連絡させていただきます。
                    </p>
                    <div className="pt-8">
                        <a href="/" className="inline-block bg-spurs-blue text-white font-bold px-8 py-3 rounded-lg hover:bg-spurs-blue/90 transition-all">
                            トップページに戻る
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 py-20">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold text-spurs-blue mb-4 tracking-tight">お打ち合わせ</h1>
                <p className="text-spurs-gray mb-10">
                    Spurs株式会社ではパートナー企業を募集しております。<br />
                    下記フォームからのお打ち合わせにつきましてはWeb形式を想定しております。
                </p>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm font-bold">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 md:p-10 border border-spurs-blue/5 rounded-2xl shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-spurs-blue">お名前 <span className="text-red-500">*</span></label>
                            <input name="name" type="text" required placeholder="山田 太郎" className="w-full p-3 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-spurs-blue focus:ring-1 focus:ring-spurs-blue transition-all" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-spurs-blue">会社名</label>
                            <input name="company" type="text" placeholder="株式会社〇〇" className="w-full p-3 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-spurs-blue focus:ring-1 focus:ring-spurs-blue transition-all" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-spurs-blue">電話番号 <span className="text-red-500">*</span></label>
                            <input name="phone" type="tel" required placeholder="03-1234-5678" className="w-full p-3 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-spurs-blue focus:ring-1 focus:ring-spurs-blue transition-all" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-spurs-blue">メールアドレス <span className="text-red-500">*</span></label>
                            <input name="email" type="email" required placeholder="example@spurs.com" className="w-full p-3 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-spurs-blue focus:ring-1 focus:ring-spurs-blue transition-all" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-sm font-bold text-spurs-blue block">お打ち合わせ希望日程 <span className="text-red-500">*</span></label>
                        <div className="space-y-3">
                            <div className="flex items-center gap-4">
                                <span className="text-xs font-bold text-gray-400 w-16 shrink-0">第1希望</span>
                                <input name="date1" type="text" required placeholder="例: 1月20日 14:00〜" className="w-full p-3 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-spurs-blue focus:ring-1 focus:ring-spurs-blue transition-all" />
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-xs font-bold text-gray-400 w-16 shrink-0">第2希望</span>
                                <input name="date2" type="text" placeholder="例: 1月21日 10:00〜" className="w-full p-3 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-spurs-blue focus:ring-1 focus:ring-spurs-blue transition-all" />
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-xs font-bold text-gray-400 w-16 shrink-0">第3希望</span>
                                <input name="date3" type="text" placeholder="例: 1月22日 13:00〜" className="w-full p-3 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-spurs-blue focus:ring-1 focus:ring-spurs-blue transition-all" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-spurs-blue">その他（任意）</label>
                        <textarea name="content" placeholder="上記日程以外のご希望や、事前に共有したい内容があればご記入ください..." className="w-full p-3 bg-gray-50 border border-gray-200 rounded h-32 focus:outline-none focus:border-spurs-blue focus:ring-1 focus:ring-spurs-blue transition-all resize-none"></textarea>
                    </div>

                    <button
                        disabled={isSubmitting}
                        className={`w-full bg-spurs-blue text-white font-bold py-4 rounded-lg shadow-lg shadow-spurs-blue/20 transition-all transform ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-spurs-blue/90 hover:-translate-y-0.5'}`}
                    >
                        {isSubmitting ? "送信中..." : "送信する"}
                    </button>
                </form>
            </div>
        </div>
    );
}

