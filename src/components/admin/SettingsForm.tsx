"use client";

import { useState } from "react";
import { updateAdminProfile } from "@/lib/actions/admin";
import { Session } from "next-auth";

interface SettingsFormProps {
    session: Session | null;
}

export default function SettingsForm({ session }: SettingsFormProps) {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: "", text: "" });

        const formData = new FormData(e.currentTarget);
        try {
            const result = await updateAdminProfile(formData);
            if (result.success) {
                setMessage({ type: "success", text: "プロフィールを更新しました。新しい設定は次回ログイン時から反映されます。" });
            }
        } catch (error) {
            setMessage({ type: "error", text: "更新に失敗しました。メールアドレスが既に使用されている可能性があります。" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">管理者名</label>
                    <input
                        name="name"
                        defaultValue={session?.user?.name || ""}
                        required
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-spurs-blue focus:outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">メールアドレス</label>
                    <input
                        name="email"
                        type="email"
                        defaultValue={session?.user?.email || ""}
                        required
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-spurs-blue focus:outline-none"
                    />
                    <p className="mt-1 text-xs text-gray-400">ログインに使用するメールアドレスです。</p>
                </div>

                <div className="pt-4 border-t border-gray-50">
                    <label className="block text-sm font-bold text-gray-700 mb-2">新しいパスワード</label>
                    <input
                        name="password"
                        type="password"
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-spurs-blue focus:outline-none"
                        placeholder="変更する場合のみ入力"
                    />
                    <p className="mt-1 text-xs text-gray-400">現在のパスワードを維持する場合は空欄のままにしてください。</p>
                </div>

                {message.text && (
                    <div className={`p-4 rounded-lg text-sm font-medium ${message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                        }`}>
                        {message.text}
                    </div>
                )}

                <div className="pt-4 flex gap-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-8 py-3 bg-spurs-blue text-white font-bold rounded-lg hover:bg-blue-900 transition-all shadow-lg shadow-spurs-blue/20 disabled:opacity-50"
                    >
                        {loading ? "更新中..." : "設定を保存する"}
                    </button>
                </div>
            </form>
        </div>
    );
}
