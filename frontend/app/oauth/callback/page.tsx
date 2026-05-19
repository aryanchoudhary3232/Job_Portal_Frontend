"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { roleRouteMap, setSession } from "@/lib/session";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

function OAuthCallbackHandler() {
  const router = useRouter();
  const params = useSearchParams();
  const [message, setMessage] = useState("Completing sign in...");

  useEffect(() => {
    const token = params.get("token");
    const error = params.get("error");
    if (error) {
      setMessage(decodeURIComponent(error));
      return;
    }
    if (!token) {
      setMessage("Missing sign-in token. Please try again.");
      return;
    }
    fetch(`${baseUrl}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then(async (response) => {
        const payload = await response.json();
        if (!response.ok) {
          throw new Error(payload.message || "OAuth sign-in failed");
        }
        return payload.data;
      })
      .then((user) => {
        setSession(token, user);
        router.replace((roleRouteMap as any)[user.role] || "/student");
      })
      .catch((err) => {
        setMessage(err instanceof Error ? err.message : "OAuth sign-in failed");
      });
  }, [params, router]);

  return (
    <div className="card-surface rounded-[28px] p-8 text-center">
      <p className="text-sm font-semibold text-[var(--on-surface-variant)]">{message}</p>
    </div>
  );
}

export default function OAuthCallbackPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl items-center justify-center px-6">
      <Suspense fallback={
        <div className="card-surface rounded-[28px] p-8 text-center">
          <p className="text-sm font-semibold text-[var(--on-surface-variant)]">Completing sign in...</p>
        </div>
      }>
        <OAuthCallbackHandler />
      </Suspense>
    </main>
  );
}
