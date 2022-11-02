import { z } from "zod";
import { customAlphabet } from "nanoid";
import { router, publicProcedure } from "../trpc";

const nanoid = customAlphabet(
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  8
);
export const urlRouter = router({
  shorten: publicProcedure
    .input(z.object({ url: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { url } = input;
      const shortenedUrl = await ctx.prisma.url.create({
        data: {
          aliasOf: url,
          shortenUrl: nanoid(),
        },
        select: {
          shortenUrl: true,
          aliasOf: true,
        },
      });

      return shortenedUrl;
    }),
});
