"use client";
import type { Song } from "@prisma/client";
import { SongComponent } from "./SongComponent";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePlayer } from "@/lib/contexts/usePlayer";

export function SongsDisplay({ songs }: { songs: Song[] }) {
  const { playNew } = usePlayer();

  const playSong = (song: number) => {
    playNew(song, songs);
  };

  return (
    <div className="py-16 flex gap-5 flex-wrap justify-center w-2/3 m-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]"></TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Artist</TableHead>
            <TableHead>Release Year</TableHead>
            <TableHead className="text-right">Date Added</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {songs.map((song, i) => (
            <SongComponent
              index={i}
              song={song}
              playSong={playSong}
              key={song.id}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
