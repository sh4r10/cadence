"use server";
import { PlaylistsDisplay } from "@/components/PlaylistsDisplay";
import PlaylistForm from "@/components/forms/PlaylistForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { fetchPlaylists } from "@/lib/data";

export default async function PlaylistsPage() {
  const playlists = await fetchPlaylists();
  return (
    <main className="w-full py-20">
      <div className="m-auto flex justify-between w-2/3">
        <h1 className="text-2xl">Your Playlists</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>New</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="mb-6">Create New Playlist</DialogTitle>
              <DialogDescription asChild>
                <PlaylistForm />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <PlaylistsDisplay playlists={playlists} />
    </main>
  );
}
