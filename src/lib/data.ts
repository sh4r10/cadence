"use server";

import { prisma } from "../../prisma/client";

export async function fetchSongs() {
  // TODO: update user ID
  const res = await prisma.song.findMany({
    where: {
      ownerId: "thefirst",
    },
  });
  return res;
}

export async function fetchPlaylists() {
  // TODO: update user ID
  const res = await prisma.playlist.findMany({
    where: {
      ownerId: "thefirst",
    },
  });
  return res;
}

export async function fetchPlaylist(id: string) {
  // TODO: update user ID
  const res = await prisma.playlist.findUnique({
    where: {
      ownerId: "thefirst",
      id: id,
    },
    include: {
      songs: true,
    },
  });
  return res;
}
