"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { api } from "@/lib/api";
import type { User } from "@/lib/types";
import { setSession } from "@/lib/session";

export default function RecruiterRegisterPage() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  // Onboarding Wizard Step
  const [step, setStep] = useState(1); // 1 = Mobile Verification, 2 = Basic Details, 3 = Company Details

  // Fields state to persist across wizard steps
  const [phone, setPhone] = useState("");
  const [accountType, setAccountType] = useState("Company/business");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [companyName, setCompanyName] = useState("");
  const [hiringFor, setHiringFor] = useState("your company");
  const [industry, setIndustry] = useState("");
  const [employeeRange, setEmployeeRange] = useState("");
  const [designation, setDesignation] = useState("");
  const [pincode, setPincode] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");

  // OTP Mobile Verification State
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

  // Mobile OTP Handlers
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
      setOtpError(err instanceof Error ? err.message : "Failed to send OTP.");
    }
  };

  const handleVerifyOtp = async () => {
    if (!otpCode || otpCode.length < 4) {
      setOtpError("Please enter a 4-digit code.");
      return;
    }
    setOtpError("");
    try {
      await api.post<{ success: boolean }>("/api/auth/otp/verify", { phone, code: otpCode });
      setOtpVerified(true);
      setStep(2);
    } catch (err) {
      setOtpError(err instanceof Error ? err.message : "Invalid or expired OTP.");
    }
  };

  // Email Verification OTP Handlers
  const handleSendEmailOtp = async () => {
    if (!email) {
      setError("Please enter a valid email address.");
      return;
    }
    setBusy(true);
    setError("");
    setEmailOtpError("");
    try {
      const res = await api.post<{ success: boolean; code?: string }>("/api/auth/email-otp/send", {
        email,
        fullName,
      });
      setShowEmailModal(true);
      setEmailResendTimer(46); // Reset like Naukri's 46s countdown
      if (res.code) {
        setEmailOtpError(`[Dev Mode] Email OTP: ${res.code}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send email OTP.");
    } finally {
      setBusy(false);
    }
  };

  const handleVerifyEmailOtp = async () => {
    const fullCode = emailOtpCode.join("");
    if (fullCode.length < 6) {
      setEmailOtpError("Please enter all 6 digits.");
      return;
    }
    setBusy(true);
    setEmailOtpError("");
    try {
      await api.post<{ success: boolean }>("/api/auth/email-otp/verify", {
        email,
        code: fullCode,
      });
      setShowEmailModal(false);
      setStep(3); // Moves successfully to Step 3 Company Details!
    } catch (err) {
      setEmailOtpError(err instanceof Error ? err.message : "Invalid or expired email OTP.");
    } finally {
      setBusy(false);
    }
  };

  const handleOtpInputChange = (value: string, index: number) => {
    const cleaned = value.replace(/\D/g, "");
    if (!cleaned) {
      const nextCode = [...emailOtpCode];
      nextCode[index] = "";
      setEmailOtpCode(nextCode);
      return;
    }
    const nextCode = [...emailOtpCode];
    nextCode[index] = cleaned[0];
    setEmailOtpCode(nextCode);

    if (index < 5 && cleaned) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !emailOtpCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Timer Effect for Email OTP
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (showEmailModal && emailResendTimer > 0) {
      interval = setInterval(() => {
        setEmailResendTimer((t) => t - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showEmailModal, emailResendTimer]);

  const handleBasicDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      setError("Please fill out all required basic details.");
      return;
    }
    setError("");
    handleSendEmailOtp(); // Trigger Email verification popup modal
  };

  const handleFinalRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    setSuccess("");
    try {
      const res = await api.post<{ accessToken: string; user: User }>("/api/auth/register", {
        fullName,
        email,
        password,
        role: "RECRUITER",
        phone,
        companyName,
        hiringFor,
        industry,
        employeeRange,
        designation,
        pincode,
        companyAddress,
        isEmailVerified: true,
      });
      // Save session so they are instantly logged in
      setSession(res.accessToken, res.user);
      
      setStep(4); // Show Congratulations step
      
      // Auto-redirect to dashboard after 3.5 seconds
      setTimeout(() => {
        router.push("/recruiter/dashboard");
      }, 3500);
    } catch (response) {
      setError(response instanceof Error ? response.message : "Registration failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#faf8ff] flex flex-col justify-center">
      {/* Top Left Floating Back Button */}
      <div className="absolute top-6 left-6 z-40">
        <Link
          href="/recruiter"
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold transition hover:border-[#6c2bd9] hover:text-[#6c2bd9]"
          style={{ color: "#475569" }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back
        </Link>
      </div>

      <main className="mx-auto flex w-full max-w-xl flex-col justify-center px-6 py-12">
        <div className="card-surface rounded-[28px] p-8 md:p-10 shadow-2xl border border-slate-100 bg-white">
          
          {/* Progress Tracker (Hide if completed step 4) */}
          {step < 4 && (
            <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <span className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  otpVerified ? "bg-green-600 text-white" : "bg-purple-600 text-white"
                }`}>
                  {otpVerified ? "✓" : "1"}
                </span>
                <span className={`text-[10px] font-bold uppercase tracking-wider ${
                  otpVerified ? "text-green-700" : "text-purple-700"
                }`}>Mobile Verify</span>
              </div>
              <span className="h-px w-8 bg-slate-200" />
              <div className="flex items-center gap-2">
                <span className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  step >= 2 ? "bg-purple-600 text-white" : "bg-slate-100 text-slate-400"
                }`}>
                  2
                </span>
                <span className={`text-[10px] font-bold uppercase tracking-wider ${
                  step >= 2 ? "text-slate-700" : "text-slate-400"
                }`}>Basic details</span>
              </div>
              <span className="h-px w-8 bg-slate-200" />
              <div className="flex items-center gap-2">
                <span className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  step === 3 ? "bg-purple-600 text-white" : "bg-slate-100 text-slate-400"
                }`}>
                  3
                </span>
                <span className={`text-[10px] font-bold uppercase tracking-wider ${
                  step === 3 ? "text-slate-700" : "text-slate-400"
                }`}>Company details</span>
              </div>
            </div>
          )}

          {/* Header Branding */}
          {step < 4 && (
            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Recruiter Onboarding</p>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 font-display mt-1">
                {step === 1 ? "Verify Mobile" : step === 2 ? "Basic details" : "Company details"}
              </h2>
              {step === 2 && (
                <p className="text-xs text-slate-500 mt-1 font-semibold leading-relaxed">
                  We need these details to identify you and create your account
                </p>
              )}
              {step === 3 && (
                <p className="text-xs text-slate-500 mt-1 font-semibold leading-relaxed">
                  We use this information to know about the company you’re hiring for and to generate an invoice
                </p>
              )}
            </div>
          )}

          {error ? <p className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p> : null}
          {success ? <p className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">{success}</p> : null}

          {/* STEP 1: MOBILE VERIFICATION */}
          {step === 1 && (
            <div className="space-y-5">
              <div className="block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Mobile Number</span>
                <div className="flex gap-2">
                  <div className="h-12 flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-sm font-bold text-slate-500">
                    +91
                  </div>
                  <input
                    type="tel"
                    placeholder="9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-12 flex-1 rounded-xl border border-slate-200 px-4 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-purple-600 bg-white"
                    disabled={otpVerified}
                    required
                  />
                  {!otpVerified && (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="px-4 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-xs font-bold text-purple-700 transition"
                    >
                      {otpSent ? "Resend" : "Send OTP"}
                    </button>
                  )}
                </div>

                {otpSent && !otpVerified && (
                  <div className="mt-3 bg-purple-50/50 border border-purple-100 rounded-xl p-3.5 space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter 4 digit OTP"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        maxLength={4}
                        className="h-10 w-32 rounded-lg border border-slate-200 px-3 text-center text-sm outline-none focus:ring-2 focus:ring-purple-600 bg-white"
                      />
                      <button
                        type="button"
                        onClick={handleVerifyOtp}
                        className="px-4 rounded-lg bg-purple-600 hover:bg-purple-700 text-xs font-bold text-white transition"
                      >
                        Verify
                      </button>
                    </div>
                    {otpError && <p className="text-[10px] font-semibold text-red-600 mt-1">{otpError}</p>}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 2: BASIC DETAILS */}
          {step === 2 && (
            <form onSubmit={handleBasicDetailsSubmit} className="space-y-5">
              {/* Verified Phone Badge */}
              <div className="mb-4 rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 flex items-center justify-between text-xs text-slate-700 font-bold">
                <span>Mobile: +91 {phone}</span>
                <span className="text-green-600 flex items-center gap-1 font-extrabold text-[10px] bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
                  ✓ Verified
                </span>
              </div>

              {/* Creating Account As */}
              <div className="block">
                <span className="mb-3 block text-xs font-bold uppercase tracking-[0.24em] text-slate-500">
                  You&apos;re creating account as
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAccountType("Company/business")}
                    className={`h-12 rounded-xl border px-4 text-xs font-bold transition flex items-center justify-center gap-2 ${
                      accountType === "Company/business"
                        ? "border-purple-600 bg-purple-50/40 text-purple-700 ring-2 ring-purple-600/25"
                        : "border-slate-200 hover:bg-slate-50 text-slate-600 bg-white"
                    }`}
                  >
                    🏢 Company / business
                  </button>
                  <button
                    type="button"
                    onClick={() => setAccountType("Individual/proprietor")}
                    className={`h-12 rounded-xl border px-4 text-xs font-bold transition flex items-center justify-center gap-2 ${
                      accountType === "Individual/proprietor"
                        ? "border-purple-600 bg-purple-50/40 text-purple-700 ring-2 ring-purple-600/25"
                        : "border-slate-200 hover:bg-slate-50 text-slate-600 bg-white"
                    }`}
                  >
                    💼 Individual / proprietor
                  </button>
                </div>
              </div>

              {/* Full Name */}
              <label className="block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Full name</span>
                <input
                  type="text"
                  placeholder="Name as per PAN"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm text-slate-800 outline-none transition focus:ring-2 focus:ring-purple-600 bg-white"
                  required
                />
              </label>

              {/* Official Email */}
              <label className="block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Official email ID</span>
                <input
                  type="email"
                  placeholder="Enter email ID"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm text-slate-800 outline-none transition focus:ring-2 focus:ring-purple-600 bg-white"
                  required
                />
              </label>

              {/* Create Password */}
              <label className="block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Create password</span>
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm text-slate-800 outline-none transition focus:ring-2 focus:ring-purple-600 bg-white"
                  required
                />
              </label>

              <button
                type="submit"
                className="w-full h-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-sm font-black uppercase tracking-wider text-white shadow-lg transition hover:-translate-y-0.5 mt-4"
              >
                Continue
              </button>
            </form>
          )}

          {/* STEP 3: COMPANY DETAILS (Submits to API) */}
          {step === 3 && (
            <form onSubmit={handleFinalRegisterSubmit} className="space-y-5">
              
              {/* Hiring for */}
              <div className="block">
                <span className="mb-3 block text-xs font-bold uppercase tracking-[0.24em] text-slate-500">
                  Hiring for
                </span>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                      hiringFor === "your company" ? "border-purple-600" : "border-slate-300 group-hover:border-purple-400"
                    }`}>
                      {hiringFor === "your company" && <div className="w-2.5 h-2.5 rounded-full bg-purple-600" />}
                    </div>
                    <span className="text-sm font-semibold text-slate-700">your company</span>
                    <input 
                      type="radio" 
                      name="hiringFor" 
                      value="your company" 
                      checked={hiringFor === "your company"} 
                      onChange={(e) => setHiringFor(e.target.value)} 
                      className="hidden" 
                    />
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                      hiringFor === "a consultancy" ? "border-purple-600" : "border-slate-300 group-hover:border-purple-400"
                    }`}>
                      {hiringFor === "a consultancy" && <div className="w-2.5 h-2.5 rounded-full bg-purple-600" />}
                    </div>
                    <span className="text-sm font-semibold text-slate-700">a consultancy</span>
                    <input 
                      type="radio" 
                      name="hiringFor" 
                      value="a consultancy" 
                      checked={hiringFor === "a consultancy"} 
                      onChange={(e) => setHiringFor(e.target.value)} 
                      className="hidden" 
                    />
                  </label>
                </div>
              </div>

              {/* Company */}
              <label className="block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Company</span>
                <input
                  type="text"
                  placeholder="Enter company name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm text-slate-800 outline-none transition focus:ring-2 focus:ring-purple-600 bg-white"
                  required
                />
              </label>

              {/* Select industry - conditionally rendered */}
              {hiringFor === "your company" && (
                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Select industry</span>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-purple-600 bg-white bg-no-repeat appearance-none"
                    style={{ backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M5%207l5%205%205-5%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')", backgroundPosition: "right 1rem center" }}
                    required
                  >
                    <option value="" disabled hidden>Select industry</option>
                    <option value="Accounting / Auditing">Accounting / Auditing</option>
                    <option value="Advertising & Marketing">Advertising & Marketing</option>
                    <option value="Agriculture / Forestry / Fishing">Agriculture / Forestry / Fishing</option>
                    <option value="Analytics / KPO / Research">Analytics / KPO / Research</option>
                    <option value="Animation & VFX">Animation & VFX</option>
                    <option value="IT Services & Consulting">IT Services & Consulting</option>
                    <option value="Software Product">Software Product</option>
                    <option value="Healthcare & Life Sciences">Healthcare & Life Sciences</option>
                    <option value="Education / Training">Education / Training</option>
                    <option value="Other">Other</option>
                  </select>
                </label>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Number of employees */}
                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Number of employees</span>
                  <select
                    value={employeeRange}
                    onChange={(e) => setEmployeeRange(e.target.value)}
                    className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-purple-600 bg-white bg-no-repeat appearance-none"
                    style={{ backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M5%207l5%205%205-5%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')", backgroundPosition: "right 1rem center" }}
                    required
                  >
                    <option value="" disabled hidden>Select range</option>
                    <option value="1-10 employees">1-10 employees</option>
                    <option value="11-50 employees">11-50 employees</option>
                    <option value="51-200 employees">51-200 employees</option>
                    <option value="201-500 employees">201-500 employees</option>
                    <option value="500+ employees">500+ employees</option>
                  </select>
                </label>

                {/* Your designation */}
                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Your designation</span>
                  <input
                    type="text"
                    placeholder="Enter designation"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm text-slate-800 outline-none transition focus:ring-2 focus:ring-purple-600 bg-white"
                    required
                  />
                </label>
              </div>

              {/* Pin code */}
              <label className="block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Pin code</span>
                <input
                  type="text"
                  placeholder="Enter company pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm text-slate-800 outline-none transition focus:ring-2 focus:ring-purple-600 bg-white"
                  required
                />
              </label>

              {/* Company address */}
              <label className="block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Company address</span>
                <input
                  type="text"
                  placeholder="Enter company address"
                  value={companyAddress}
                  onChange={(e) => setCompanyAddress(e.target.value)}
                  className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm text-slate-800 outline-none transition focus:ring-2 focus:ring-purple-600 bg-white"
                  required
                />
              </label>

              <button
                type="submit"
                className="w-full h-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-sm font-black uppercase tracking-wider text-white shadow-lg transition hover:-translate-y-0.5 mt-4"
                disabled={busy}
              >
                {busy ? "Registering Company..." : "Register Company Profile"}
              </button>
            </form>
          )}

          {/* STEP 4: CONGRATULATIONS */}
          {step === 4 && (
            <div className="flex flex-col items-center justify-center text-center py-10 animate-in zoom-in-95 duration-500">
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-green-100/50">
                <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 font-display mb-3">
                Congratulations! 🎉
              </h2>
              <p className="text-sm font-semibold text-slate-500 leading-relaxed max-w-sm mb-10">
                Your company profile has been successfully registered on NCRJobs. You are now being redirected to your Recruiter Dashboard.
              </p>
              <div className="flex gap-3 items-center">
                <div className="w-5 h-5 border-4 border-slate-200 border-t-purple-600 rounded-full animate-spin"></div>
                <span className="text-xs font-bold text-slate-400 tracking-widest uppercase">Redirecting...</span>
              </div>
            </div>
          )}

          {step < 4 && (
            <p className="mt-6 text-center text-xs font-semibold text-slate-400">
              Already registered?{" "}
              <Link href="/recruiter/login" className="text-purple-600 font-extrabold hover:underline">
                Log in here
              </Link>
            </p>
          )}
        </div>
      </main>

      {/* GORGEOUS NAUKRI-STYLE EMAIL OTP VERIFICATION DIALOG MODAL */}
      {showEmailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200">
            
            {/* Close Button */}
            <button
              onClick={() => setShowEmailModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition"
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Title */}
            <h3 className="text-xl font-bold text-slate-800">Verify email ID</h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              We have sent an OTP to your email ID
            </p>

            {/* Email Address with Edit Icon */}
            <div className="mt-2 flex items-center gap-2">
              {isEditingEmail ? (
                <div className="flex gap-2 w-full">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-8 flex-1 rounded-lg border border-slate-200 px-3 text-xs outline-none focus:ring-1 focus:ring-purple-600 bg-white text-slate-800 font-semibold"
                  />
                  <button
                    onClick={() => {
                      setIsEditingEmail(false);
                      handleSendEmailOtp();
                    }}
                    className="px-2.5 h-8 rounded-lg bg-purple-600 hover:bg-purple-700 text-[10px] font-black text-white"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <>
                  <span className="text-xs font-bold text-slate-700">{email}</span>
                  <button
                    onClick={() => setIsEditingEmail(true)}
                    className="text-purple-600 hover:text-purple-700 transition"
                    title="Edit Email"
                  >
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* 6 Digit Input Fields */}
            <div className="mt-6 flex justify-between gap-2.5">
              {emailOtpCode.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    if (el) inputRefs.current[index] = el;
                  }}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpInputChange(e.target.value, index)}
                  onKeyDown={(e) => handleOtpInputKeyDown(e, index)}
                  className="h-12 w-12 rounded-xl border border-slate-200 text-center text-lg font-black text-slate-800 outline-none transition focus:ring-2 focus:ring-purple-600 bg-white"
                />
              ))}
            </div>

            {emailOtpError && (
              <p className="mt-3 text-[10px] font-semibold text-red-600 bg-red-50 border border-red-100 rounded-lg p-2.5">
                {emailOtpError}
              </p>
            )}

            {/* Timer / Resend Links */}
            <p className="mt-5 text-[11px] font-bold text-slate-500">
              {emailResendTimer > 0 ? (
                <>
                  Didn&apos;t receive it? Resend in{" "}
                  <span className="text-purple-600 font-extrabold">
                    00:{emailResendTimer < 10 ? `0${emailResendTimer}` : emailResendTimer}
                  </span>
                </>
              ) : (
                <button
                  type="button"
                  onClick={handleSendEmailOtp}
                  className="text-purple-600 hover:underline font-extrabold"
                >
                  Resend OTP
                </button>
              )}
            </p>

            {/* Verify Button */}
            <button
              onClick={handleVerifyEmailOtp}
              disabled={emailOtpCode.some((d) => !d) || busy}
              className="mt-6 w-full h-11 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:bg-slate-100 disabled:text-slate-400 text-xs font-black uppercase tracking-wider text-white shadow-lg transition"
            >
              {busy ? "Verifying..." : "Verify OTP"}
            </button>

          </div>
        </div>
      )}
    </div>
  );
}
