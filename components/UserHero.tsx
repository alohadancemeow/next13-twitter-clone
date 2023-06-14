"use client";

import { User } from "@prisma/client";
import Image from "next/image";
import Avatar from "./Avatar";

type Props = {
  user?: User | null;
};

const UserHero = ({ user }: Props) => {
  return (
    <div>
      <div className="relative bg-neutral-700 h-44">
        {user?.coverImage && (
          <Image
            src={user.coverImage}
            fill
            alt="Cover Image"
            style={{ objectFit: "cover" }}
          />
        )}
        <div className="absolute -bottom-16 left-4">
          <Avatar user={user} isLarge hasBorder />
        </div>
      </div>
    </div>
  );
};

export default UserHero;
