"use client";
import { ReactNode, useReducer } from "react";
import { PLAYER_ACTIONS, initialState, playerReducer } from "./playerReducer";
import type { Song } from "@prisma/client";
import { PlayerContext } from "./PlayerContext";

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(playerReducer, initialState);

  const togglePlay = () => {
    dispatch({ type: PLAYER_ACTIONS.TOGGLE_PLAY });
  };

  const playNew = (song: number, trackList: Song[]) => {
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
