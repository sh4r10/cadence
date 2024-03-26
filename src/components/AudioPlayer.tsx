"use client";

export function AudioPlayer({ song }: { song: string }) {
  return (
    <audio controls preload="none">
      <source src={`/play/${song}`} type="audio/mpeg" />
    </audio>
  );
}
