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
      {
        source: "/trending/:catCode/list-:pageIndex.html",
        destination: "/trending/:catCode/list-:pageIndex",
      },
      {
        source: "/newRelease/:catCode/list-:pageIndex.html",
        destination: "/newRelease/:catCode/list-:pageIndex",
      },
      {
        source: "/hot/:catCode/list-:pageIndex.html",
        destination: "/hot/:catCode/list-:pageIndex",
      },
      {
        source: "/categories/:catCode/list-:pageIndex.html",
        destination: "/categories/:catCode/list-:pageIndex",
      },
      {
        source: "/update/:catCode/list-:pageIndex.html",
        destination: "/update/:catCode/list-:pageIndex",
      },
      {
        source: "/tag/:tagCode/list-:pageIndex.html",
        destination: "/tag/:tagCode/list-:pageIndex",
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
