import getCurrentUser from "@/actions/getCurrentUser";
import getUserById from "@/actions/getUserById";
import UserProfile from "@/components/UserProfile";

type Props = {
  userId?: string;
};

const page = async ({ params }: { params: Props }) => {
  const { userId } = params;

  // TODO: get user by ID, and current user
  const user = await getUserById(userId!);
  const currentUser = await getCurrentUser();

  return <UserProfile user={user} currentUser={currentUser} />;
};

export default page;
