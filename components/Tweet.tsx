"use client";

import { User } from "@prisma/client";
import { PostWithCommentProps, PostWithPorps } from "@/types";

import Header from "./Header";
import Form from "./Form";
import PostItem from "./PostItem";

type Props = {
  currentUser?: User | null;
  post?: PostWithPorps | PostWithCommentProps | null;
};

const Tweet = ({ post, currentUser }: Props) => {
  return (
    <>
      <Header showBackArrow label="Tweet" />
      {post && <PostItem data={post} />}
      <Form
        currentUser={currentUser}
        postId={post?.id}
        isComment
        placeholder="Tweet your reply"
      />
      {/* <CommentFeed comments={fetchedPost?.comments} /> */}
    </>
  );
};

export default Tweet;
