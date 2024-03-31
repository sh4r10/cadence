"use client";

import clsx from "clsx";
import { ListMusicIcon, LucideIcon, Music2Icon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface LinkType {
  name: string;
  icon: LucideIcon;
  href: string;
}

interface SectionsType {
  [key: string]: LinkType[];
}

const sections: SectionsType = {
  "Your Library": [
    {
      name: "Songs",
      icon: Music2Icon,
      href: "/",
    },
    {
      name: "Playlists",
      icon: ListMusicIcon,
      href: "/playlists",
    },
  ],
};

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="h-screen w-80 border-r-2 py-10 px-6">
      <div className="w-full">
        {Object.keys(sections).map((key) => {
          return (
            <>
              <p key={key} className="font-semibold text-xl mr-2 mb-4">
                {key}
              </p>
              {sections[key].map((link, i) => {
                const active = link.href === pathname;
                return (
                  <Link
                    key={link.href + i}
                    href={link.href}
                    className={clsx(
                      "w-full flex items-center justify-start p-2 gap-2 text-sm hover:bg-gray-100 rounded mb-1",
                      {
                        "bg-gray-100 hover:bg-gray-100": active,
                      },
                    )}
                  >
                    <link.icon key={link.href + "icon" + i} size={16} />
                    <p key={link.name + i}>{link.name}</p>
                  </Link>
                );
              })}
            </>
          );
        })}
      </div>
    </aside>
  );
}
