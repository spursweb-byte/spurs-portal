import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
    try {
        const result = await prisma.$queryRaw`
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = 'Project' AND column_name = 'isPublic';
        `;
        console.log('HAS_IS_PUBLIC:', result);
    } catch (e) {
        console.error('ERROR:', e);
    }
}
main().finally(() => prisma.$disconnect());
