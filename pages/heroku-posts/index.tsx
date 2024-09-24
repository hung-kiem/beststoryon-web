import React from "react";

import { loadPosts } from "../api/heroku-post";
import Link from "next/link";

export interface Post {
  id: number;
  title: string;
  author: string;
  description: string;
  createdAt: number;
  updatedAt: number;
  imageUrl: string;
}

export interface PostListProps {
  posts: Post[];
}

export default function PostList(props: PostListProps) {
  return (
    <div>
      <h1>Danh sách bài Post</h1>
      <br />
      <ul>
        {props.posts.map((post) => (
          <li key={post.id}>
            <Link href={`/heroku-posts/${post.id}`}>
              <h2>{post.title}</h2>
            </Link>
            <p>{post.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const response = await loadPosts();
  const posts = response.data;
  return {
    props: {
      posts,
    },
  };
}
