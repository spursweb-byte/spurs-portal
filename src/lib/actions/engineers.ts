"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { engineerSchema } from "@/lib/validations";

export async function createEngineer(formData: FormData) {
    const session = await auth();
    if (!session) {
        throw new Error("認証に失敗しました");
    }

    const rawData = Object.fromEntries(formData.entries());
    const validatedFields = engineerSchema.safeParse(rawData);

    if (!validatedFields.success) {
        throw new Error("入力内容に誤りがあります");
    }

    const data = validatedFields.data;

    await (prisma.engineer as any).create({
        data: {
            name: data.name,
            role: data.role,
            summary: data.summary || null,
            skills: data.skills || null,
            price: data.price || null,
            location: data.location || null,
            nearestStation: data.nearestStation || null,
            availability: data.availability || null,
            genderAge: data.genderAge || null,
            affiliation: data.affiliation || null,
            skillSheetUrl: data.skillSheetUrl || null,
            isPublic: data.isPublic,
        },
    });

    revalidatePath("/admin/engineers");
    revalidatePath("/engineers");
    redirect("/admin/engineers");
}

export async function updateEngineer(id: number, formData: FormData) {
    const session = await auth();
    if (!session) {
        throw new Error("認証に失敗しました");
    }

    const rawData = Object.fromEntries(formData.entries());
    const validatedFields = engineerSchema.safeParse(rawData);

    if (!validatedFields.success) {
        throw new Error("入力内容に誤りがあります");
    }

    const data = validatedFields.data;

    await (prisma.engineer as any).update({
        where: { id },
        data: {
            name: data.name,
            role: data.role,
            summary: data.summary || null,
            skills: data.skills || null,
            price: data.price || null,
            location: data.location || null,
            nearestStation: data.nearestStation || null,
            availability: data.availability || null,
            genderAge: data.genderAge || null,
            affiliation: data.affiliation || null,
            skillSheetUrl: data.skillSheetUrl || null,
            isPublic: data.isPublic,
        },
    });

    revalidatePath("/admin/engineers");
    revalidatePath("/engineers");
    revalidatePath(`/engineers/${id}`);
    redirect("/admin/engineers");
}

export async function deleteEngineer(id: number) {
    const session = await auth();
    if (!session) {
        throw new Error("認証に失敗しました");
    }

    await prisma.engineer.delete({
        where: { id },
    });

    revalidatePath("/admin/engineers");
    revalidatePath("/engineers");
    redirect("/admin/engineers");
}
