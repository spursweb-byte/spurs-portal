"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function updateAdminProfile(formData: FormData) {
    const session = await auth();
    if (!session?.user?.email) {
        throw new Error("認証に失敗しました");
    }

    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    const password = formData.get("password") as string;

    const updateData: any = {
        email,
        name,
    };

    // パスワードが入力されている場合のみ更新
    if (password && password.trim() !== "") {
        updateData.password = await bcrypt.hash(password, 10);
    }

    await prisma.user.update({
        where: { email: session.user.email },
        data: updateData,
    });

    revalidatePath("/admin/settings");
    return { success: true };
}
