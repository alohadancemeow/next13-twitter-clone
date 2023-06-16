import getCurrentUser from "@/actions/getCurrentUser";
import getNoitfications from "@/actions/getNotifications";

import Header from "@/components/Header";
import NotificationsFeed from "@/components/NotificationsFeed";

type Props = {};

const Notifications = async (props: Props) => {
  const currentUser = await getCurrentUser();
  const notifications = await getNoitfications(currentUser?.id!);

  return (
    <>
      <Header showBackArrow label="Notifications" />
      <NotificationsFeed notifications={notifications} />
    </>
  );
};

export default Notifications;
