"use client";

import { User } from "@prisma/client";

type Props = {
  user?: User | null;
};

const PostFeed = ({ user }: Props) => {
  return <div>PostFeed</div>;
};

export default PostFeed;
