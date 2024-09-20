import React from "react";
import { useRouter } from "next/router";

import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { loadPosts, loadPostDetail } from "../api/heroku-post";

export interface Post {
  id: number;
  title: string;
  author: string;
  description: string;
  createdAt: number;
  updatedAt: number;
  imageUrl: string;
}

export default function PostDetail(props: Post) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{props.title}</h1>
      <p>{props.description}</p>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  console.log("\nGET STATIC PATH");
  const res = await loadPosts();
  const posts = res.data;

  const paths = posts.map((post: Post) => ({
    params: { postId: `${post.id}` },
  }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  console.log("\nGET STATIC PROPS " + context.params?.postId);
  const postId = context.params?.postId as string;
  if (!postId) return { notFound: true };
  const post = await loadPostDetail(postId);
  return {
    props: post,
    revalidate: 5,
  };
};
