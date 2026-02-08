"use client";

import { Engineer } from "@prisma/client";
import { createEngineer, updateEngineer, deleteEngineer } from "@/lib/actions/engineers";
import { useState } from "react";

interface EngineerFormProps {
    engineer?: Engineer;
}

export default function EngineerForm({ engineer }: EngineerFormProps) {
    const [loading, setLoading] = useState(false);

    const action = engineer
        ? updateEngineer.bind(null, engineer.id)
        : createEngineer;

    const handleDelete = async () => {
        if (!engineer) return;
        if (!confirm("本当に削除しますか？")) return;

        setLoading(true);
        await deleteEngineer(engineer.id);
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-4xl">
            <form action={action} onSubmit={() => setLoading(true)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">表示名 / イニシャル</label>
                        <input
                            name="name"
                            defaultValue={engineer?.name}
                            required
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-spurs-blue focus:outline-none"
                            placeholder="例: Engineer A"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">役割 / タイトル</label>
                        <input
                            name="role"
                            defaultValue={engineer?.role}
                            required
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-spurs-blue focus:outline-none"
                            placeholder="例: Full Stack Developer"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">単価目安 (万円/月)</label>
                        <input
                            name="price"
                            defaultValue={engineer?.price || ""}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-spurs-blue focus:outline-none"
                            placeholder="例: 90〜110"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">最寄り駅</label>
                        <input
                            name="nearestStation"
                            defaultValue={engineer?.nearestStation || ""}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-spurs-blue focus:outline-none"
                            placeholder="例: 新宿駅"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">稼働開始日</label>
                        <input
                            name="availability"
                            defaultValue={engineer?.availability || ""}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-spurs-blue focus:outline-none"
                            placeholder="例: 即日可能"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">希望勤務形態</label>
                        <input
                            name="location"
                            defaultValue={engineer?.location || ""}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-spurs-blue focus:outline-none"
                            placeholder="例: 原則リモート"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">性別・年齢</label>
                        <input
                            name="genderAge"
                            defaultValue={(engineer as any)?.genderAge || ""}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-spurs-blue focus:outline-none"
                            placeholder="例: 男性 / 30代, 女性 / 20代"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">所属</label>
                        <input
                            name="affiliation"
                            defaultValue={engineer?.affiliation || ""}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-spurs-blue focus:outline-none"
                            placeholder="例: 株式会社Spurs"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">スキルシートURL</label>
                        <input
                            name="skillSheetUrl"
                            defaultValue={(engineer as any)?.skillSheetUrl || ""}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-spurs-blue focus:outline-none"
                            placeholder="例: https://example.com/sheet.pdf"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">公開設定</label>
                        <select
                            name="isPublic"
                            defaultValue={engineer?.isPublic ? "true" : "false"}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-spurs-blue focus:outline-none"
                        >
                            <option value="true">公開</option>
                            <option value="false">非公開（下書き）</option>
                        </select>
                    </div>

                    <div className="col-span-2">
                        <label className="block text-sm font-bold text-gray-700 mb-2">プロフィール概要</label>
                        <textarea
                            name="summary"
                            defaultValue={engineer?.summary || ""}
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-spurs-blue focus:outline-none"
                            placeholder="経歴の要約などを入力してください"
                        />
                    </div>

                    <div className="col-span-2">
                        <label className="block text-sm font-bold text-gray-700 mb-2">保有スキル (カンマ区切り)</label>
                        <textarea
                            name="skills"
                            defaultValue={engineer?.skills || ""}
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-spurs-blue focus:outline-none"
                            placeholder="Java, Go, React, AWS..."
                        />
                    </div>
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                    {engineer && (
                        <button
                            type="button"
                            onClick={handleDelete}
                            disabled={loading}
                            className="text-red-500 font-bold hover:text-red-700 transition-colors"
                        >
                            この要員を削除
                        </button>
                    )}
                    <div className="flex gap-4 ml-auto">
                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            className="px-6 py-2 border border-gray-200 rounded-lg text-gray-600 font-bold hover:bg-gray-50 transition-colors"
                        >
                            キャンセル
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-8 py-2 bg-spurs-blue text-white font-bold rounded-lg hover:bg-blue-900 transition-shadow shadow-lg disabled:opacity-50"
                        >
                            {loading ? "保存中..." : engineer ? "更新する" : "登録する"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
