"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { projectSchema } from "@/lib/validations";

export async function createProject(formData: FormData) {
    const session = await auth();
    if (!session) {
        throw new Error("認証に失敗しました");
    }

    const rawData = Object.fromEntries(formData.entries());
    const validatedFields = projectSchema.safeParse(rawData);

    if (!validatedFields.success) {
        throw new Error("入力内容に誤りがあります");
    }

    const data = validatedFields.data;

    await (prisma.project as any).create({
        data: {
            title: data.title,
            description: data.description,
            content: data.content || null,
            requiredSkills: data.requiredSkills || null,
            preferredSkills: data.preferredSkills || null,
            price: data.price || null,
            location: data.location || null,
            workingHours: data.workingHours || null,
            commercialRestriction: data.commercialRestriction || null,
            commercialStream: data.commercialStream || null,
            interviewCount: data.interviewCount || null,
            joiningPeriod: data.joiningPeriod || null,
            priority: data.priority,
            isPublic: data.isPublic,
        },
    });

    revalidatePath("/admin/projects");
    revalidatePath("/projects");
    redirect("/admin/projects");
}

export async function updateProject(id: number, formData: FormData) {
    const session = await auth();
    if (!session) {
        throw new Error("認証に失敗しました");
    }

    const rawData = Object.fromEntries(formData.entries());
    const validatedFields = projectSchema.safeParse(rawData);

    if (!validatedFields.success) {
        throw new Error("入力内容に誤りがあります");
    }

    const data = validatedFields.data;

    await (prisma.project as any).update({
        where: { id },
        data: {
            title: data.title,
            description: data.description,
            content: data.content || null,
            requiredSkills: data.requiredSkills || null,
            preferredSkills: data.preferredSkills || null,
            price: data.price || null,
            location: data.location || null,
            workingHours: data.workingHours || null,
            commercialRestriction: data.commercialRestriction || null,
            commercialStream: data.commercialStream || null,
            interviewCount: data.interviewCount || null,
            joiningPeriod: data.joiningPeriod || null,
            priority: data.priority,
            isPublic: data.isPublic,
        },
    });

    revalidatePath("/admin/projects");
    revalidatePath("/projects");
    revalidatePath(`/projects/${id}`);
    redirect("/admin/projects");
}

export async function deleteProject(id: number) {
    const session = await auth();
    if (!session) {
        throw new Error("認証に失敗しました");
    }

    await prisma.project.delete({
        where: { id },
    });

    revalidatePath("/admin/projects");
    revalidatePath("/projects");
    redirect("/admin/projects");
}
