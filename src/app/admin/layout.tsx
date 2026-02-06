import Link from "next/link";
import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session) {
        redirect("/login");
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-spurs-blue text-white flex-shrink-0">
                <div className="p-6">
                    <Link href="/admin" className="flex items-center gap-4 group">
                        <img src="/logo.png" alt="SPURS" className="h-10 w-auto brightness-0 invert" />
                        <span className="text-xl font-bold tracking-tighter">ADMIN</span>
                    </Link>
                </div>
                <nav className="mt-6 flex-1 px-4 space-y-2">
                    <Link
                        href="/admin/projects"
                        className="block py-2.5 px-4 rounded transition duration-200 hover:bg-white/10"
                    >
                        案件管理
                    </Link>
                    <Link
                        href="/admin/engineers"
                        className="block py-2.5 px-4 rounded transition duration-200 hover:bg-white/10"
                    >
                        要員管理
                    </Link>
                    <Link
                        href="/admin/inquiries"
                        className="block py-2.5 px-4 rounded transition duration-200 hover:bg-white/10"
                    >
                        お問い合わせ管理
                    </Link>
                    <Link
                        href="/admin/settings"
                        className="block py-2.5 px-4 rounded transition duration-200 hover:bg-white/10"
                    >
                        設定
                    </Link>
                    <div className="pt-10 border-t border-white/10 mt-10">
                        <form
                            action={async () => {
                                "use server";
                                await signOut({ redirectTo: "/" });
                            }}
                        >
                            <button className="w-full text-left py-2.5 px-4 rounded transition duration-200 hover:bg-red-500/20 text-red-200 italic">
                                ログアウト
                            </button>
                        </form>
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-12 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
