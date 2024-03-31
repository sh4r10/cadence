"use client";
import { usePlayer } from "@/lib/contexts/PlayerContext";
import { useEffect, useRef, useState } from "react";
import { Slider } from "./ui/slider";
import {
  PauseIcon,
  PlayIcon,
  SkipBack,
  SkipForward,
  Volume1,
  Volume2,
  VolumeX,
} from "lucide-react";

export function AudioPlayer() {
  const { isPlaying, nowPlaying, togglePlay } = usePlayer();
  const playerRef = useRef<HTMLAudioElement>(null);
  const [currTime, setCurrTime] = useState<number>(0);
  const [volume, setVolume] = useState<number>(
    Number(localStorage.getItem("volume")) || 100,
  );

  useEffect(() => {
    console.log("hello");
    if (playerRef.current && isPlaying && nowPlaying != null) {
      if (!playerRef.current.src.includes(nowPlaying.id)) {
        playerRef.current.src = `/play/${nowPlaying?.id}`;
      }
      playerRef.current.volume = volume / 100;
      playerRef.current.play();
    } else if (playerRef.current) {
      playerRef?.current.pause();
    }
  }, [isPlaying, nowPlaying, volume]);

  const getStep = (currValue: number) => {
    if (playerRef.current && nowPlaying !== null) {
      const time = (currValue / playerRef.current.duration) * 100;
      if (Number.isNaN(time)) return 0;
      return time;
    }
    return 0;
  };

  const updateStep = (interval: number[]) => {
    if (!playerRef.current || nowPlaying === null) return;
    const step = interval[0];
    const time = (step / 100) * playerRef.current?.duration;
    playerRef.current.currentTime = time;
    setCurrTime(time);
  };

  const updateVolume = (interval: number[]) => {
    localStorage.setItem("volume", interval[0].toString());
    setVolume(interval[0]);
  };

  const formatTime = (time: number | undefined) => {
    // TODO: add hours
    // TODO: weird bug where 00:60 shows up for a short amount
    if (!time) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.round(time % 60);
    const minutesFormatted = minutes <= 9 ? "0" + minutes : "" + minutes;
    const secondsFormatted = seconds <= 9 ? "0" + seconds : "" + seconds;
    return minutesFormatted + ":" + secondsFormatted;
  };

  return (
    <>
      {nowPlaying && (
        <div className="w-full fixed flex align-center justify-between bg-black text-white bottom-0 left-0 py-3 px-5">
          <div className="flex flex-col justify-center items-start">
            <p className="text-gray-400 text-xs">Now Playing</p>
            <p className="text-gray-300">
              {nowPlaying?.title} • {nowPlaying?.artist}
            </p>
          </div>
          <div className="w-1/3 flex flex-col gap-2 items-center justify-center">
            <div className="w-full gap-8 flex flex-row items-center justify-center">
              <button>
                <SkipBack />
              </button>
              <button onClick={togglePlay}>
                {!isPlaying ? (
                  <PlayIcon fill="white" />
                ) : (
                  <PauseIcon fill="white" />
                )}
              </button>
              <button>
                <SkipForward />
              </button>
            </div>
            <div className="gap-1 w-full flex flex-row items-center justify-between">
              <p className="text-xs font-mono">
                {formatTime(playerRef.current?.currentTime)}
              </p>
              <Slider
                defaultValue={[0]}
                value={[getStep(currTime)]}
                max={100}
                step={1}
                onValueChange={updateStep}
              />
              <p className="text-xs font-mono">
                {formatTime(playerRef.current?.duration)}
              </p>
            </div>
          </div>
          <div className="gap-1 w-44 flex items-center justify-end">
            {volume === 0 ? (
              <VolumeX />
            ) : volume <= 40 ? (
              <Volume1 />
            ) : (
              <Volume2 />
            )}
            <Slider
              defaultValue={[0]}
              value={[volume]}
              max={100}
              step={1}
              onValueChange={updateVolume}
            />
          </div>
        </div>
      )}
      <audio
        onTimeUpdate={() => setCurrTime(playerRef.current?.currentTime ?? 0)}
        preload="none"
        ref={playerRef}
      ></audio>
    </>
  );
}
