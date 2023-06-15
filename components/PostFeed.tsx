"use client";

import PostItem from "./PostItem";
import { User } from "@prisma/client";
import { PostWithPorps, UserWithFollowersCount } from "@/types";

type Props = {
  user?: UserWithFollowersCount | null;
  posts?: PostWithPorps[] | null;
  currentUser?: User | null;
};

const PostFeed = ({ user, posts, currentUser }: Props) => {
  return (
    <>
      {posts &&
        posts.map((post) => (
          <PostItem
            userId={user?.id}
            key={post.id}
            data={post}
            currentUser={currentUser}
          />
        ))}
    </>
  );
};

export default PostFeed;
