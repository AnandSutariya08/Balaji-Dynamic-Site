import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // Prevent any minimizer from stripping `debugger` statements.
    // Our client-side security guard depends on them surviving into production.
    const minimizers: unknown[] = config.optimization?.minimizer ?? [];
    minimizers.forEach((plugin: unknown) => {
      if (plugin && typeof plugin === "object") {
        const p = plugin as Record<string, unknown>;
        // TerserPlugin (used when SWC minify is disabled)
        if (p["options"] && typeof p["options"] === "object") {
          const opts = p["options"] as Record<string, unknown>;
          const terser = (opts["terserOptions"] as Record<string, unknown>) ?? {};
          const compress = (terser["compress"] as Record<string, unknown>) ?? {};
          compress["drop_debugger"] = false;
          terser["compress"] = compress;
          opts["terserOptions"] = terser;
        }
      }
    });
    return config;
  },
};

export default nextConfig;
