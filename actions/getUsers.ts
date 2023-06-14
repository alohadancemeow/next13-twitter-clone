import prisma from "@/libs/prismadb";

const getUsers = async () => await prisma.user.findMany({});

export default getUsers;
