"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { uploadSong } from "@/lib/actions";

export default function UploadForm() {
  return (
    <form action={uploadSong} className="space-y-8">
      <Input type="text" name="title" placeholder="Title" />
      <Input type="text" name="artist" placeholder="Artist" />
      <Input type="text" name="released" placeholder="Release Year" />
      <Input type="file" name="file" />
      <Button type="submit">Submit</Button>
    </form>
  );
}
