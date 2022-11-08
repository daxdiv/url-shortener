import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";
import { StatusCodes as HTTPStatusCodes } from "http-status-codes";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const shortenUrl = req.query.url;

  if (!shortenUrl || typeof shortenUrl !== "string") {
    res.status(HTTPStatusCodes.BAD_REQUEST).json({ error: "Invalid URL" });

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
    res.status(HTTPStatusCodes.NOT_FOUND).json({ error: "URL not found" });

    return;
  }

  return res.status(200).json({ aliasOf: url.aliasOf });
}
