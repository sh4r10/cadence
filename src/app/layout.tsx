import type { Metadata } from "next";
// import { Manrope } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AudioPlayer } from "@/components/AudioPlayer";
import { Sidebar } from "@/components/Sidebar";
import { PlayerProvider } from "@/lib/contexts/PlayerProvider";

// const ope = Manrope({
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
          "min-h-screen bg-background antialiased",
          GeistSans.className,
        )}
      >
        <PlayerProvider>
          <div className="flex">
            <Sidebar />
            {children}
          </div>
          <AudioPlayer />
        </PlayerProvider>
      </body>
    </html>
  );
}
