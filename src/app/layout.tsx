import type { Metadata } from "next";
// import { Manrope } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { cn } from "@/lib/utils";
import { PlayerProvider } from "@/lib/contexts/PlayerContext";
import { AudioPlayer } from "@/components/AudioPlayer";

// const manrope = Manrope({
//   weight: ["400", "700"],
//   subsets: ["latin"],
//   variable: "--font-sans",
// });

export const metadata: Metadata = {
  title: {
    template: "%s | Cadence",
    default: "Cadence",
  },
  description: "Host your own music!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          GeistSans.className,
        )}
      >
        <PlayerProvider>
          {children}
          <AudioPlayer />
        </PlayerProvider>
      </body>
    </html>
  );
}
