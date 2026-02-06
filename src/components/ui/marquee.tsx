'use client';

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

interface MarqueeProps {
    children: React.ReactNode;
    direction?: "left" | "right";
    speed?: number;
    className?: string;
    pauseOnHover?: boolean;
}

export function Marquee({
    children,
    direction = "left",
    speed = 30, // seconds for one full loop
    className,
    pauseOnHover = false,
}: MarqueeProps) {
    return (
        <div
            className={cn("flex w-full overflow-hidden whitespace-nowrap select-none", className)}
        >
            <motion.div
                className="flex min-w-full shrink-0 items-center justify-around gap-8 py-2"
                initial={{ x: direction === "left" ? "0%" : "-100%" }}
                animate={{ x: direction === "left" ? "-100%" : "0%" }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: speed,
                }}
                whileHover={pauseOnHover ? { animationPlayState: "paused" } : undefined}
            >
                {children}
            </motion.div>
            <motion.div
                className="flex min-w-full shrink-0 items-center justify-around gap-8 py-2"
                initial={{ x: direction === "left" ? "0%" : "-100%" }}
                animate={{ x: direction === "left" ? "-100%" : "0%" }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: speed,
                }}
                whileHover={pauseOnHover ? { animationPlayState: "paused" } : undefined}
            >
                {children}
            </motion.div>
        </div>
    );
}
