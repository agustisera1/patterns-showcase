"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ArrowUpRight,
  ClipboardList,
  ShieldCheck,
  BarChart2,
} from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem =
  | { label: string; href: string; icon: React.ElementType; items?: never }
  | { label: string; href?: never; icon?: never; items: { label: string; href: string; icon: React.ElementType }[] };

const nav: NavItem[] = [
  { label: "Overview", href: "/", icon: LayoutDashboard },
  {
    label: "Payments",
    items: [
      { label: "Request", href: "/payments/request", icon: ArrowUpRight },
      { label: "History", href: "/payments/history", icon: ClipboardList },
    ],
  },
  { label: "Checks", href: "/checks", icon: ShieldCheck },
  { label: "Analytics", href: "/analytics", icon: BarChart2 },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0 border-r bg-card flex flex-col min-h-screen">
      <div className="px-5 py-5 border-b">
        <span className="font-semibold text-sm tracking-tight">FinPay</span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {nav.map((item) => {
          if (Array.isArray(item.items)) {
            return (
              <div key={item.label} className="pt-2">
                <p className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {item.label}
                </p>
                {item.items.map((sub) => (
                  <NavLink key={sub.href} href={sub.href} pathname={pathname} icon={sub.icon}>
                    {sub.label}
                  </NavLink>
                ))}
              </div>
            );
          }
          if (!item.href || !item.icon) return null;
          return (
            <NavLink key={item.href} href={item.href} pathname={pathname} icon={item.icon}>
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

function NavLink({
  href,
  pathname,
  icon: Icon,
  children,
}: {
  href: string;
  pathname: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  const active = pathname === href;
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm transition-colors",
        active
          ? "bg-accent text-accent-foreground font-medium"
          : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
      )}
    >
      <Icon className="size-4 shrink-0" />
      {children}
    </Link>
  );
}
