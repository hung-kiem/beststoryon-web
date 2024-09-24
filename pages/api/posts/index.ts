// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  const apiResponse = fetch(
    `https://js-post-api.herokuapp.com/api/posts?_page=1`
  );
  apiResponse
    .then((response) => response.json())
    .then((data) => {
      res.status(200).json(data);
    })
    .catch(() => {
      res.status(500).json({ message: "Internal Server Error" });
    });
}
