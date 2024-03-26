import { fetchSongs } from "@/lib/data";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AudioPlayer } from "./AudioPlayer";

export async function SongsDisplay() {
  const songs = await fetchSongs();
  return (
    <div className="mt-20 flex gap-5 flex-wrap justify-center">
      {songs.map((song, i) => {
        return (
          <Card key={i} className="w-[380px]">
            <CardHeader>
              <CardTitle>{song.title}</CardTitle>
              <CardDescription>
                {song.artist} • {song.released}
              </CardDescription>
              <CardContent className="w-100">
                <AudioPlayer song={song.id} />
              </CardContent>
            </CardHeader>
          </Card>
        );
      })}
    </div>
  );
}
