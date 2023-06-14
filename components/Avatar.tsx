"use client";

import { User } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface AvatarProps {
  //   userId: string;
  user?: User | null;
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ user, isLarge, hasBorder }) => {
  const router = useRouter();

  const onClick = useCallback(
    (event: any) => {
      event.stopPropagation();

      const url = `/users/${user?.id}`;

      router.push(url);
    },
    [router, user]
  );

  return (
    <div
      className={`
        ${hasBorder ? "border-4 border-black" : ""}
        ${isLarge ? "h-32" : "h-12"}
        ${isLarge ? "w-32" : "w-12"}
        rounded-full 
        hover:opacity-90 
        transition 
        cursor-pointer
        relative
      `}
    >
      <Image
        fill
        style={{
          objectFit: "cover",
          borderRadius: "100%",
        }}
        alt="Avatar"
        onClick={onClick}
        src={user?.profileImage || "/images/placeholder.png"}
      />
    </div>
  );
};

export default Avatar;
