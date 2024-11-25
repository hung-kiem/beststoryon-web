/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/story/:alias-:storyId.html",
        destination: "/story/:alias-:storyId",
      },
      {
        source: "/story/:storyId/chapter/:index.html",
        destination: "/story/:storyId/chapter/:index",
      },
      {
        source: "/contact-us.html",
        destination: "/contact-us",
      },
      {
        source: "/terms-of-service.html",
        destination: "/terms-of-service",
      },
      {
        source: "/privacy-policy.html",
        destination: "/privacy-policy",
      },
      {
        source: "/dcma.html",
        destination: "/dcma",
      },
      {
        source: "/author/:authorCode.html",
        destination: "/author/:authorCode",
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
      "images.novelsnook.com",
    ],
  },
};

export default nextConfig;
