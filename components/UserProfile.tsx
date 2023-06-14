"use client";

import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";
import Header from "./Header";
import UserHero from "./UserHero";
import UserBio from "./UserBio";
import PostFeed from "./PostFeed";

type Props = {
  user?: User | null;
  currentUser?: User | null;
};

const UserProfile = ({ user, currentUser }: Props) => {
  return (
    <>
      <Header showBackArrow label={user?.name!} />
      <UserHero user={user} />
      <UserBio user={user} currentUser={currentUser} />
      <PostFeed user={user} />
    </>
  );
};

export default UserProfile;
