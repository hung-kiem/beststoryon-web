// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import httpProxy from "http-proxy";
import Cookies from "cookies";

const proxy = httpProxy.createProxyServer();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
) {
  return new Promise<void>((resolve) => {
    // convert cookie to token
    console.log("in here");
    const cookies = new Cookies(req, res);
    const accessToken = cookies.get("accessToken");
    console.log("accessToken", accessToken);
    if (accessToken) {
      req.headers.Authorization = `Bearer ${accessToken}`;
    }

    // remove cookie from client request
    req.headers.cookie = "";

    // create a new proxy server

    proxy.web(req, res, {
      target: process.env.CORE_API,
      changeOrigin: true,
      selfHandleResponse: false,
    });

    proxy.once("proxyRes", () => {
      resolve();
    });
  });
}
