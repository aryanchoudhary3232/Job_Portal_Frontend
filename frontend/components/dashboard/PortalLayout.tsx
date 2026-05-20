"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { roleLoginRouteMap, roleRouteMap } from "@/lib/session";
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
        router.replace(roleLoginRouteMap[role]);
      })
      .finally(() => setLoading(false));
  }, [role, router]);

  return (
    <div className="min-h-screen portal-shell">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <PortalSidebar role={role} user={user} />
        <main className="min-w-0 flex-1 px-4 py-4 sm:px-6 xl:px-10">
          <PortalHeader title={title} user={user} />
          {user && !user.isEmailVerified && (
            <div className="mb-6 flex items-center justify-between gap-4 rounded-[20px] border border-amber-200/40 bg-gradient-to-r from-amber-50 to-amber-100/60 p-4 text-amber-900 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-200/60 text-base">⚠️</span>
                <div>
                  <h4 className="text-sm font-extrabold tracking-tight">Verify Your Email Address</h4>
                  <p className="text-xs font-semibold text-amber-800/80">We sent a verification link to <strong className="text-amber-900">{user.email}</strong>. Please verify to unlock full features.</p>
                </div>
              </div>
            </div>
          )}
          <PageState loading={loading} error={error} />
          {!loading && !error && user ? (typeof children === "function" ? children(user) : children) : null}
        </main>
      </div>
    </div>
  );
}
