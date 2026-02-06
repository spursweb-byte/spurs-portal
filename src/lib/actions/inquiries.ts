"use server";

import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";
import { revalidatePath } from "next/cache";
import { inquirySchema } from "@/lib/validations";
import { ratelimit } from "@/lib/ratelimit";
import { headers } from "next/headers";

export async function submitInquiry(formData: FormData) {
    // 1. Rate Limiting (Spam protection)
    if (ratelimit) {
        const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
        const { success } = await ratelimit.limit(ip);
        if (!success) {
            return { success: false, error: "送信制限がかかっています。しばらく時間をおいてから再度お試しください。" };
        }
    }

    const rawData = Object.fromEntries(formData.entries());
    const validatedFields = inquirySchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            success: false,
            error: validatedFields.error.flatten().fieldErrors
        };
    }

    const { name, company, email, phone, date1, date2, date3, content } = validatedFields.data;

    try {
        // 1. Save to Database
        const inquiry = await prisma.inquiry.create({
            data: {
                name,
                company: company || null,
                email,
                phone,
                date1,
                date2: date2 || null,
                date3: date3 || null,
                content: content || null,
            },
        });

        // 2. Send Email
        // 注意: 実際の運用には SMTP サーバー（Gmail, SendGrid, Resend等）の設定が必要です。
        // ここでは、設定がある場合のみ送信を試みるようにします。
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || "localhost",
            port: parseInt(process.env.SMTP_PORT || "587"),
            auth: process.env.SMTP_USER ? {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            } : undefined,
        });

        const mailOptions = {
            from: process.env.SMTP_FROM || "no-reply@spurs-inc.com",
            to: "support@spurs-inc.com", // 管理者メールアドレス
            subject: `【お問い合わせ】${name}様よりお打ち合わせの依頼`,
            text: `
Spurs株式会社 お問い合わせ管理システム

新しいお打ち合わせの依頼が届きました。

■お客様情報
お名前: ${name}
会社名: ${company || "未記入"}
メールアドレス: ${email}
電話番号: ${phone}

■希望日程
第1希望: ${date1}
第2希望: ${date2 || "未記入"}
第3希望: ${date3 || "未記入"}

■その他
${content || "未記入"}

---
このお問い合わせはデータベースにも保存されています。
管理画面から詳細を確認できます。
            `,
        };

        // 設定がある場合のみ実際に送信（エラーはキャッチしてDB保存を優先）
        if (process.env.SMTP_USER && process.env.SMTP_PASS) {
            await transporter.sendMail(mailOptions);
        }

        revalidatePath("/admin/inquiries");
        return { success: true };
    } catch (error) {
        console.error("Inquiry submission error:", error);
        return { success: false, error: "送信中にエラーが発生しました。" };
    }
}
