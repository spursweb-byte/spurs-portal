import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    // 古い管理者を削除（存在する場合）
    try {
        await prisma.user.deleteMany({
            where: { email: 'admin@example.com' }
        })
    } catch (e) {
        // 存在しなくても継続
    }

    const hashedPassword = await bcrypt.hash('spr1234', 10)

    const admin = await prisma.user.upsert({
        where: { email: 'support@spurs-inc.com' },
        update: {
            password: hashedPassword,
        },
        create: {
            email: 'support@spurs-inc.com',
            password: hashedPassword,
            name: 'Administrator',
        },
    })

    console.log('Admin account created/updated:', admin.email)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
