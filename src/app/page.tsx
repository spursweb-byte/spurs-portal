import { prisma } from "@/lib/prisma";
import HomeContent from "@/components/home/HomeContent";

export const dynamic = "force-dynamic";

export default async function Home() {
  try {
    const activeProjectsCount = await prisma.project.count();
    const activeEngineersCount = await prisma.engineer.count();

    return <HomeContent activeProjectsCount={activeProjectsCount} activeEngineersCount={activeEngineersCount} />;
  } catch (error) {
    console.error("Database connection error:", error);
    // Fallback UI to prevent app crash
    return <HomeContent activeProjectsCount={0} activeEngineersCount={0} />;
  }
}
