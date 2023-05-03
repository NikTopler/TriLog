import "@/styles/reset.scss";
import "@/styles/globals.scss";
import "@/styles/auth.scss";

import type { AppProps } from "next/app";
import { HomeLayout } from "@/client/shared/layouts";

export default function App({ Component, pageProps, router }: AppProps) {

  if (router.pathname.includes('/auth')) {
    return (
      <Component {...pageProps} />
    );
  }

  return (
    <HomeLayout>
      <Component {...pageProps} />
    </HomeLayout>
  );
}
