import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { Comment } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { postId: string } }
) {
  const { postId } = params;
  const commentBody: Comment = await request.json();

  const { body } = commentBody;

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

  if (!commentBody) return null;

  const comment = await prisma.comment.create({
    data: {
      body,
      userId: currentUser.id,
      postId,
    },
  });

  //   TODO: Notification here

  try {
    if (post?.userId) {
      await prisma.notification.create({
        data: {
          body: "Someone replied on your tweet!",
          userId: post.userId,
        },
      });

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

  return NextResponse.json(comment);
}
