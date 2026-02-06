import { auth } from "@/auth";
import SettingsForm from "@/components/admin/SettingsForm";

export default async function SettingsPage() {
    const session = await auth();

    return (
        <div className="max-w-2xl">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">管理者設定</h1>
            <SettingsForm session={session} />

            <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-100">
                <h3 className="text-blue-800 font-bold mb-2 text-sm">セキュリティ上の注意</h3>
                <p className="text-blue-700 text-xs leading-relaxed">
                    メールアドレスを変更した場合、次回から新しいメールアドレスでのログインが必要になります。
                    パスワードは強力なもの（8文字以上、英数字の組み合わせ等）を設定することを推奨します。
                </p>
            </div>
        </div>
    );
}
