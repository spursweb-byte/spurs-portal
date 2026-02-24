import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
    try {
        const projects = await prisma.project.findMany({ take: 1 });
        console.log('PROJECTS_FOUND:', projects.length);
    } catch (e) {
        console.error('ERROR:', e);
    }
}
main().finally(() => prisma.$disconnect());
