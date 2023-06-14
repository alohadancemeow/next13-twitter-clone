import prisma from "@/libs/prismadb";
import { User } from "@prisma/client";
import { NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";

export async function PATCH(request: Request) {
  const currentUser = await getCurrentUser();

  const body: User = await request.json();
  const { name, username, bio, profileImage, coverImage } = body;

  if (!currentUser) {
    return NextResponse.error();
  }

  if (!name || !username) {
    return NextResponse.error();
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: currentUser?.id,
    },
    data: {
      name,
      username,
      bio,
      profileImage,
      coverImage,
    },
  });

  return NextResponse.json(updatedUser);
}
