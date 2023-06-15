import axios from "axios";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import useLoginModal from "./useLoginModal";

import { Post, User } from "@prisma/client";
import { useRouter } from "next/navigation";

type Props = {
  post: Post;
  currentUser?: User | null;
};

const useLike = ({ post, currentUser }: Props) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasLiked = useMemo(() => {
    const list = post?.likedIds || [];

    return list.includes(currentUser?.id!);
  }, [post, currentUser]);

  const toggleLike = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;

      if (hasLiked) {
        request = () => axios.delete(`/api/posts/${post.id}`);
      } else {
        request = () => axios.post(`/api/posts/${post.id}`);
      }

      await request();

      router.refresh();
      toast.success("Success");
    } catch (error) {
      toast.error("Something went wrong");
    }
  }, [currentUser, hasLiked, post.id, loginModal]);

  return {
    hasLiked,
    toggleLike,
  };
};

export default useLike;
