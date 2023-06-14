import { getSession } from "@/actions/getCurrentUser";
import Header from "@/components/Header";
import PostFeed from "@/components/PostFeed";

export default async function Home() {
  const session = await getSession();
  console.log("session", session);

  return (
    <main>
      <>
        <Header label="Home" />
        {/* <Form placeholder="What's happening?" /> */}
        <PostFeed />
      </>
    </main>
  );
}
