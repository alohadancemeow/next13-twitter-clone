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

  //   TODO: Notification here
  try {
    if (post.userId) {
      // create notification
      await prisma.notification.create({
        data: {
          body: "Someone liked your tweet!",
          userId: post.userId,
        },
      });

      // update to user
      await prisma.user.update({
        where: {
          id: post.userId,
        },
        data: {
          hasNotification: true,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }

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
