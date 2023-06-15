import getCurrentUser from "@/actions/getCurrentUser";
import getPostById from "@/actions/getPostById";
import Tweet from "@/components/Tweet";
import React from "react";

type Props = {
  postId: string;
};

const Post = async ({ params }: { params: Props }) => {
  const { postId } = params;

  const currentUser = await getCurrentUser();
  const post = await getPostById(postId);

  return <Tweet post={post} currentUser={currentUser} />;
};

export default Post;
