"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { ShieldCheck, Sparkles } from "lucide-react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";
const GITHUB_CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || "";
const GITHUB_OAUTH_STATE_KEY = "jobportal_github_oauth_state";

type OAuthProvider = "google" | "github";

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState("student");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [oauthInProgress, setOauthInProgress] = useState<OAuthProvider | null>(null);
  const [authError, setAuthError] = useState("");
  const [isGoogleReady, setIsGoogleReady] = useState(false);

  const redirectByRole = useCallback((inputRole?: string) => {
    const normalizedRole = inputRole === "jobseeker" ? "student" : inputRole;

    if (normalizedRole === "student") {
      router.push("/student");
      return;
    }

    if (normalizedRole === "recruiter") {
      router.push("/recruiter/dashboard");
      return;
    }

    if (normalizedRole === "staff") {
      router.push("/staff");
      return;
    }

    router.push("/");
  }, [router]);

  const handleAuthSuccess = useCallback((token: string, user: { role?: string }, fallbackRole: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    redirectByRole(user?.role || fallbackRole);
  }, [redirectByRole]);

  const completeOAuth = useCallback(async (provider: OAuthProvider, payload: Record<string, unknown>) => {
    setAuthError("");
    setOauthInProgress(provider);

    try {
      const endpoint = provider === "google" ? "/api/auth/oauth/google" : "/api/auth/oauth/github";
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let result: any = null;
      try {
        result = await response.json();
      } catch {
        result = null;
      }

      if (!response.ok) {
        throw new Error(result?.message || `${provider} signup failed`);
      }

      const user = result?.user || result?.registerdUser || result?.userObject;
      const token = result?.token;

      if (!user || !token) {
        throw new Error("Authentication response is incomplete");
      }

      handleAuthSuccess(token, user, role);
    } catch (error) {
      console.error(`${provider} signup error:`, error);
      setAuthError(error instanceof Error ? error.message : `${provider} signup failed`);
    } finally {
      setOauthInProgress(null);
    }
  }, [handleAuthSuccess, role]);

  useEffect(() => {
    const googleSDK = (window as any).google;

    if (googleSDK?.accounts?.oauth2?.initTokenClient) {
      setIsGoogleReady(true);
      return;
    }

    const existingScript = document.getElementById("google-identity-services");
    if (existingScript) {
      existingScript.addEventListener("load", () => setIsGoogleReady(true), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.id = "google-identity-services";
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => setIsGoogleReady(true);
    script.onerror = () => setAuthError("Google SDK failed to load");
    document.head.appendChild(script);

    return () => {
      script.onload = null;
      script.onerror = null;
    };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const state = params.get("state");

    if (!code || !state) {
      return;
    }

    window.history.replaceState({}, "", "/register");

    const storedStateRaw = sessionStorage.getItem(GITHUB_OAUTH_STATE_KEY);
    if (!storedStateRaw) {
      setAuthError("GitHub signup session expired. Please try again.");
      return;
    }

    sessionStorage.removeItem(GITHUB_OAUTH_STATE_KEY);

    try {
      const storedState = JSON.parse(storedStateRaw) as { state: string; role: string };

      if (storedState.state !== state) {
        setAuthError("GitHub signup validation failed. Please try again.");
        return;
      }

      void completeOAuth("github", {
        code,
        role: storedState.role || role,
      });
    } catch {
      setAuthError("GitHub signup state is invalid. Please retry.");
    }
  }, [completeOAuth, role]);

  const handleGoogleSignUp = () => {
    setAuthError("");

    if (!GOOGLE_CLIENT_ID) {
      setAuthError("Missing NEXT_PUBLIC_GOOGLE_CLIENT_ID");
      return;
    }

    const googleSDK = (window as any).google;

    if (!isGoogleReady || !googleSDK?.accounts?.oauth2?.initTokenClient) {
      setAuthError("Google SDK is not ready yet. Please retry.");
      return;
    }

    const tokenClient = googleSDK.accounts.oauth2.initTokenClient({
      client_id: GOOGLE_CLIENT_ID,
      scope: "openid email profile",
      callback: (response: { access_token?: string; error?: string }) => {
        if (response?.error || !response?.access_token) {
          setAuthError("Google authentication was cancelled or failed");
          setOauthInProgress(null);
          return;
        }

        void completeOAuth("google", {
          accessToken: response.access_token,
          role,
        });
      },
    });

    setOauthInProgress("google");
    tokenClient.requestAccessToken({ prompt: "consent" });
  };

  const handleGitHubSignUp = () => {
    setAuthError("");

    if (!GITHUB_CLIENT_ID) {
      setAuthError("Missing NEXT_PUBLIC_GITHUB_CLIENT_ID");
      return;
    }

    const stateToken =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

    sessionStorage.setItem(
      GITHUB_OAUTH_STATE_KEY,
      JSON.stringify({ state: stateToken, role })
    );

    const params = new URLSearchParams({
      client_id: GITHUB_CLIENT_ID,
      scope: "read:user user:email",
      state: stateToken,
      redirect_uri: `${window.location.origin}/register`,
    });

    window.location.assign(`https://github.com/login/oauth/authorize?${params.toString()}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const firstName = String(formData.get("firstName") || "").trim();
    const lastName = String(formData.get("lastName") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "").trim();
    const name = `${firstName} ${lastName}`.trim();
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
        }),
      });

      let result: any = null;
      try {
        result = await response.json();
      } catch {
        result = null;
      }

      if (!response.ok) {
        throw new Error(result?.message || "Registration failed");
      }

      const user = result?.registerdUser || result?.user || result?.userObject;
      const token = result?.token;

      if (!token || !user) {
        throw new Error("Registration response is incomplete");
      }

      handleAuthSuccess(token, user, role);
    } catch (err) {
      console.error("Registration error:", err);
      setAuthError(err instanceof Error ? err.message : "Failed to connect to the server");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex relative overflow-hidden">
      {/* ... ambient blobs ... */}
      <div className="fixed -top-24 -left-24 w-96 h-96 bg-[#c3c0ff]/20 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="fixed -bottom-24 -right-24 w-96 h-96 bg-[#ffdbcc]/20 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Left brand panel */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[40%] flex-col justify-between p-14 signature-gradient relative overflow-hidden">
        {/* ... (keep existing left panel code) ... */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute bottom-1/4 -right-20 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
        </div>
        
        <div className="text-2xl font-black tracking-tighter text-white relative z-10">CareerArchitect</div>
        
        <div className="space-y-12 relative z-10">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight" style={{letterSpacing: '-0.02em'}}>
              Build your<br />professional legacy<br />with editorial precision.
            </h1>
            <p className="text-white/80 leading-relaxed text-lg">
              A high-performance career engine designed for the next generation of students, recruiters, and academic staff.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 shrink-0 flex items-center justify-center backdrop-blur-sm">
                <Sparkles className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">AI-Powered Insights</h3>
                <p className="text-white/70 text-sm mt-1">Match your skills with enterprise-level roles instantly.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 shrink-0 flex items-center justify-center backdrop-blur-sm">
                <ShieldCheck className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Verified Network</h3>
                <p className="text-white/70 text-sm mt-1">Join a secure ecosystem of academic and professional talent.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-xs text-white/40 relative z-10 flex gap-4">
          <a href="#" className="hover:text-white/80 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white/80 transition-colors">Privacy Policy</a>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex flex-col items-center h-screen overflow-y-auto">
        <div className="w-full max-w-md flex flex-col gap-6 px-6 py-10 md:py-14">
          {/* Mobile logo */}
          <div className="lg:hidden text-2xl font-black tracking-tighter text-[#3525cd] mb-6">CareerArchitect</div>

          <div className="space-y-1">
            <h2 className="text-3xl font-extrabold tracking-tight text-on-surface" style={{letterSpacing: '-0.02em'}}>Create your account</h2>
            <p className="text-on-surface-variant">Select your role and start your journey today.</p>
          </div>

          {/* OAuth buttons */}
          <div className="space-y-3">
            <button
              onClick={handleGoogleSignUp}
              id="google-register-btn"
              type="button"
              disabled={oauthInProgress !== null || isSubmitting}
              className="w-full h-13 px-5 rounded-xl bg-surface-container-lowest border border-outline-variant/40 flex items-center justify-center gap-3 font-semibold text-sm text-on-surface hover:bg-surface-container-low hover:shadow-md transition-all"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              {oauthInProgress === "google" ? "Connecting Google..." : "Continue with Google"}
            </button>

            <button
              onClick={handleGitHubSignUp}
              id="github-register-btn"
              type="button"
              disabled={oauthInProgress !== null || isSubmitting}
              className="w-full h-13 px-5 rounded-xl bg-[#24292e] flex items-center justify-center gap-3 font-semibold text-sm text-white hover:bg-[#1a1f24] hover:shadow-md transition-all"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
              {oauthInProgress === "github" ? "Connecting GitHub..." : "Continue with GitHub"}
            </button>
          </div>

          {authError && (
            <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {authError}
            </p>
          )}

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-outline-variant/30" />
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">or register manually</span>
            <div className="flex-1 h-px bg-outline-variant/30" />
          </div>

          <form className="space-y-4" id="register-form" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest px-1">Account Role</label>
              <div className="grid grid-cols-3 gap-2">
                {["Student", "Recruiter", "Staff"].map((r) => (
                  <label key={r} className="cursor-pointer">
                    <input 
                      type="radio" 
                      name="role" 
                      value={r.toLowerCase()} 
                      className="peer sr-only" 
                      checked={role === r.toLowerCase()}
                      onChange={() => setRole(r.toLowerCase())}
                    />
                    <div className="h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-xs font-semibold text-on-surface-variant peer-checked:bg-primary-fixed peer-checked:text-primary transition-all hover:bg-surface-container">
                      {r}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="firstName" className="text-xs font-bold text-on-surface-variant uppercase tracking-widest px-1">First Name</label>
                <input id="firstName" name="firstName" type="text" required placeholder="Alex" className="w-full h-12 px-4 rounded-xl bg-surface-container-low focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all text-sm text-on-surface font-medium placeholder:text-outline/50 outline-none border-none" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="lastName" className="text-xs font-bold text-on-surface-variant uppercase tracking-widest px-1">Last Name</label>
                <input id="lastName" name="lastName" type="text" required placeholder="Johnson" className="w-full h-12 px-4 rounded-xl bg-surface-container-low focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all text-sm text-on-surface font-medium placeholder:text-outline/50 outline-none border-none" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs font-bold text-on-surface-variant uppercase tracking-widest px-1">Email Address</label>
              <input id="email" name="email" type="email" required placeholder="you@example.com" className="w-full h-12 px-4 rounded-xl bg-surface-container-low focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all text-sm text-on-surface font-medium placeholder:text-outline/50 outline-none border-none" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-xs font-bold text-on-surface-variant uppercase tracking-widest px-1">Password</label>
              <input id="password" name="password" type="password" required placeholder="••••••••" className="w-full h-12 px-4 rounded-xl bg-surface-container-low focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all text-sm text-on-surface font-medium placeholder:text-outline/50 outline-none border-none" />
            </div>

            <button
              id="register-submit-btn"
              type="submit"
              disabled={isSubmitting || oauthInProgress !== null}
              className="w-full h-14 mt-4 rounded-full text-white font-bold text-sm signature-gradient shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all"
            >
              {isSubmitting ? "Creating Account..." : "Start Your Journey"}
            </button>
          </form>

          <p className="text-center text-sm text-on-surface-variant border-t border-outline-variant/20 pt-6">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-primary hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="fixed bottom-0 left-0 right-0 h-1 signature-gradient z-50" />
    </div>
  );
}
