import { prisma } from "@/lib/prisma";
import HomeContent from "@/components/home/HomeContent";

export default async function Home() {
  const activeProjectsCount = await prisma.project.count({
    where: { isPublic: true }
  });

  return <HomeContent activeProjectsCount={activeProjectsCount} />;
}
