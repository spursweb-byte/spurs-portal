import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
    const allProjects = await prisma.project.findMany();
    console.log('TOTAL_PROJECTS:', allProjects.length);
    console.log('PROJECTS_DATA:', JSON.stringify(allProjects, null, 2));
}
main().catch(console.error).finally(() => prisma.$disconnect());
