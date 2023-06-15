import { Prisma, User } from "@prisma/client";

export type PostWithPorps = Prisma.PostGetPayload<{
  include: { user: true; comments: true };
}>;

export type PostWithCommentProps = Prisma.PostGetPayload<{
  include: {
    user: true;
    comments: {
      include: {
        user: true;
      };
    };
  };
}>;

export type UserWithFollowersCount = User & {
  followersCount: number;
};
