import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const shortenUrl = req.query.url;

  if (!shortenUrl || typeof shortenUrl !== "string") {
    res.status(400).json({ error: "Invalid URL" });

    return;
  }

  const url = await prisma.url.findFirst({
    where: {
      shortenUrl: shortenUrl,
    },
    select: {
      aliasOf: true,
    },
  });

  if (!url) {
    res.status(404).json({ error: "URL not found" });

    return;
  }

  return res.status(200).json({ aliasOf: url.aliasOf });
}
