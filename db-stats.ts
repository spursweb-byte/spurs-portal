import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
    const users = await prisma.user.count();
    const projects = await prisma.project.count();
    const engineers = await prisma.engineer.count();
    const inquiries = await prisma.inquiry.count();
    console.log('STATS:', { users, projects, engineers, inquiries });
}
main().catch(console.error).finally(() => prisma.$disconnect());
