// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import httpProxy, { ProxyResCallback } from "http-proxy";
import Cookies from "cookies";

const proxy = httpProxy.createProxyServer();

export const config = {
  api: {
    bodyParser: false,
  },
};

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  return new Promise<void>((resolve) => {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method Not Allowed" });
    }

    req.headers.cookie = "";
    const handleLoginResponse: ProxyResCallback = (proxyRes, req, res) => {
      let body = "";
      proxyRes.on("data", (chunk) => {
        body += chunk;
      });
      proxyRes.on("end", () => {
        try {
          const { accessToken, expiredAt } = JSON.parse(body);
          // convert token to cookie
          const cookies = new Cookies(req, res, {
            secure: process.env.NODE_ENV !== "development",
          });
          cookies.set("accessToken", accessToken, {
            httpOnly: true,
            expires: new Date(expiredAt),
            sameSite: "lax",
          });

          (res as NextApiResponse<Data>)
            .status(200)
            .json({ message: "Login successful" });
        } catch (e) {
          (res as NextApiResponse<Data>)
            .status(500)
            .json({ message: "Something went wrong" });
        }

        resolve();
      });
    };

    proxy.on("proxyRes", handleLoginResponse);

    proxy.web(req, res, {
      target: process.env.CORE_API,
      changeOrigin: true,
      selfHandleResponse: true,
    });
  });
}
