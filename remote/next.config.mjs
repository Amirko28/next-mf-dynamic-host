/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");

import { NextFederationPlugin } from "@module-federation/nextjs-mf";

/** @type {import("next").NextConfig} */
const config = {
    reactStrictMode: true,

    /**
     * If you have `experimental: { appDir: true }` set, then you must comment the below `i18n` config
     * out.
     *
     * @see https://github.com/vercel/next.js/issues/41980
     */
    i18n: {
        locales: ["en"],
        defaultLocale: "en",
    },

    webpack(config) {
        config.plugins.push(
            new NextFederationPlugin({
                name: "remote",
                filename: "static/chunks/remoteEntry.js",
                remotes: {},
                extraOptions: {
                    automaticAsyncBoundary: true,
                },
                exposes: {
                    "./Div": "./src/components/the-other-side.tsx",
                },
                shared: {},
            })
        );
        return config;
    },
};
export default config;
