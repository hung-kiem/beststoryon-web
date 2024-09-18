// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: "John Doe" });
}

export async function loadPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  return posts;
}

export async function loadPostDetail(id: string) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/` + id);
  const posts = await res.json();

  return posts;
}
