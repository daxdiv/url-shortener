import { protectedProcedure, publicProcedure, router } from "../trpc";

import { customAlphabet } from "nanoid";
import { z } from "zod";

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
          userId: ctx.session?.user?.id || undefined,
        },
        select: {
          shortenUrl: true,
          aliasOf: true,
        },
      });

      return shortenedUrl;
    }),
  getAllByUserId: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user?.id;

    return await ctx.prisma.url.findMany({
      where: {
        userId,
      },
      select: {
        aliasOf: true,
        shortenUrl: true,
        id: true,
        createdAt: true,
      },
    });
  }),
});
