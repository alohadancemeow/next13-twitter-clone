import prisma from "@/libs/prismadb";

const getPostById = async (postId: string) => {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      user: true,
      comments: {
        include: {
          user: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  return post;
};

export default getPostById;
