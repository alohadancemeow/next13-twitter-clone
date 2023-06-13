import prisma from "@/libs/prismadb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

type BodyType = {
  email: string;
  username: string;
  name: string;
  password: string;
};

export async function POST(request: Request) {
  const body: BodyType = await request.json();
  const { email, name, password, username } = body;

  //   TODO: check existing email
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return NextResponse.error();
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      username,
      name,
      hashedPassword,
    },
  });

  return NextResponse.json(user);
}
