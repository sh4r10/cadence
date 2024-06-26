"use server";

import { revalidatePath } from "next/cache";
import {
  DeleteSongSchema,
  PlaylistSchema,
  UploadFormSchema,
} from "./schemas/uploadFormSchema";
import fs from "fs";
import { prisma } from "../../prisma/client";

export async function deleteSong(formData: FormData) {
  // TODO: error handling
  const validatedFields = DeleteSongSchema.safeParse({
    song: formData.get("song"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { song } = validatedFields.data;

  await prisma.song.delete({
    where: {
      id: song,
    },
  });

  //TODO test
  await fs.promises.rm(`uploads/${song}.mp3`);
  // TODO: more fine tuned revalidation
  revalidatePath("/");
}

export async function createPlaylist(formData: FormData) {
  // TODO: error handling
  const validatedFields = PlaylistSchema.safeParse({
    name: formData.get("name"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name } = validatedFields.data;

  const playlist = await prisma.playlist.create({
    data: {
      name,
      ownerId: "thefirst",
    },
  });

  // TODO: more fine tuned revalidation
  revalidatePath("/");
}

export async function uploadSong(formData: FormData) {
  // TODO: error handling
  const validatedFields = UploadFormSchema.safeParse({
    title: formData.get("title"),
    artist: formData.get("artist"),
    released: formData.get("released"),
    playlist: formData.get("playlist"),
    file: formData.get("file"),
  });

  if (!validatedFields.success) {
    console.log("validation failed");
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { title, artist, released, file, playlist } = validatedFields.data;

  // TODO: add owner checking for playlist
  const song = await prisma.song.create({
    data: {
      title: title,
      artist: artist,
      released: released,
      ownerId: "thefirst",
      playlists:
        playlist === null
          ? {}
          : {
              connect: {
                id: playlist,
              },
            },
    },
  });

  await saveFile(file, song.id);
  revalidatePath("/");
}

async function saveFile(file: File, id: string) {
  try {
    const name = `uploads/${id}.mp3`;
    const buffer = await file.arrayBuffer();
    fs.writeFileSync(name, Buffer.from(buffer));
  } catch (error) {
    console.error("Error saving file:", error);
    throw error;
  }
}

export async function addSongToPlaylist(song: string, playlist: string) {
  try {
    if (!song) return { errors: ["Missing Song ID"] };
    if (!playlist) return { errors: ["Missing Playlist ID"] };

    const playlistObj = await prisma.playlist.findUnique({
      where: { id: playlist },
    });
    const songObj = await prisma.song.findUnique({
      where: { id: song },
      select: { playlists: true },
    });

    if (!songObj) return { errors: ["Invalid Song ID"] };
    if (!playlistObj) return { errors: ["Invalid Playlist ID"] };

    await prisma.song.update({
      where: {
        id: song,
      },
      data: {
        playlists: {
          connect: {
            id: playlist,
          },
        },
      },
    });

    revalidatePath("/");
  } catch (error) {
    console.error("Error:", error);
    return { errors: ["Something went wrong"] };
  }
}

export async function removeSongFromPlaylist(song: string, playlist: string) {
  try {
    if (!song) return { errors: ["Missing Song ID"] };
    if (!playlist) return { errors: ["Missing Playlist ID"] };

    const playlistObj = await prisma.playlist.findUnique({
      where: { id: playlist },
    });
    const songObj = await prisma.song.findUnique({
      where: { id: song },
      select: { playlists: true },
    });

    if (!songObj) return { errors: ["Invalid Song ID"] };
    if (!playlistObj) return { errors: ["Invalid Playlist ID"] };

    await prisma.song.update({
      where: {
        id: song,
      },
      data: {
        playlists: {
          disconnect: {
            id: playlist,
          },
        },
      },
    });

    revalidatePath("/");
  } catch (error) {
    console.error("Error:", error);
    return { errors: ["Something went wrong"] };
  }
}
