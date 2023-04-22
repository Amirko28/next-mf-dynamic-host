import { type AppType } from "next/dist/shared/lib/utils";

import "@/styles/globals.css";
import Head from "next/head";

const MyApp: AppType = ({ Component, pageProps }) => {
    return (
        <>
            <Head>
                <title>Welcome to host</title>
            </Head>
            <Component {...pageProps} />
        </>
    );
};

export default MyApp;
