import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
    try {
        const columns = await prisma.$queryRaw`
            SELECT table_name, column_name, data_type 
            FROM information_schema.columns 
            WHERE table_schema = 'public' 
            AND table_name IN ('Project', 'Engineer', 'User', 'Inquiry')
            ORDER BY table_name, column_name;
        `;
        console.log('COLUMNS:', JSON.stringify(columns, null, 2));
    } catch (e) {
        console.error('ERROR:', e);
    }
}
main().finally(() => prisma.$disconnect());
