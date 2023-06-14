import prisma from "@/libs/prismadb";

const getUserById = async (id: string) =>
  await prisma.user.findUnique({
    where: { id },
  });

export default getUserById;
