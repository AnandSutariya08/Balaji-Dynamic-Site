import type { NextConfig } from "next";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const WebpackObfuscator = require("webpack-obfuscator");

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(self), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,

  allowedDevOrigins: ["*.replit.dev", "*.sisko.replit.dev", "*.repl.co"],

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "firebasestorage.googleapis.com" },
      { protocol: "https", hostname: "storage.googleapis.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  async redirects() {
    return [
      {
        source: "/favicon.ico",
        destination: "/favicon.jpg",
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        source: "/sitemap.xml",
        headers: [
          { key: "Cache-Control", value: "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400" },
          { key: "Content-Type", value: "application/xml; charset=utf-8" },
        ],
      },
      {
        source: "/sitemap-images.xml",
        headers: [
          { key: "Cache-Control", value: "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400" },
          { key: "Content-Type", value: "application/xml; charset=utf-8" },
        ],
      },
      {
        source: "/robots.txt",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, s-maxage=86400" },
        ],
      },
    ];
  },

  webpack: (config, { isServer, dev }) => {
    const minimizers: unknown[] = config.optimization?.minimizer ?? [];
    minimizers.forEach((plugin: unknown) => {
      if (plugin && typeof plugin === "object") {
        const p = plugin as Record<string, unknown>;
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

    if (!dev && !isServer) {
      config.plugins.push(
        new WebpackObfuscator(
          {
            compact: true,
            controlFlowFlattening: false,
            deadCodeInjection: false,
            debugProtection: false,
            disableConsoleOutput: false,
            identifierNamesGenerator: "hexadecimal",
            log: false,
            numbersToExpressions: true,
            renameGlobals: false,
            selfDefending: false,
            simplify: true,
            splitStrings: true,
            splitStringsChunkLength: 10,
            stringArray: true,
            stringArrayCallsTransform: true,
            stringArrayCallsTransformThreshold: 0.75,
            stringArrayEncoding: ["base64"],
            stringArrayIndexShift: true,
            stringArrayRotate: true,
            stringArrayShuffle: true,
            stringArrayWrappersCount: 2,
            stringArrayWrappersChunkLength: 10,
            stringArrayWrappersParametersMaxCount: 4,
            stringArrayWrappersType: "variable",
            stringArrayThreshold: 0.75,
            target: "browser",
            transformObjectKeys: false,
            unicodeEscapeSequence: false,
          },
          []
        )
      );
    }

    return config;
  },
};

export default nextConfig;
