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
    console.log("in here");
    const cookies = new Cookies(req, res);
    const accessToken = cookies.get("accessToken");
    console.log("payload", req.body);
    if (accessToken) {
      req.headers.Authorization = `Bearer ${accessToken}`;
    }

    req.headers.cookie = "";

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
