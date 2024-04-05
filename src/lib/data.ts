"use server";

import { Playlist, Song } from "@prisma/client";
import { prisma } from "../../prisma/client";

export type SongWithPlaylists = Song & { playlists: Playlist[] };

export async function fetchSongs(): Promise<SongWithPlaylists[]> {
  // TODO: update user ID
  const res = await prisma.song.findMany({
    where: {
      ownerId: "thefirst",
    },
    include: {
      playlists: true,
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

export async function fetchPlaylistById(id: string) {
  // TODO: update user ID
  const res = await prisma.playlist.findUnique({
    where: {
      ownerId: "thefirst",
      id: id,
    },
    include: {
      songs: {
        include: {
          playlists: true,
        },
      },
    },
  });
  return res;
}

export async function getTop5Playlists() {
  const res = await prisma.playlist.findMany({
    take: 5,
  });
  return res;
}
