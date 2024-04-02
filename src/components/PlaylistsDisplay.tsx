"use client";
import type { Playlist } from "@prisma/client";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";

export function PlaylistsDisplay({ playlists }: { playlists: Playlist[] }) {
  return (
    <div className="py-16 flex gap-5 flex-wrap justify-center w-2/3 m-auto">
      <Table>
        <TableBody>
          {playlists.map((playlist) => (
            <TableRow key={playlist.id}>
              <TableCell>
                <Link className="w-full" href={`/playlists/${playlist.id}`}>
                  {playlist.name}
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
