import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;

  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  if (!userId || typeof userId !== "string") {
    throw new Error("Invalid ID");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("Invalid ID");
  }

  //   TODO: Notification here

  const updatedUser = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      followingIds: {
        push: userId,
      },
    },
  });

  return NextResponse.json(updatedUser);
}

export async function DELETE(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;
  console.log("userID", userId);

  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  if (!userId || typeof userId !== "string") {
    throw new Error("Invalid ID");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("Invalid ID");
  }

  let updatedFollowingIds = [...(user.followingIds || [])];

  const updatedUser = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      followingIds: updatedFollowingIds.filter(
        (followingId) => followingId !== userId
      ),
    },
  });

  return NextResponse.json(updatedUser);
}
