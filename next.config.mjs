/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
    domains: [
      "res.cloudinary.com",
      "unsplash.com",
      "images.unsplash.com",
      "images.remotePatterns",
      "plus.unsplash.com",
    ],
  },
};

export default nextConfig;
