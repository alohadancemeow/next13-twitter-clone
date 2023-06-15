"use client";

import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import { formatDistanceToNowStrict } from "date-fns";

import useLoginModal from "@/hooks/useLoginModal";
import useLike from "@/hooks/useLike";

import Avatar from "./Avatar";
import { User } from "@prisma/client";
import { PostWithCommentProps, PostWithPorps } from "@/types";

interface Props {
  currentUser?: User | null;
}

interface PostItemProps extends Props {
  data: PostWithPorps | PostWithCommentProps;
  userId?: string;
}

const PostItem: React.FC<PostItemProps> = ({ data, currentUser }) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const { hasLiked, toggleLike } = useLike({ post: data, currentUser });

  const goToUser = useCallback(
    (ev: any) => {
      ev.stopPropagation();
      router.push(`/users/${data.userId}`);
    },
    [router, data.userId]
  );

  const goToPost = useCallback(() => {
    router.push(`/posts/${data.id}`);
  }, [router, data.id]);

  const onLike = useCallback(
    async (ev: any) => {
      ev.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      toggleLike();
    },
    [loginModal, currentUser, toggleLike]
  );

  const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart;

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data.createdAt]);

  return (
    <div
      onClick={goToPost}
      className="
        border-b-[1px] 
        border-neutral-800 
        p-5 
        cursor-pointer 
        hover:bg-neutral-900 
        transition
      "
    >
      <div className="flex flex-row items-start gap-3">
        <Avatar user={data.user} />
        <div>
          <div className="flex flex-row items-center gap-2">
            <p
              onClick={goToUser}
              className="font-semibold text-white cursor-pointer hover:underline"
            >
              {data.user.name}
            </p>
            <span
              onClick={goToUser}
              className="hidden cursor-pointer text-neutral-500 hover:underline md:block"
            >
              @{data.user.username}
            </span>
            <span className="text-sm text-neutral-500">{createdAt}</span>
          </div>
          <div className="mt-1 text-white">{data.body}</div>
          <div className="flex flex-row items-center gap-10 mt-3">
            <div className="flex flex-row items-center gap-2 transition cursor-pointer text-neutral-500 hover:text-sky-500">
              <AiOutlineMessage size={20} />
              <p>{data.comments?.length || 0}</p>
            </div>
            <div
              onClick={onLike}
              className="flex flex-row items-center gap-2 transition cursor-pointer text-neutral-500 hover:text-red-500"
            >
              <LikeIcon color={hasLiked ? "red" : ""} size={20} />
              <p>{data.likedIds.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
