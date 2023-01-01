import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import { useState } from "react";
import { SidePanelProvider } from "../utils/contexts";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [open, setOpen] = useState(false);

  return (
    <SessionProvider session={session}>
      <SidePanelProvider value={{ open, setOpen }}>
        <Component {...pageProps} />
      </SidePanelProvider>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
