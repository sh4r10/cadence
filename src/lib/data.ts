"use server";

import { prisma } from "../../prisma/client";

export async function fetchSongs() {
  const res = await prisma.song.findMany({
    where: {
      ownerId: "thefirst",
    },
  });
  return res;
}
