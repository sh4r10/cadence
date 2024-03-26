"use server";

import { PrismaClient, type Song } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { UploadFormSchema } from "./schemas/uploadFormSchema";
import fs from "fs";
import { v4 } from "uuid";

const prisma = new PrismaClient();

export async function uploadSong(formData: FormData) {
  const validatedFields = UploadFormSchema.safeParse({
    title: formData.get("title"),
    artist: formData.get("artist"),
    released: formData.get("released"),
    file: formData.get("file"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { title, artist, released, file } = validatedFields.data;

  const song = await prisma.song.create({
    data: {
      title: title,
      artist: artist,
      released: released,
      ownerId: "thefirst",
    },
  });

  await saveFile(file, song.id);
  console.table(song);
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
