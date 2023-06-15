"use client";

import { User } from "@prisma/client";
import React, { useMemo } from "react";
import Button from "./Button";

import { BiCalendar } from "react-icons/bi";
import { format } from "date-fns";
import useFollow from "@/hooks/useFollow";
import useEditModal from "@/hooks/useEditModal";
import { UserWithFollowersCount } from "@/types";

type Props = {
  user?: UserWithFollowersCount | null;
  currentUser?: User | null;
};

const UserBio = ({ user, currentUser }: Props) => {
  const editModal = useEditModal();

  const { isFollowing, toggleFollow } = useFollow({
    userId: user?.id!,
    currentUser,
  });

  const createdAt = useMemo(() => {
    if (!user?.createdAt) {
      return null;
    }

    return format(new Date(user.createdAt), "MMMM yyyy");
  }, [user?.createdAt]);

  return (
    <div className="border-b-[1px] border-neutral-800 pb-4">
      <div className="flex justify-end p-2">
        {currentUser?.id === user?.id ? (
          <Button secondary label="Edit" onClick={editModal.onOpen} />
        ) : (
          <Button
            onClick={toggleFollow}
            label={isFollowing ? "Unfollow" : "Follow"}
            secondary={!isFollowing}
            outline={isFollowing}
          />
        )}
      </div>
      <div className="px-4 mt-8">
        <div className="flex flex-col">
          <p className="text-2xl font-semibold text-white">{user?.name}</p>
          <p className="text-md text-neutral-500">@{user?.username}</p>
        </div>
        <div className="flex flex-col mt-4">
          <p className="text-white">{user?.bio}</p>
          <div className="flex flex-row items-center gap-2 mt-4 text-neutral-500">
            <BiCalendar size={24} />
            <p>Joined {createdAt}</p>
          </div>
        </div>
        <div className="flex flex-row items-center gap-6 mt-4">
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{user?.followingIds?.length}</p>
            <p className="text-neutral-500">Following</p>
          </div>
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{user?.followersCount || 0}</p>
            <p className="text-neutral-500">Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBio;
