import { usePlayer } from "@/lib/contexts/PlayerContext";
import { useEffect, useRef } from "react";

export function AudioPlayer() {
  const { isPlaying, nowPlaying, togglePlay } = usePlayer();
  const playerRef = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    if (playerRef.current && isPlaying && nowPlaying != null) {
      playerRef.current.src = `/play/${nowPlaying?.id}`;
      playerRef?.current.play();
    } else if (playerRef.current) {
      playerRef?.current.pause();
    }
  }, [isPlaying, nowPlaying]);
  return (
    <>
      {nowPlaying && (
        <div className="w-full fixed bg-black text-white bottom-0 left-0 py-3 px-5">
          <div className="flex flex-col justify-center align-start">
            <p className="text-gray-400 text-xs">Now Playing</p>
            <p className="text-gray-300">
              {nowPlaying?.title} • {nowPlaying?.artist}
            </p>
          </div>
        </div>
      )}
      <audio preload="none" ref={playerRef}></audio>;
    </>
  );
}
