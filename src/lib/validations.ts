import { z } from "zod";

export const inquirySchema = z.object({
    name: z.string().min(1, "お名前は必須です").max(100, "お名前が長すぎます"),
    company: z.string().max(100, "会社名が長すぎます").optional().nullable(),
    email: z.string().email("有効なメールアドレスを入力してください"),
    phone: z.string().min(10, "正しい電話番号を入力してください").max(20, "電話番号が長すぎます"),
    date1: z.string().min(1, "第1希望日は必須です"),
    date2: z.string().optional().nullable(),
    date3: z.string().optional().nullable(),
    content: z.string().max(2000, "相談内容は2000文字以内で入力してください").optional().nullable(),
});

export const projectSchema = z.object({
    title: z.string().min(1, "タイトルは必須です").max(200, "タイトルが長すぎます"),
    description: z.string().min(1, "概要は必須です").max(2000, "概要が長すぎます"),
    content: z.string().optional().nullable(),
    requiredSkills: z.string().optional().nullable(),
    preferredSkills: z.string().optional().nullable(),
    price: z.string().optional().nullable(),
    location: z.string().optional().nullable(),
    workingHours: z.string().optional().nullable(),
    commercialRestriction: z.string().optional().nullable(),
    commercialStream: z.string().optional().nullable(),
    interviewCount: z.string().optional().nullable(),
    joiningPeriod: z.string().optional().nullable(),
    priority: z.coerce.number().int().min(1).max(5).default(1),
    isPublic: z.coerce.boolean().default(true),
});

export const engineerSchema = z.object({
    name: z.string().min(1, "名前は必須です").max(100, "名前が長すぎます"),
    role: z.string().min(1, "ロールは必須です").max(100, "ロールが長すぎます"),
    summary: z.string().max(2000, "概要が長すぎます").optional().nullable(),
    skills: z.string().optional().nullable(),
    price: z.string().optional().nullable(),
    location: z.string().optional().nullable(),
    nearestStation: z.string().optional().nullable(),
    availability: z.string().optional().nullable(),
    genderAge: z.string().optional().nullable(),
    affiliation: z.string().optional().nullable(),
    skillSheetUrl: z.string().url("有効なURLを入力してください").or(z.literal("")).optional().nullable(),
    isPublic: z.coerce.boolean().default(true),
});
