import ProjectForm from "@/components/admin/ProjectForm";

export default function NewProjectPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">新規案件登録</h1>
            <ProjectForm />
        </div>
    );
}
