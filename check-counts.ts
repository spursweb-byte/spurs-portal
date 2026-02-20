import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
    const projects = await prisma.project.count({ where: { isPublic: true } });
    const engineers = await prisma.engineer.count({ where: { isPublic: true } });
    console.log('ACTIVE_PROJECTS_COUNT:', projects);
    console.log('ACTIVE_ENGINEERS_COUNT:', engineers);
}
main().catch(console.error).finally(() => prisma.$disconnect());
