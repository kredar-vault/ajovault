import type { NextConfig } from "next";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "standalone",
  typescript: { ignoreBuildErrors: true },

  async rewrites() {
    const upstream =
      process.env.API_BASE_URL ??
      process.env.NEXT_PUBLIC_API_URL ??
      "https://api.vault.staging.kredar.xyz";
    return [
      {
        source: "/api/:path*",
        destination: `${upstream}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
