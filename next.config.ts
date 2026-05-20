import type { NextConfig } from "next";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const WebpackObfuscator = require("webpack-obfuscator");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer, dev }) => {
    // ── 1. Preserve `debugger` statements through minification ────────────
    // SWC and Terser both strip `debugger` by default in production.
    // Our DevtoolsGuard uses `new Function('debugger')` to work around SWC,
    // but we also patch Terser here as a belt-and-suspenders backup.
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

    // ── 2. Obfuscate client-side bundles in production ────────────────────
    // Only runs on the browser (client) bundles, never on the server build,
    // and never in development (would slow down HMR to a crawl).
    //
    // Safe settings for React / Next.js App Router:
    //   • controlFlowFlattening: false  — breaks React's reconciler logic
    //   • deadCodeInjection:     false  — inflates bundle + breaks tree-shaking
    //   • selfDefending:         false  — conflicts with our own debugger guard
    //   • renameGlobals:         false  — breaks Next.js runtime globals
    //   • transformObjectKeys:   false  — breaks React JSX object spread
    //
    // What IS enabled:
    //   • stringArray + base64 encoding — all string literals (incl. Firebase
    //     config, API keys, route paths) are encoded into a rotating array and
    //     decoded at runtime via generated helper functions
    //   • splitStrings — long strings are split into 10-char chunks joined at runtime
    //   • identifierNamesGenerator: 'hexadecimal' — every variable, function,
    //     and class name becomes a hex string like _0x3f2a1b
    //   • numbersToExpressions — numeric literals replaced with expressions
    //   • stringArrayCallsTransform — call sites are further obscured
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
