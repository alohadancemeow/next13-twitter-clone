import getCurrentUser from "@/actions/getCurrentUser";
import getPosts from "@/actions/getPosts";

import Form from "@/components/Form";
import Header from "@/components/Header";
import PostFeed from "@/components/PostFeed";

export default async function Home() {
  const currentUser = await getCurrentUser();
  const posts = await getPosts();

  return (
    <main>
      <>
        <Header label="Home" />
        <Form currentUser={currentUser} placeholder="What's happening?" />
        <PostFeed currentUser={currentUser} posts={posts} />
      </>
    </main>
  );
}
