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
  playlist: z.string().optional().default(""),
  file: z.custom<File>((val) => val instanceof File),
});

export const PlaylistSchema = z.object({
  name: z.string({ invalid_type_error: "Name cannot be empty" }).min(1).max(32),
});
