import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// 注意: 実際の運用には Upstash の環境変数が必要です
// UPSTASH_REDIS_REST_URL
// UPSTASH_REDIS_REST_TOKEN

let ratelimit: Ratelimit | null = null;

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    const redis = new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });

    // 1分間に5回までの制限（お問い合わせ用）
    ratelimit = new Ratelimit({
        redis: redis,
        limiter: Ratelimit.slidingWindow(5, "60 s"),
        analytics: true,
    });
}

export { ratelimit };
