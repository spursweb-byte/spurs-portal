import EngineerForm from "@/components/admin/EngineerForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditEngineerPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const engineer = await prisma.engineer.findUnique({
        where: { id: parseInt(id) },
    });

    if (!engineer) {
        notFound();
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">要員の編集</h1>
            <EngineerForm engineer={engineer} />
        </div>
    );
}
