import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Emit a self-contained server bundle for the Docker runtime image.
  output: "standalone",
};

export default nextConfig;
