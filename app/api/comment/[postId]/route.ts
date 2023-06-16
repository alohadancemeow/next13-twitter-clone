import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { postId: string } }
) {
  const { postId } = params;
  const commentBody = await request.json();

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

  return NextResponse.json(comment);
}
