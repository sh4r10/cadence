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
import { fetchPlaylists, fetchSongs } from "@/lib/data";

export default async function Home() {
  const [songs, playlists] = await Promise.all([
    fetchSongs(),
    fetchPlaylists(),
  ]);

  console.log(songs[14]);
  return (
    <main className="w-full py-20">
      <div className="m-auto flex justify-between w-2/3">
        <h1 className="text-2xl">Your Songs</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Upload</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="mb-6">Upload new song</DialogTitle>
              <DialogDescription asChild>
                <UploadForm />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <SongsDisplay songs={songs} playlists={playlists} />
    </main>
  );
}
