import { prisma } from "@/lib/prisma";
import HomeContent from "@/components/home/HomeContent";

export const dynamic = "force-dynamic";

export default async function Home() {
  const activeProjectsCount = await prisma.project.count({
    where: { isPublic: true }
  });

  const activeEngineersCount = await prisma.engineer.count({
    where: { isPublic: true }
  });

  return <HomeContent activeProjectsCount={activeProjectsCount} activeEngineersCount={activeEngineersCount} />;
}
