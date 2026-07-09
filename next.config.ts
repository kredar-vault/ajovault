import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Emit a self-contained server bundle for the Docker runtime image.
  output: "standalone",
  // Don't fail the production build on pre-existing type/lint errors (matches the
  // kredar/xental frontends). Re-enable once the app compiles clean.
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
