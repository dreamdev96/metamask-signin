import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import { MetaMaskProvider } from "@metamask/sdk-react";
import store from "@/app/store";

const host =
  process.env.NEXT_PUBLIC_ENV === "DEV" ? "http://localhost:3000/" : "realHost";

const sdkOptions = {
  logging: { developerMode: true },
  checkInstallationImmediately: false,
  dappMetadata: {
    name: "Next-Metamask-SignIn",
    url: host,
  },
};

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MetaMaskProvider debug={false} sdkOptions={sdkOptions}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </MetaMaskProvider>
  );
}
