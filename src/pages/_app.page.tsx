import "../libs/dayjs";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { DefaultSeo } from "next-seo";
import { QueryClientProvider } from "@tanstack/react-query";

import { globalStyles } from "../../styles/global";

import { queryClient } from "../libs/react-query";

globalStyles();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <DefaultSeo
          openGraph={{
            type: "website",
            locale: "pt_BR",
            url: "https://ig-call.igapplications.com/",
            siteName: "Ig Call",
          }}
          twitter={{
            handle: "@handle",
            site: "@site",
            cardType: "summary_large_image",
          }}
        />
        <Component {...pageProps} />
      </SessionProvider>
    </QueryClientProvider>
  );
}
