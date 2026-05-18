"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { roleRouteMap } from "@/lib/session";
import type { Role, User } from "@/lib/types";
import { PageState } from "./PageState";
import { PortalHeader } from "./PortalHeader";
import { PortalSidebar } from "./PortalSidebar";

export function PortalLayout({
  role,
  title,
  children,
}: {
  role: Role;
  title: string;
  children: ReactNode | ((user: User) => ReactNode);
}) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<User>("/api/auth/me")
      .then((profile) => {
        if (profile.role !== role) {
          router.replace(roleRouteMap[profile.role]);
          return;
        }
        setUser(profile);
      })
      .catch((response) => {
        setError(response instanceof Error ? response.message : "Session expired");
        router.replace("/login");
      })
      .finally(() => setLoading(false));
  }, [role, router]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(91,76,241,0.08),_transparent_24%),linear-gradient(180deg,#f7f8fc_0%,#f5f7fb_100%)]">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <PortalSidebar role={role} user={user} />
        <main className="min-w-0 flex-1 px-4 py-4 sm:px-6 xl:px-10">
          <PortalHeader title={title} user={user} />
          <PageState loading={loading} error={error} />
          {!loading && !error && user ? (typeof children === "function" ? children(user) : children) : null}
        </main>
      </div>
    </div>
  );
}
