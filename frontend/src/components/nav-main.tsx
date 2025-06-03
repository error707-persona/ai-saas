"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  CreditCardIcon,
  Frame,
  Image,
  Images,
  Layers,
  Settings2,
  SquareTerminal,
} from "lucide-react";

const navItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: SquareTerminal,
  },
  {
    title: "Generate Image",
    url: "/image-generation",
    icon: Image,
  },
  {
    title: "My Model",
    url: "/models",
    icon: Frame,
  },
  {
    title: "Train model",
    url: "/model-training",
    icon: Layers,
  },
  {
    title: "My Images",
    url: "/gallery",
    icon: Images,
  },
  {
    title: "Billing",
    url: "/billing",
    icon: CreditCardIcon,
  },
  {
    title: "Settings",
    url: "/account-settings",
    icon: Settings2,
  },
];

export function NavMain() {
  const pathname = usePathname();
  return (
    <SidebarGroup>
      <SidebarMenu>
        {navItems.map((item) => (
          <Link
            href={item.url}
            className={cn(
              "rounded-none",
              pathname === item.url
                ? "text-prmary bg-primary/5"
                : "text-muted-foreground"
            )}
          >
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Link>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
