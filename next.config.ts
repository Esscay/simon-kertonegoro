import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    // allow the hero layers to be served at near-lossless quality
    qualities: [75, 95],
    // allow ?v= cache-busting on local images
    localPatterns: [{ pathname: "/**" }],
  },
};

export default nextConfig;
