"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ListMusicIcon, LucideIcon, Music2Icon } from "lucide-react";

function IconWrapper({ name }: { name: string }) {
  const IconComponent: LucideIcon | undefined = {
    music2: Music2Icon,
    listMusic: ListMusicIcon,
  }[name];

  if (!IconComponent) {
    console.error(`No icon found for ${name}`);
    return null;
  }

  return <IconComponent size={16} />;
}

export function SidebarLink({
  link,
}: {
  link: {
    name: string;
    href: string;
    icon: string;
  };
}) {
  const pathname = usePathname();
  const active = link.href === pathname;
  return (
    <Link
      key={link.href}
      href={link.href}
      className={clsx(
        "w-full flex items-center justify-start p-2 gap-2 text-sm hover:bg-gray-100 rounded mb-1",
        {
          "bg-gray-100 hover:bg-gray-100": active,
        },
      )}
    >
      <IconWrapper name={link.icon} />
      <p>{link.name}</p>
    </Link>
  );
}
