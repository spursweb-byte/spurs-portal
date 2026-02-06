import ProjectForm from "@/components/admin/ProjectForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditProjectPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const project = await prisma.project.findUnique({
        where: { id: parseInt(id) },
    });

    if (!project) {
        notFound();
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">案件の編集</h1>
            <ProjectForm project={project} />
        </div>
    );
}
