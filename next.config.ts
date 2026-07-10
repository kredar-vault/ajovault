import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "standalone",
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },

  async rewrites() {
    const upstream =
      process.env.API_BASE_URL ?? "https://api.vault.staging.kredar.xyz";
    return [
      {
        source: "/api/:path*",
        destination: `${upstream}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
