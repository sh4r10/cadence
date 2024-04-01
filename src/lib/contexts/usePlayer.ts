import { useContext } from "react";
import { PlayerContext } from "./PlayerContext";

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (context == undefined) {
    throw new Error("usePlayer must be used within PlayerContext");
  }
  return context;
};
