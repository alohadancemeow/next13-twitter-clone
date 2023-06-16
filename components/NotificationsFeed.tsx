"use client";

import { Notification } from "@prisma/client";
import { BsTwitter } from "react-icons/bs";

type Props = {
  notifications?: Notification[] | null;
};

const NotificationsFeed = ({ notifications }: Props) => {
  if (notifications?.length === 0) {
    return (
      <div className="p-6 text-xl text-center text-neutral-600">
        No notifications
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {notifications?.map((notification: Record<string, any>) => (
        <div
          key={notification.id}
          className="flex flex-row items-center p-6 gap-4 border-b-[1px] border-neutral-800"
        >
          <BsTwitter color="white" size={32} />
          <p className="text-white">{notification.body}</p>
        </div>
      ))}
    </div>
  );
};

export default NotificationsFeed;
