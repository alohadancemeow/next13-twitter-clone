import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { Post } from "@prisma/client";
import { NextResponse } from "next/server";

// # Create post
export async function POST(requset: Request) {
  const currentUser = await getCurrentUser();

  const body: Post = await requset.json();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { body: postBody } = body;

  const post = await prisma.post.create({
    data: {
      body: postBody,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(post);
}

// // # Get post
// export async function GET(requset: Request) {
//   const currentUser = await getCurrentUser();

//   if (!currentUser) {
//     return NextResponse.error();
//   }

//   try {
//     let posts;

//     if (currentUser.id && typeof currentUser.id === "string") {
//       posts = await prisma.post.findMany({
//         where: {
//           userId: currentUser.id,
//         },
//         include: {
//           user: true,
//           comments: true,
//         },
//         orderBy: {
//           createdAt: "desc",
//         },
//       });
//     } else {
//       posts = await prisma.post.findMany({
//         include: {
//           user: true,
//           comments: true,
//         },
//         orderBy: {
//           createdAt: "desc",
//         },
//       });
//     }

//     return NextResponse.json(posts);
//   } catch (error) {
//     console.log(error);

//     return NextResponse.error();
//   }
// }
