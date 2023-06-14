import prisma from "@/libs/prismadb";

const getPostsByUserId = async (userId: string) =>
  await prisma.post.findMany({
    where: {
      userId,
    },
    include: {
      user: true,
      comments: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

export default getPostsByUserId;
