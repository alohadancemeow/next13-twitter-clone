import prisma from "@/libs/prismadb";
import { UserWithFollowersCount } from "@/types";

const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) return null;

  const followersCount = await prisma.user.count({
    where: {
      followingIds: {
        has: id,
      },
    },
  });

  return { ...user, followersCount } as UserWithFollowersCount;
};

export default getUserById;
