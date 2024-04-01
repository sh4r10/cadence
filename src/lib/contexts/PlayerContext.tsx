import { createContext } from "react";
import { initialState } from "./playerReducer";
import type { Song } from "@prisma/client";

interface PlayerContextType {
  isPlaying: boolean;
  nowPlaying: Song | null;
  togglePlay: () => void;
  playNew: (song: number, trackList: Song[]) => void;
  playNext: () => void;
  playPrevious: () => void;
}

export const PlayerContext = createContext<PlayerContextType>({
  isPlaying: initialState.isPlaying,
  nowPlaying: initialState.nowPlaying,
  togglePlay: () => {},
  playNew: () => {},
  playNext: () => {},
  playPrevious: () => {},
});
