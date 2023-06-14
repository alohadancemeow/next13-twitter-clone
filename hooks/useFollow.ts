import axios from "axios";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import useLoginModal from "./useLoginModal";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";

type Props = {
  userId: string;
  currentUser?: User | null;
};

const useFollow = ({ userId, currentUser }: Props) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const isFollowing = useMemo(() => {
    const list = currentUser?.followingIds || [];

    return list.includes(userId);
  }, [currentUser, userId]);

  const toggleFollow = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;

      if (isFollowing) {
        request = () => axios.delete("/api/follow", { data: { userId } });
      } else {
        request = () => axios.post("/api/follow", { userId });
      }

      await request();
      router.refresh();
      toast.success("Success");
    } catch (error) {
      toast.error("Something went wrong");
    }
  }, [currentUser, isFollowing, userId, loginModal, router]);

  return {
    isFollowing,
    toggleFollow,
  };
};

export default useFollow;
