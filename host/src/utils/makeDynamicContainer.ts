import { injectScript } from "@module-federation/utilities";

const isServer = typeof window === "undefined";

interface DynamicContainerParams {
    url: string;
    global: string;
    componentName: string;
}

export const makeDynamicContainer = ({
    url,
    global,
    componentName,
}: DynamicContainerParams) => {
    console.log(`IS SERVER: ${String(isServer)}`);

    return injectScript({
        global: global,
        url: `${url}/_next/static/${
            isServer ? "ssr" : "chunks"
        }/remoteEntry.js`,
    }).then((container) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
        return container.get(componentName).then((factory: () => any) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return factory();
        });
    });
};
