/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/story/:alias-:storyId.html",
        destination: "/story/:alias-:storyId",
      },
    ];
  },
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
