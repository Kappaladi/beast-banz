import { NextRequest } from "next/server";

import { PrismaClient } from "@prisma/client/edge";
import useAccelerate from "@prisma/extension-accelerate";
const prisma = new PrismaClient().$extends(useAccelerate);

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page");
  const steam = searchParams.get("steam");
  if (page) {
    const count = await prisma.bans.count({
      where: {
        user: {
          contains: steam?.toString(),
        },
      },
      cacheStrategy: { swr: 300, ttl: 300 },
    });

    const bans = await prisma.bans.findMany({
      skip: Number(page) * 10,
      take: 10,
      where: {
        user: {
          contains: steam?.toString(),
        },
      },
      cacheStrategy: { swr: 300, ttl: 300 },
    });

    return new Response(
      JSON.stringify({
        count,
        bans,
      }),
      {
        status: 200,
        headers: {
          "content-type": "application/json",
        },
      }
    );
  }
}
