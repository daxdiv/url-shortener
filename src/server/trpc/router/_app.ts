import { router } from "../trpc";
import { authRouter } from "./auth";
import { urlRouter } from "./url";

export const appRouter = router({
  url: urlRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
