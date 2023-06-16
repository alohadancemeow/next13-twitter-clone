"use client";

import React, { useCallback, useMemo } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/navigation";
import { CommemtWtihUser } from "@/types";
import Avatar from "./Avatar";

type Props = {
  comment?: CommemtWtihUser | null;
};

const CommentItem = ({ comment }: Props) => {
  const router = useRouter();

  const goToUser = useCallback(
    (ev: any) => {
      ev.stopPropagation();

      router.push(`/users/${comment?.user.id}`);
    },
    [router, comment?.user.id]
  );

  const createdAt = useMemo(() => {
    if (!comment?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(comment.createdAt));
  }, [comment?.createdAt]);

  return (
    <div className="border-b-[1px]  border-neutral-800 p-5  cursor-pointer  hover:bg-neutral-900 transition ">
      <div className="flex flex-row items-start gap-3">
        <Avatar user={comment?.user} />
        <div>
          <div className="flex flex-row items-center gap-2">
            <p
              onClick={goToUser}
              className="font-semibold text-white cursor-pointer hover:underline"
            >
              {comment?.user.name}
            </p>
            <span
              onClick={goToUser}
              className="hidden cursor-pointer text-neutral-500 hover:underline md:block"
            >
              @{comment?.user.username}
            </span>
            <span className="text-sm text-neutral-500">{createdAt}</span>
          </div>
          <div className="mt-1 text-white">{comment?.body}</div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
