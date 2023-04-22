import { revalidate } from "@module-federation/nextjs-mf/utils";
import Document, { Html, Head, Main, NextScript } from "next/document";
import type { DocumentContext, DocumentInitialProps } from "next/document";

export default class CustomDocument extends Document {
    static async getInitialProps(
        ctx: DocumentContext
    ): Promise<DocumentInitialProps> {
        const originalRenderPage = ctx.renderPage;

        ctx.renderPage = () =>
            originalRenderPage({
                enhanceComponent: (Component) => Component,
            });

        const intialProps = await Document.getInitialProps(ctx);

        ctx?.res?.on("finish", () => {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            revalidate().then((shouldUpdate) => {
                console.log("finished sending response", shouldUpdate);
            });
        });

        return { ...intialProps };
    }

    render() {
        return (
            <Html>
                <Head>{this.props.styles}</Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
