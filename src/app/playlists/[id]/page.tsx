"use server";
import { SongsDisplay } from "@/components/SongsDisplay";
import UploadForm from "@/components/forms/UploadForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { fetchPlaylist } from "@/lib/data";
import { notFound } from "next/navigation";

export default async function PlaylistPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;

  const playlist = await fetchPlaylist(id);

  if (!playlist) {
    notFound();
  }

  return (
    <main className="w-full py-20">
      <div className="m-auto flex justify-between w-2/3">
        <h1 className="text-2xl">{playlist.name}</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Upload</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="mb-6">Upload new song</DialogTitle>
              <DialogDescription asChild>
                <UploadForm playlistId={playlist.id} />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <SongsDisplay songs={playlist.songs} />
    </main>
  );
}
