import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

// # Like
export async function POST(
  request: Request,
  { params }: { params: { postId: string } }
) {
  const { postId } = params;

  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  if (!postId || typeof postId !== "string") {
    throw new Error("Invalid ID");
  }

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!post) {
    throw new Error("Invalid ID");
  }

  //   TODO: Notification here

  const updatedPost = await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      likedIds: {
        push: currentUser.id,
      },
    },
  });

  return NextResponse.json(updatedPost);
}

// Unlike
export async function DELETE(
  request: Request,
  { params }: { params: { postId: string } }
) {
  const { postId } = params;

  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  if (!postId || typeof postId !== "string") {
    throw new Error("Invalid ID");
  }

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!post) {
    throw new Error("Invalid ID");
  }

  let updatedLikedIds = [...(post.likedIds || [])];

  const updatedPost = await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      likedIds: updatedLikedIds.filter((userId) => userId !== currentUser.id),
    },
  });

  return NextResponse.json(updatedPost);
}
