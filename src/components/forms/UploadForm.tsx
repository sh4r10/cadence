"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { uploadSong } from "@/lib/actions";

export default function UploadForm({ playlistId }: { playlistId?: string }) {
  return (
    <form action={uploadSong} className="space-y-8">
      <Input type="text" name="title" placeholder="Title" />
      <Input type="text" name="artist" placeholder="Artist" />
      <Input type="text" name="released" placeholder="Release Year" />
      {playlistId && <Input type="hidden" name="playlist" value={playlistId} />}
      <Input type="file" name="file" />
      <Button type="submit">Submit</Button>
    </form>
  );
}
