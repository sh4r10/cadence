import { Button } from "./ui/button";

import { TableCell, TableRow } from "@/components/ui/table";

import { usePlayer } from "@/lib/contexts/PlayerContext";
import type { Song } from "@prisma/client";

export function SongComponent({ song }: { song: Song }) {
  const { togglePlay, playNew, nowPlaying, isPlaying } = usePlayer();

  const handleClick = () => {
    if (nowPlaying?.id === song.id) {
      togglePlay();
    } else {
      playNew(song);
    }
  };

  return (
    <TableRow>
      <TableCell className="font-medium">
        <Button onClick={handleClick}>
          {nowPlaying?.id === song.id && isPlaying ? "Pause" : "Play"}
        </Button>
      </TableCell>
      <TableCell>{song.title}</TableCell>
      <TableCell>{song.artist}</TableCell>
      <TableCell>{song.released}</TableCell>
      <TableCell className="text-right">
        {new Date(song.createdAt).toDateString()}
      </TableCell>
    </TableRow>
  );
}
