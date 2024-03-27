import type { Song } from "@prisma/client";

export const PLAYER_ACTIONS = {
  PLAY_NEW: "play-new",
  TOGGLE_PLAY: "toggle-play",
} as const;

type ActionType = (typeof PLAYER_ACTIONS)[keyof typeof PLAYER_ACTIONS];

interface State {
  isPlaying: boolean;
  nowPlaying: Song | null;
}

interface Action {
  type: ActionType;
  payload?: {
    song: Song;
  };
}

export const initialState: State = {
  nowPlaying: null,
  isPlaying: false,
};

export const playerReducer = (state: State, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case PLAYER_ACTIONS.PLAY_NEW:
      return { ...state, isPlaying: true, nowPlaying: payload?.song };
    case PLAYER_ACTIONS.TOGGLE_PLAY:
      return { ...state, isPlaying: !state.isPlaying };
    default:
      return state;
  }
};
