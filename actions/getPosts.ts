import prisma from "@/libs/prismadb";

const getPosts = async () =>
  await prisma.post.findMany({
    include: {
      user: true,
      comments: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

export default getPosts;
