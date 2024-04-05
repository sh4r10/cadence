import { TableCell, TableRow } from "@/components/ui/table";
import { usePlayer } from "@/lib/contexts/usePlayer";
import type { Playlist, Song } from "@prisma/client";
import clsx from "clsx";
import { Ellipsis, PauseIcon, PlayIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  addSongToPlaylist,
  deleteSong,
  removeSongFromPlaylist,
} from "@/lib/actions";
import { useRef } from "react";
import { SongWithPlaylists } from "@/lib/data";
import { usePathname } from "next/navigation";

export function SongComponent({
  song,
  index,
  playlists,
  playSong,
}: {
  song: SongWithPlaylists;
  index: number;
  playlists: Playlist[];
  playSong: (song: number) => void;
}) {
  const { togglePlay, nowPlaying, isPlaying } = usePlayer();
  const formRef = useRef<HTMLFormElement>(null);
  const pathname = usePathname();

  //match playlist id from url
  const matchResult = pathname.match(/(?<=playlists\/)[A-Za-z0-9\-]+/);
  const currPlaylist = matchResult ? matchResult[0] : null;

  const handleClick = () => {
    if (nowPlaying?.id !== song.id) {
      playSong(index);
    } else if (nowPlaying !== null) {
      togglePlay();
    }
  };

  const handlePlaylistClick = (playlist: string) => {
    const bindedAction = addSongToPlaylist.bind(null, song.id, playlist);
    bindedAction();
  };

  const removeFromPlaylist = () => {
    if (!currPlaylist) return;
    const bindedAction = removeSongFromPlaylist.bind(
      null,
      song.id,
      currPlaylist,
    );
    bindedAction();
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
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Ellipsis />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <span>Add to playlist</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {playlists
                    .filter((p) =>
                      song.playlists.length !== 0
                        ? !song.playlists.some((list) => list.id === p.id)
                        : true,
                    )
                    .map((p) => {
                      return (
                        <DropdownMenuItem
                          key={p.id}
                          onClick={() => handlePlaylistClick(p.id)}
                        >
                          <span>{p.name}</span>
                        </DropdownMenuItem>
                      );
                    })}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            {currPlaylist && (
              <DropdownMenuItem onClick={removeFromPlaylist}>
                Remove from playlist
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={() => formRef.current?.requestSubmit()}>
              <form action={deleteSong} ref={formRef}>
                <input type="hidden" value={song.id} name="song" />
              </form>
              <span className="text-red-700">Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
