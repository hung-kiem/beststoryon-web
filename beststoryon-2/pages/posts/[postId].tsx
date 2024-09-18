import { useRouter } from "next/router";
import * as React from "react";
import { loadPosts, loadPostDetail } from "../api/hello";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface PostDetailPageProps {
  post: Post;
}

export default function PostDetailPage(props: PostDetailPageProps) {
  const router = useRouter();
  const detail = props.post;
  return (
    <div>
      <h1>Post Detail Page</h1>
      <p>Query: {JSON.stringify(router.query)}</p>
      <p>{detail.id}</p>
      <p>{detail.title}</p>
      <p>{detail.body}</p>
    </div>
  );
}

export async function getStaticPaths() {
  console.log("getStaticPaths server side");
  const posts: Post[] = await loadPosts();
  if (!posts) {
    return {
      notFound: true,
    };
  }

  return {
    paths: posts.map((post) => ({ params: { postId: `${post.id}` } })),
    fallback: false,
  };
}

import { GetStaticPropsContext } from "next";

export async function getStaticProps(context: GetStaticPropsContext) {
  console.log("getStaticProps server side");
  console.log(context);

  const postId = Array.isArray(context?.params?.postId)
    ? context.params.postId[0]
    : context?.params?.postId;
  if (!postId) {
    return { notFound: true };
  }
  const post = await loadPostDetail(postId);
  return { props: { post } };
}
