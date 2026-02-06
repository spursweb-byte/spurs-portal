import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";

export default async function AdminProjectsPage() {
    const projects = await prisma.project.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">案件管理</h1>
                <Link
                    href="/admin/projects/new"
                    className="bg-spurs-lime text-spurs-blue font-bold px-6 py-2 rounded-lg hover:bg-lime-400 transition-colors shadow-lg shadow-spurs-lime/20"
                >
                    + 新規案件登録
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">案件名</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">公開状態</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">登録日</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">操作</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {projects.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-10 text-center text-gray-500">
                                    案件が登録されていません。
                                </td>
                            </tr>
                        ) : (
                            projects.map((project) => (
                                <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-gray-900">{project.title}</div>
                                        <div className="text-xs text-gray-500 truncate max-w-xs">{project.location} / {project.price}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {project.isPublic ? (
                                            <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full">公開中</span>
                                        ) : (
                                            <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded-full">下書き</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {format(project.createdAt, "yyyy/MM/dd")}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link
                                            href={`/admin/projects/${project.id}`}
                                            className="text-spurs-blue hover:text-blue-900 font-bold text-sm px-4 py-2"
                                        >
                                            編集
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
