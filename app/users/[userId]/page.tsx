import getCurrentUser from "@/actions/getCurrentUser";
import getPostsByUserId from "@/actions/getPostsByUserId";
import getUserById from "@/actions/getUserById";
import UserProfile from "@/components/UserProfile";

type Props = {
  userId?: string;
};

const page = async ({ params }: { params: Props }) => {
  const { userId } = params;

  // TODO: get user by ID, current user, and posts of that user
  const user = await getUserById(userId!);
  const currentUser = await getCurrentUser();
  const posts = await getPostsByUserId(userId!);

  return <UserProfile user={user} currentUser={currentUser} posts={posts} />;
};

export default page;
