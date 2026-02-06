import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
    const projectCount = await prisma.project.count();
    const engineerCount = await prisma.engineer.count();

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">ダッシュボード</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">登録案件数</p>
                    <p className="text-4xl font-bold text-spurs-blue">{projectCount}<span className="text-lg font-normal ml-2">件</span></p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">登録要員数</p>
                    <p className="text-4xl font-bold text-spurs-blue">{engineerCount}<span className="text-lg font-normal ml-2">名</span></p>
                </div>
            </div>

            <div className="mt-12 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-4">管理者ツールへようこそ</h2>
                <p className="text-gray-600 leading-relaxed">
                    左側のメニューから案件情報や要員情報の追加・編集・削除が行えます。
                    変更内容は即座に公開サイトへ反映されます。
                </p>
            </div>
        </div>
    );
}
