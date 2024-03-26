"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function fetchSongs() {
  const res = await prisma.song.findMany({
    where: {
      ownerId: "thefirst",
    },
  });
  return res;
}
