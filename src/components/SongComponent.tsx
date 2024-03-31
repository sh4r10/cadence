import { Button } from "./ui/button";

import { TableCell, TableRow } from "@/components/ui/table";

import { usePlayer } from "@/lib/contexts/PlayerContext";
import type { Song } from "@prisma/client";
import clsx from "clsx";
import { PauseIcon, PlayIcon } from "lucide-react";

export function SongComponent({
  song,
  playSong,
}: {
  song: Song;
  playSong: (song: Song) => {};
}) {
  const { togglePlay, nowPlaying, isPlaying } = usePlayer();

  const handleClick = () => {
    if (nowPlaying?.id !== song.id) {
      playSong(song);
    } else if (nowPlaying !== null) {
      togglePlay();
    }
  };

  return (
    <TableRow
      className={clsx("font-normal", {
        "bg-gray-200 hover:bg-gray-200":
          nowPlaying?.id === song.id && isPlaying,
      })}
    >
      <TableCell>
        <button
          onClick={handleClick}
          className="bg-black text-white w-100 p-2 rounded-full flex justify-center align-center"
        >
          {nowPlaying?.id === song.id && isPlaying ? (
            <PauseIcon size={16} />
          ) : (
            <PlayIcon size={16} />
          )}
        </button>
      </TableCell>
      <TableCell className="font-medium">{song.title}</TableCell>
      <TableCell>{song.artist}</TableCell>
      <TableCell>{song.released}</TableCell>
      <TableCell className="text-right">
        {new Date(song.createdAt).toDateString()}
      </TableCell>
    </TableRow>
  );
}
