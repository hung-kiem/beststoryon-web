import * as React from "react";
import { loadPosts } from "@/pages/api/hello";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  body: string;
}
interface PageProps {
  posts: Post[];
}

export interface PostListPageProps {}

export default function PostListPage({ posts }: PageProps) {
  console.log(posts);

  return (
    <React.Fragment>
      <h1>Danh sách bài post</h1>
      <br />
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
}

export async function getStaticProps() {
  const posts: Post[] = await loadPosts();
  if (!posts) {
    return {
      notFound: true,
    };
  }
  return { props: { posts } };
}
