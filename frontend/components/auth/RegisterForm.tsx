"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { api } from "@/lib/api";
import { setSession } from "@/lib/session";
import type { User } from "@/lib/types";

export function RegisterForm() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  // Wizard Step: 1 = Mobile OTP, 2 = Basic Details (+ Email OTP), 3 = Congratulations
  const [step, setStep] = useState(1);

  // Fields
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Mobile OTP State
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState("");

  // Email OTP Modal State
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailOtpCode, setEmailOtpCode] = useState<string[]>(Array(6).fill(""));
  const [emailResendTimer, setEmailResendTimer] = useState(46);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [emailOtpError, setEmailOtpError] = useState("");

  const inputRefs = useRef<HTMLInputElement[]>([]);
  const oauthBaseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000") + "/api/auth/oauth";

  // ─── Mobile OTP Handlers ───────────────────────────────
  const handleSendOtp = async () => {
    if (!phone || phone.length < 10) {
      setOtpError("Please enter a valid 10-digit mobile number.");
      return;
    }
    setOtpError("");
    try {
      const res = await api.post<{ success: boolean; code?: string }>("/api/auth/otp/send", { phone });
      setOtpSent(true);
      if (res.code) {
        setOtpError(`[Dev Mode] OTP Code: ${res.code}`);
      }
    } catch (err) {
      setOtpError(err instanceof Error ? err.message : "Failed to send OTP");
    }
  };

  const handleVerifyOtp = async () => {
    if (!otpCode || otpCode.length < 4) {
      setOtpError("Please enter the 4-digit OTP.");
      return;
    }
    setOtpError("");
    try {
      await api.post("/api/auth/otp/verify", { phone, code: otpCode });
      setOtpVerified(true);
      setStep(2);
    } catch (err) {
      setOtpError(err instanceof Error ? err.message : "Invalid OTP");
    }
  };

  // ─── Email OTP Handlers ────────────────────────────────
  const handleSendEmailOtp = async () => {
    setEmailOtpError("");
    try {
      const res = await api.post<{ success: boolean; code?: string }>("/api/auth/email-otp/send", { email });
      setShowEmailModal(true);
      setEmailResendTimer(46);
      setEmailOtpCode(Array(6).fill(""));
      if (res.code) {
        setEmailOtpError(`[Dev Mode] Email OTP: ${res.code}`);
      }
    } catch (err) {
      setEmailOtpError(err instanceof Error ? err.message : "Failed to send email OTP");
      setShowEmailModal(true);
    }
  };

  const handleVerifyEmailOtp = async () => {
    const code = emailOtpCode.join("");
    if (code.length < 6) {
      setEmailOtpError("Please enter the full 6-digit code.");
      return;
    }
    setEmailOtpError("");
    setBusy(true);
    try {
      await api.post("/api/auth/email-otp/verify", { email, code });
      setShowEmailModal(false);
      // Proceed to register
      await handleFinalRegister();
    } catch (err) {
      setEmailOtpError(err instanceof Error ? err.message : "Invalid code");
    } finally {
      setBusy(false);
    }
  };

  // ─── Submit Basic Details (triggers email OTP) ─────────
  const handleBasicDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!fullName || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    await handleSendEmailOtp();
  };

  // ─── Final Registration ────────────────────────────────
  const handleFinalRegister = async () => {
    setError("");
    setBusy(true);
    try {
      const res = await api.post<{ accessToken: string; user: User }>("/api/auth/register", {
        fullName,
        email,
        password,
        role: "STUDENT",
        phone,
        isEmailVerified: true,
      });
      setSession(res.accessToken, res.user);
      setStep(3); // Congratulations

      setTimeout(() => {
        router.push("/student");
      }, 3500);
    } catch (response) {
      const rawMessage = response instanceof Error ? response.message : "";
      if (
        rawMessage.toLowerCase().includes("prisma") ||
        rawMessage.toLowerCase().includes("invocation") ||
        rawMessage.toLowerCase().includes("database") ||
        rawMessage.toLowerCase().includes("passwordhash") ||
        rawMessage.toLowerCase().includes("unexpected error") ||
        rawMessage.toLowerCase().includes("failed to fetch")
      ) {
        setError("Something went wrong on our end. Please try again later.");
      } else {
        setError(rawMessage || "Registration failed");
      }
      // Re-show modal so user can retry
      setShowEmailModal(false);
    } finally {
      setBusy(false);
    }
  };

  // ─── Email OTP Timer ───────────────────────────────────
  useEffect(() => {
    if (!showEmailModal || emailResendTimer <= 0) return;
    const id = setInterval(() => setEmailResendTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [showEmailModal, emailResendTimer]);

  // ─── Email OTP digit input handler ─────────────────────
  const handleEmailDigitChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const updated = [...emailOtpCode];
    updated[index] = value;
    setEmailOtpCode(updated);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };
  const handleEmailDigitKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !emailOtpCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <>
      <div className="w-full max-w-md space-y-5">

        {/* Progress Tracker (hide on congratulations) */}
        {step < 3 && (
          <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <span className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${
                otpVerified ? "bg-green-600 text-white" : "bg-[var(--primary)] text-white"
              }`}>
                {otpVerified ? "✓" : "1"}
              </span>
              <span className={`text-[10px] font-bold uppercase tracking-wider ${
                otpVerified ? "text-green-700" : "text-[var(--primary)]"
              }`}>Mobile Verify</span>
            </div>
            <span className="h-px w-8 bg-slate-200" />
            <div className="flex items-center gap-2">
              <span className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${
                step >= 2 ? "bg-[var(--primary)] text-white" : "bg-slate-100 text-slate-400"
              }`}>
                2
              </span>
              <span className={`text-[10px] font-bold uppercase tracking-wider ${
                step >= 2 ? "text-slate-700" : "text-slate-400"
              }`}>Basic details</span>
            </div>
          </div>
        )}

        {/* Header */}
        {step < 3 && (
          <div>
            <div className="lg:hidden">
              <Image src="/logo-wordmark.svg" alt="NCRJobs" width={160} height={40} className="h-10 w-auto" />
            </div>
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.24em] text-[var(--on-surface-variant)]">Student registration</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[var(--on-surface)] font-display">
              {step === 1 ? "Verify Mobile" : "Create your student profile"}
            </h2>
            {step === 1 && (
              <p className="text-xs text-[var(--on-surface-variant)] mt-1 font-semibold leading-relaxed">
                We&apos;ll send you a verification code to confirm your identity
              </p>
            )}
            {step === 2 && (
              <p className="text-xs text-[var(--on-surface-variant)] mt-1 font-semibold leading-relaxed">
                Enter your details and verify email to complete registration
              </p>
            )}
          </div>
        )}

        {error ? <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p> : null}

        {/* ══════════════════ STEP 1: MOBILE OTP ══════════════════ */}
        {step === 1 && (
          <div className="space-y-5">
            <div className="block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-[0.24em] text-[var(--on-surface-variant)]">Mobile Number</span>
              <div className="flex gap-2">
                <span className="flex items-center justify-center h-12 rounded-xl bg-[var(--surface-container-low)] px-3 text-sm font-semibold text-[var(--on-surface)]">+91</span>
                <input
                  type="tel"
                  maxLength={10}
                  placeholder="98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  className="h-12 flex-1 rounded-xl bg-[var(--surface-container-low)] px-4 text-sm text-[var(--on-surface)] outline-none transition focus:ring-2 focus:ring-[var(--primary)]"
                  disabled={otpVerified}
                />
              </div>
            </div>

            {otpSent && !otpVerified && (
              <div className="block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-[0.24em] text-[var(--on-surface-variant)]">Enter OTP</span>
                <input
                  type="text"
                  maxLength={4}
                  placeholder="4-digit OTP"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                  className="h-12 w-full rounded-xl bg-[var(--surface-container-low)] px-4 text-sm text-[var(--on-surface)] outline-none transition focus:ring-2 focus:ring-[var(--primary)]"
                />
              </div>
            )}

            {otpError && (
              <p className={`text-xs font-semibold px-1 ${otpError.includes("[Dev Mode]") ? "text-amber-600" : "text-red-600"}`}>
                {otpError}
              </p>
            )}

            {!otpSent ? (
              <button
                onClick={handleSendOtp}
                className="signature-gradient w-full rounded-full px-5 py-3.5 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5"
              >
                Send OTP
              </button>
            ) : !otpVerified ? (
              <div className="flex gap-3">
                <button
                  onClick={handleVerifyOtp}
                  className="signature-gradient flex-1 rounded-full px-5 py-3.5 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5"
                >
                  Verify OTP
                </button>
                <button
                  onClick={handleSendOtp}
                  className="flex-1 rounded-full border border-slate-200 bg-white px-5 py-3.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
                >
                  Resend
                </button>
              </div>
            ) : null}
          </div>
        )}

        {/* ══════════════════ STEP 2: BASIC DETAILS ══════════════════ */}
        {step === 2 && (
          <form onSubmit={handleBasicDetailsSubmit} className="space-y-4">
            {/* Social login buttons */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={`${oauthBaseUrl}/google`}
                className="group relative flex items-center justify-center gap-2.5 rounded-2xl border border-[var(--outline-variant)] bg-white px-4 py-3 text-sm font-semibold text-[var(--on-surface)] shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#4285F4]/40 hover:shadow-[0_8px_24px_rgba(66,133,244,0.18)] overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-br from-[#4285F4]/5 to-[#34A853]/5 opacity-0 transition-opacity duration-200 group-hover:opacity-100 rounded-2xl" />
                <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="relative z-10 flex-shrink-0">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="relative z-10">Google</span>
              </a>
              <a
                href={`${oauthBaseUrl}/github`}
                style={{ backgroundColor: "#24292e", color: "#ffffff", border: "1px solid #444c56" }}
                className="group relative flex items-center justify-center gap-2.5 rounded-2xl px-4 py-3 text-sm font-semibold shadow-[0_4px_16px_rgba(0,0,0,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.32)] overflow-hidden"
              >
                <span className="absolute inset-0 bg-white/5 opacity-0 transition-opacity duration-200 group-hover:opacity-100 rounded-2xl" />
                <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="relative z-10 flex-shrink-0" style={{ fill: "#ffffff" }}>
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
                <span className="relative z-10" style={{ color: "#ffffff" }}>GitHub</span>
              </a>
            </div>

            {/* OR divider */}
            <div className="flex items-center gap-3">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[var(--outline-variant)]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--on-surface-variant)]">or continue with email</span>
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[var(--outline-variant)]" />
            </div>

            <Field label="Full name" name="fullName" placeholder="What is your name?" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            <Field label="Email ID" name="email" placeholder="Tell us your Email ID" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Field label="Password" name="password" placeholder="Minimum 6 characters" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <button
              type="submit"
              className="signature-gradient w-full rounded-full px-5 py-3.5 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5"
              disabled={busy}
            >
              {busy ? "Verifying..." : "Verify Email & Register"}
            </button>
          </form>
        )}

        {/* ══════════════════ STEP 3: CONGRATULATIONS ══════════════════ */}
        {step === 3 && (
          <div className="flex flex-col items-center justify-center text-center py-10 animate-in zoom-in-95 duration-500">
            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-green-100/50">
              <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-[var(--on-surface)] font-display mb-3">
              Welcome aboard! 🎉
            </h2>
            <p className="text-sm font-semibold text-[var(--on-surface-variant)] leading-relaxed max-w-sm mb-10">
              Your student profile has been successfully created on NCRJobs. You are now being redirected to your dashboard.
            </p>
            <div className="flex gap-3 items-center">
              <div className="w-5 h-5 border-4 border-slate-200 border-t-[var(--primary)] rounded-full animate-spin"></div>
              <span className="text-xs font-bold text-slate-400 tracking-widest uppercase">Redirecting...</span>
            </div>
          </div>
        )}

        {step < 3 && (
          <p className="mt-2 text-center text-xs font-semibold text-[var(--on-surface-variant)]">
            Already registered?{" "}
            <Link href="/login" className="font-extrabold text-[var(--primary)] hover:underline">
              Sign in
            </Link>
          </p>
        )}
      </div>

      {/* ══════════════ EMAIL OTP MODAL ══════════════ */}
      {showEmailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[28px] bg-white p-8 shadow-2xl border border-slate-100 relative">
            <button
              onClick={() => setShowEmailModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-xl font-bold"
            >
              ✕
            </button>

            <div className="text-center mb-6">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-100 to-indigo-100">
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="var(--primary)" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">Verify your email</h3>

              {isEditingEmail ? (
                <div className="mt-3 flex gap-2 items-center justify-center">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-10 rounded-lg border border-slate-200 px-3 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-[var(--primary)] w-64"
                  />
                  <button
                    onClick={() => { setIsEditingEmail(false); handleSendEmailOtp(); }}
                    className="h-10 rounded-lg bg-[var(--primary)] px-4 text-xs font-bold text-white"
                  >
                    Resend
                  </button>
                </div>
              ) : (
                <p className="mt-2 text-sm text-slate-500">
                  Enter the 6-digit code sent to{" "}
                  <span className="font-bold text-slate-800">{email}</span>
                  <button onClick={() => setIsEditingEmail(true)} className="ml-1 text-[var(--primary)] text-xs font-bold hover:underline">
                    Edit
                  </button>
                </p>
              )}
            </div>

            {/* 6-digit input */}
            <div className="flex justify-center gap-3 mb-6">
              {emailOtpCode.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => { if (el) inputRefs.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleEmailDigitChange(i, e.target.value)}
                  onKeyDown={(e) => handleEmailDigitKeyDown(i, e)}
                  className="h-14 w-12 rounded-xl border-2 border-slate-200 bg-slate-50 text-center text-xl font-extrabold text-slate-900 outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
                />
              ))}
            </div>

            {emailOtpError && (
              <p className={`mb-4 text-center text-xs font-semibold ${emailOtpError.includes("[Dev Mode]") ? "text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2" : "text-red-600"}`}>
                {emailOtpError}
              </p>
            )}

            <button
              onClick={handleVerifyEmailOtp}
              disabled={busy || emailOtpCode.join("").length < 6}
              className="signature-gradient w-full rounded-full py-3.5 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 disabled:opacity-50"
            >
              {busy ? "Verifying..." : "Verify & Create Profile"}
            </button>

            <div className="mt-4 text-center">
              {emailResendTimer > 0 ? (
                <p className="text-xs text-slate-400">
                  Resend code in <span className="font-bold text-slate-600">{emailResendTimer}s</span>
                </p>
              ) : (
                <button onClick={handleSendEmailOtp} className="text-xs font-bold text-[var(--primary)] hover:underline">
                  Resend verification code
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Field({ label, type = "text", value, onChange, ...props }: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.24em] text-[var(--on-surface-variant)]">{label}</span>
      <input {...props} type={type} value={value} onChange={onChange} className="h-12 w-full rounded-xl bg-[var(--surface-container-low)] px-4 text-sm text-[var(--on-surface)] outline-none transition focus:ring-2 focus:ring-[var(--primary)]" required />
    </label>
  );
}
