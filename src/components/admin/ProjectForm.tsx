"use client";

import { Project } from "@prisma/client";
import { createProject, updateProject, deleteProject } from "@/lib/actions/projects";
import { useState } from "react";

interface ProjectFormProps {
    project?: Project;
}

export default function ProjectForm({ project }: ProjectFormProps) {
    const [loading, setLoading] = useState(false);

    const action = project
        ? updateProject.bind(null, project.id)
        : createProject;

    const handleDelete = async () => {
        if (!project) return;
        if (!confirm("本当に削除しますか？")) return;

        setLoading(true);
        await deleteProject(project.id);
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-4xl">
            <form action={action} onSubmit={() => setLoading(true)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-span-2">
                        <label className="block text-sm font-bold text-gray-700 mb-2">案件名</label>
                        <input
                            name="title"
                            defaultValue={project?.title}
                            required
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-spurs-blue focus:outline-none"
                            placeholder="例: ガイドワイヤーパッケージ導入支援"
                        />
                    </div>

                    <div className="col-span-2">
                        <label className="block text-sm font-bold text-gray-700 mb-2">一言説明</label>
                        <input
                            name="description"
                            defaultValue={project?.description}
                            required
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-spurs-blue focus:outline-none"
                            placeholder="例: 金融系パッケージ導入における上流工程支援"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">単価</label>
                        <input
                            name="price"
                            defaultValue={project?.price || ""}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-spurs-blue focus:outline-none"
                            placeholder="例: 100〜120万円"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">場所</label>
                        <input
                            name="location"
                            defaultValue={project?.location || ""}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-spurs-blue focus:outline-none"
                            placeholder="例: 東京都内 (リモート可)"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">商流制限</label>
                        <input
                            name="commercialRestriction"
                            defaultValue={(project as any)?.commercialRestriction || ""}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-spurs-blue focus:outline-none"
                            placeholder="例: 1社先まで, 制限なし"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">商流</label>
                        <input
                            name="commercialStream"
                            defaultValue={(project as any)?.commercialStream || ""}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-spurs-blue focus:outline-none"
                            placeholder="例: エンド直, 元請け直"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">精算幅</label>
                        <input
                            name="workingHours"
                            defaultValue={project?.workingHours || ""}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-spurs-blue focus:outline-none"
                            placeholder="例: 140h-180h"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">面談回数</label>
                        <input
                            name="interviewCount"
                            defaultValue={project?.interviewCount || ""}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-spurs-blue focus:outline-none"
                            placeholder="例: 1回"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">参画時期</label>
                        <input
                            name="joiningPeriod"
                            defaultValue={(project as any)?.joiningPeriod || ""}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-spurs-blue focus:outline-none"
                            placeholder="例: 即日〜, 2月〜"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">公開設定</label>
                        <select
                            name="isPublic"
                            defaultValue={project?.isPublic ? "true" : "false"}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-spurs-blue focus:outline-none"
                        >
                            <option value="true">公開</option>
                            <option value="false">非公開（下書き）</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">注力度 (星1〜5)</label>
                        <select
                            name="priority"
                            defaultValue={(project as any)?.priority || 1}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-spurs-blue focus:outline-none"
                        >
                            <option value="1">⭐ (1)</option>
                            <option value="2">⭐⭐ (2)</option>
                            <option value="3">⭐⭐⭐ (3)</option>
                            <option value="4">⭐⭐⭐⭐ (4)</option>
                            <option value="5">⭐⭐⭐⭐⭐ (5)</option>
                        </select>
                    </div>

                    <div className="col-span-2">
                        <label className="block text-sm font-bold text-gray-700 mb-2">必須スキル (カンマ区切り)</label>
                        <textarea
                            name="requiredSkills"
                            defaultValue={project?.requiredSkills || ""}
                            rows={2}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-spurs-blue focus:outline-none"
                            placeholder="Java, Spring Boot, AWS"
                        />
                    </div>

                    <div className="col-span-2">
                        <label className="block text-sm font-bold text-gray-700 mb-2">歓迎スキル (カンマ区切り)</label>
                        <textarea
                            name="preferredSkills"
                            defaultValue={project?.preferredSkills || ""}
                            rows={2}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-spurs-blue focus:outline-none"
                            placeholder="Go, TypeScript, Kubernetes"
                        />
                    </div>

                    <div className="col-span-2">
                        <label className="block text-sm font-bold text-gray-700 mb-2">詳細内容 (Markdown可)</label>
                        <textarea
                            name="content"
                            defaultValue={project?.content || ""}
                            rows={10}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-spurs-blue focus:outline-none font-mono text-sm"
                            placeholder="案件の詳細な業務内容などを入力してください"
                        />
                    </div>
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                    {project && (
                        <button
                            type="button"
                            onClick={handleDelete}
                            disabled={loading}
                            className="text-red-500 font-bold hover:text-red-700 transition-colors"
                        >
                            この案件を削除
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
                            {loading ? "保存中..." : project ? "更新する" : "登録する"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
