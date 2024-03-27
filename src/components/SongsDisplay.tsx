"use client";
import type { Song } from "@prisma/client";
import { PlayerProvider } from "@/lib/contexts/PlayerContext";
import { AudioPlayer } from "./AudioPlayer";
import { SongComponent } from "./SongComponent";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function SongsDisplay({ songs }: { songs: Song[] }) {
  return (
    <PlayerProvider>
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
            {songs.map((song) => (
              <SongComponent song={song} key={song.id} />
            ))}
          </TableBody>
        </Table>
      </div>
      <AudioPlayer />
    </PlayerProvider>
  );
}
