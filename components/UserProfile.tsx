"use client";

import { User } from "@prisma/client";
import React from "react";
import Header from "./Header";
import UserHero from "./UserHero";
import UserBio from "./UserBio";
import PostFeed from "./PostFeed";
import { UserWithFollowersCount } from "@/types";

type Props = {
  user?: UserWithFollowersCount | null;
  currentUser?: User | null;
};

const UserProfile = ({ user, currentUser }: Props) => {
  return (
    <>
      <Header showBackArrow label={user?.name!} />
      <UserHero user={user} />
      <UserBio user={user} currentUser={currentUser} />
      <PostFeed user={user} currentUser={currentUser} />
    </>
  );
};

export default UserProfile;
