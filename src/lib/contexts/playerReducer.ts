import type { Song } from "@prisma/client";

export const PLAYER_ACTIONS = {
  PLAY_NEW: "play-new",
  TOGGLE_PLAY: "toggle-play",
  UPDATE_TRACK_LIST: "update-track-list",
  NEXT_TRACK: "next-track",
  PREVIOUS_TRACK: "previous-track",
} as const;

type ActionType = (typeof PLAYER_ACTIONS)[keyof typeof PLAYER_ACTIONS];

interface State {
  isPlaying: boolean;
  nowPlaying: Song | null;
  trackList: Song[] | null;
  currentTrack: number;
}

interface Action {
  type: ActionType;
  payload?: {
    song?: Song;
    trackList: Song[];
  };
}

export const initialState: State = {
  nowPlaying: null,
  trackList: null,
  isPlaying: false,
  currentTrack: 0,
};

export const playerReducer = (state: State, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case PLAYER_ACTIONS.PLAY_NEW:
      return {
        ...state,
        isPlaying: true,
        nowPlaying: payload?.song,
        trackList: payload?.trackList,
        currentTrack: payload?.trackList.findIndex(
          (el) => el.id === payload.song?.id,
        ),
      };
    case PLAYER_ACTIONS.TOGGLE_PLAY:
      return { ...state, isPlaying: !state.isPlaying };
    case PLAYER_ACTIONS.UPDATE_TRACK_LIST:
      return { ...state, trackList: action.payload?.trackList };
    case PLAYER_ACTIONS.NEXT_TRACK:
      if (!state.trackList) return { ...state };
      let nextIndex = state.currentTrack + 1;
      if (nextIndex < state.trackList.length) {
        return {
          ...state,
          nowPlaying: state.trackList[nextIndex],
          currentTrack: nextIndex,
          isPlaying: true,
        };
      } else {
        return { ...state, nowPlaying: state.trackList[0], currentTrack: 0 };
      }
    case PLAYER_ACTIONS.PREVIOUS_TRACK:
      if (!state.trackList) return { ...state };
      let previousIndex = state.currentTrack - 1;
      if (previousIndex >= 0) {
        return {
          ...state,
          nowPlaying: state.trackList[previousIndex],
          currentTrack: previousIndex,
        };
      } else {
        return {
          ...state,
          nowPlaying: state.trackList[0],
          currentTrack: 0,
          isPlaying: true,
        };
      }
    default:
      return state;
  }
};
