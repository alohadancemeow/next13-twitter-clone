"use client";

import { User } from "@prisma/client";
import { PostWithCommentProps } from "@/types";

import Header from "./Header";
import Form from "./Form";
import PostItem from "./PostItem";
import CommentFeed from "./CommentFeed";

type Props = {
  currentUser?: User | null;
  post?: PostWithCommentProps | null;
};

const Tweet = ({ post, currentUser }: Props) => {
  return (
    <>
      <Header showBackArrow label="Tweet" />
      {post && <PostItem data={post} currentUser={currentUser} />}
      <Form
        currentUser={currentUser}
        postId={post?.id}
        isComment
        placeholder="Tweet your reply"
      />
      <CommentFeed comments={post?.comments} />
    </>
  );
};

export default Tweet;
