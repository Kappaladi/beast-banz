import { NextRequest } from "next/server";
import { toSteamID64 } from "steamidutils";
import getAvatarUrl from "@/lib/getAvatarUrl";

import { PrismaClient } from "@prisma/client/edge";
import useAccelerate from "@prisma/extension-accelerate";
const prisma = new PrismaClient().$extends(useAccelerate);

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  const formData = await req.formData();
  const user = formData.get("user") as string;
  const admin = formData.get("admin") as string;
  const reason = formData.get("reason") as string;
  const unban_date = Number(formData.get("unban_date"));
  if (
    user === undefined ||
    admin === undefined ||
    reason === undefined ||
    unban_date === undefined
  ) {
    return new Response("");
  }

  const avatarUrl = await getAvatarUrl(toSteamID64(user));
  const adminAvatarUrl =
    admin === "Console" ? "" : await getAvatarUrl(toSteamID64(admin));
  await prisma.bans.create({
    data: {
      user: user,
      user_avatar: avatarUrl,
      reason: reason,
      admin: admin,
      admin_avatar: adminAvatarUrl,
      unban_date: unban_date,
    },
  });

  new Response("");
}
