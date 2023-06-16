"use client";

import CommentItem from "./CommentItem";
import { CommemtWtihUser } from "@/types";

type Props = {
  comments?: CommemtWtihUser[] | null;
};

const CommentFeed = ({ comments }: Props) => {
  return (
    <>
      {comments?.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </>
  );
};

export default CommentFeed;
