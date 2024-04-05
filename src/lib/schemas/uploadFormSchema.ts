import { z } from "zod";

export const UploadFormSchema = z.object({
  title: z
    .string({ invalid_type_error: "Title cannot be empty" })
    .min(1)
    .max(200),
  artist: z
    .string({ invalid_type_error: "Artist cannot be empty" })
    .min(1)
    .max(200),
  released: z.coerce
    .number()
    .gt(1859, { message: "Year must be greater than 1859" }),
  playlist: z.string().nullable().default(null),
  file: z.custom<File>((val) => val instanceof File),
});

export const PlaylistSchema = z.object({
  name: z.string({ invalid_type_error: "Name cannot be empty" }).min(1).max(32),
});

export const DeleteSongSchema = z.object({
  song: z.string({ invalid_type_error: "ID cannot be empty" }),
});
