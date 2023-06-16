import prisma from "@/libs/prismadb";

const getNoitfications = async (userId: string) => {
  if (!userId || typeof userId !== "string") {
    throw new Error("Invalid ID");
  }

  try {
    // get user notifications
    const notifications = await prisma.notification.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // update user
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hasNotification: false,
      },
    });

    return notifications;
  } catch (error) {
    console.log(error);
  }
};

export default getNoitfications;
