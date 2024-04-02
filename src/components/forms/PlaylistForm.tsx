"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createPlaylist } from "@/lib/actions";

export default function UploadForm() {
  return (
    <form action={createPlaylist} className="space-y-8">
      <Input type="text" name="name" placeholder="Name" />
      <Button type="submit">Create</Button>
    </form>
  );
}
