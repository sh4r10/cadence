"use client";
import { ReactNode, createContext, useContext, useReducer } from "react";
import { PLAYER_ACTIONS, initialState, playerReducer } from "./playerReducer";
import type { Song } from "@prisma/client";

interface PlayerContextType {
  isPlaying: boolean;
  nowPlaying: Song | null;
  togglePlay: () => void;
  playNew: (song: Song, trackList: Song[]) => string;
  playNext: () => {};
  playPrevious: () => {};
}

const PlayerContext = createContext<PlayerContextType>({
  isPlaying: initialState.isPlaying,
  nowPlaying: initialState.nowPlaying,
  togglePlay: () => {},
  playNew: () => "hello",
  playNext: () => {},
  playPrevious: () => {},
});

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(playerReducer, initialState);

  const togglePlay = () => {
    dispatch({ type: PLAYER_ACTIONS.TOGGLE_PLAY });
  };

  const playNew = (song: Song, trackList: Song[]) => {
    dispatch({ type: PLAYER_ACTIONS.PLAY_NEW, payload: { song, trackList } });
  };

  const playNext = () => {
    dispatch({ type: PLAYER_ACTIONS.NEXT_TRACK });
  };

  const playPrevious = () => {
    dispatch({ type: PLAYER_ACTIONS.PREVIOUS_TRACK });
  };

  const value = {
    isPlaying: state.isPlaying,
    nowPlaying: state.nowPlaying,
    togglePlay,
    playNew,
    playNext,
    playPrevious,
  };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (context == undefined) {
    throw new Error("usePlayer must be used within PlayerContext");
  }
  return context;
};
