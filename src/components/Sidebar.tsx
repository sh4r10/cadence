"use server";

import { getTop5Playlists } from "@/lib/data";
import { SidebarLink } from "./ui/sidebar-link";

interface LinkType {
  name: string;
  icon: string;
  href: string;
}

interface SectionsType {
  [key: string]: LinkType[];
}

const sections: SectionsType = {
  "Your Library": [
    {
      name: "Songs",
      icon: "music2",
      href: "/",
    },
    {
      name: "Playlists",
      icon: "listMusic",
      href: "/playlists",
    },
  ],
};

export async function Sidebar() {
  const playlists = await getTop5Playlists();
  return (
    <aside className="h-screen max-w-80 w-full border-r-2 py-10 px-6">
      <div className="w-full">
        {Object.keys(sections).map((key) => {
          return (
            <div key={key}>
              <p className="font-semibold text-xl mr-2 mb-4">{key}</p>
              {sections[key].map((link) => (
                <SidebarLink key={link.href} link={link} />
              ))}
            </div>
          );
        })}
        <div>
          <p className="font-semibold text-xl mr-2 mb-4 mt-10">Playlists</p>
          {playlists.map((playlist) => (
            <SidebarLink
              key={playlist.id}
              link={{
                name: playlist.name,
                href: `/playlists/${playlist.id}`,
                icon: "listMusic",
              }}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}
