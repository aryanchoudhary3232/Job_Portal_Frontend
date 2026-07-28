"use client";

import { useState } from "react";
import { Check, Sparkles, Shield, Crown, CreditCard, Smartphone, Building2, Wallet, Lock, CheckCircle2, X } from "lucide-react";
import { convertUsdToInr, createRazorpayOrder, RAZORPAY_KEY_ID } from "@/lib/razorpay";

export function PricingSection({ onSelectPlan, role = "ALL" }: { onSelectPlan?: (planName: string) => void; role?: "RECRUITER" | "STUDENT" | "ALL" }) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  // Razorpay Checkout Modal State
  const [activeCheckoutPlan, setActiveCheckoutPlan] = useState<{
    name: string;
    usdPrice: number;
    inrPrice: number;
  } | null>(null);

  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "netbanking" | "wallet">("upi");
  const [upiId, setUpiId] = useState("success@razorpay");
  const [cardNumber, setCardNumber] = useState("4111 •••• •••• 1111");
  const [cardExpiry, setCardExpiry] = useState("12/28");
  const [cardCvv, setCardCvv] = useState("123");
  const [selectedBank, setSelectedBank] = useState("HDFC Bank");

  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentReceipt, setPaymentReceipt] = useState<{
    paymentId: string;
    orderId: string;
    amount: number;
    planName: string;
    date: string;
  } | null>(null);

  const discountRatio = billingCycle === "yearly" ? 0.8 : 1; // 20% discount on yearly

  const plans = [
    {
      name: "Recruiter Basic",
      badge: "Starter Teams",
      icon: Shield,
      usdPrice: Math.round(49 * discountRatio),
      period: "per month",
      description: "Essential hiring tools for growing startups and small teams.",
      features: [
        "Up to 10 active job postings",
        "100 full resume views per month",
        "Basic applicant tracking system (ATS)",
        "Direct email candidate notifications",
        "Standard company profile page",
      ],
      cta: "Pay ₹3,999 with Razorpay",
      highlight: false,
      color: "border-purple-200 bg-purple-50/30",
      buttonClass: "border-2 border-purple-600 text-purple-700 hover:bg-purple-50",
    },
    {
      name: "Recruiter Pro",
      badge: "MOST POPULAR 🔥",
      icon: Sparkles,
      usdPrice: Math.round(199 * discountRatio),
      period: "per month",
      description: "Supercharged AI automation for scaling hiring operations.",
      features: [
        "Unlimited job postings",
        "🤖 AI Candidate Screening & Fit Score",
        "🎯 AI Candidate Ranking & Top 5% Badging",
        "📝 AI Job Description Generator",
        "💬 AI Interview Question Generator",
        "Complete ATS pipeline & Email automation",
        "Advanced Hiring Analytics dashboard",
      ],
      cta: "Pay ₹15,999 with Razorpay",
      highlight: true,
      color: "border-purple-600 bg-gradient-to-b from-purple-50/80 to-indigo-50/80 shadow-2xl ring-2 ring-purple-600/30",
      buttonClass: "signature-gradient text-white shadow-xl hover:shadow-purple-500/25",
    },
    {
      name: "Enterprise",
      badge: "Custom Scale",
      icon: Crown,
      usdPrice: 499, // Custom baseline
      period: "contact sales",
      description: "Custom enterprise solution with white-labeling & dedicated support.",
      features: [
        "Everything in Recruiter Pro",
        "🔌 REST API & Webhook Integrations",
        "Dedicated Account Manager & SLA",
        "Bulk Hiring & Campus Drive workflows",
        "White-label custom career portal & domain",
        "Custom AI model fine-tuning for your tech stack",
      ],
      cta: "Contact Enterprise Sales",
      highlight: false,
      color: "border-slate-800 bg-slate-950 text-white",
      buttonClass: "bg-white text-slate-950 hover:bg-slate-100",
    },
  ];

  const handleOpenCheckout = async (planName: string, usdPrice: number) => {
    if (usdPrice === 0) {
      alert("🎉 Free Candidate Plan activated! You can start applying to jobs right away.");
      return;
    }
    const inr = convertUsdToInr(usdPrice);

    // Launch custom interactive Razorpay Dev Modal (100% test success guaranteed without card/bank restrictions)
    setActiveCheckoutPlan({ name: planName, usdPrice, inrPrice: inr });
    if (onSelectPlan) onSelectPlan(planName);
  };

  const handleRazorpayPayment = () => {
    if (!activeCheckoutPlan) return;
    setPaymentProcessing(true);

    const order = createRazorpayOrder(activeCheckoutPlan.name, activeCheckoutPlan.usdPrice);

    setTimeout(() => {
      localStorage.setItem("recruiter_active_plan", activeCheckoutPlan.name);
      setPaymentProcessing(false);
      setPaymentReceipt({
        paymentId: "pay_" + Math.random().toString(36).substring(2, 12).toUpperCase(),
        orderId: order.id,
        amount: activeCheckoutPlan.inrPrice,
        planName: activeCheckoutPlan.name,
        date: new Date().toLocaleString("en-IN"),
      });
      setActiveCheckoutPlan(null);
    }, 1500);
  };

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest text-purple-700">
          <Sparkles className="h-3.5 w-3.5" /> Razorpay Test Key Loaded ({RAZORPAY_KEY_ID.slice(0, 14)}...)
        </span>
        <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl font-display">
          Invest in top talent with AI-powered hiring
        </h2>
        <p className="mt-3 text-sm font-semibold text-slate-600">
          Choose the perfect plan for your recruitment goals. Instant activation with Razorpay UPI, Cards & Netbanking.
        </p>

        {/* Monthly / Yearly Switch */}
        <div className="mt-6 inline-flex items-center rounded-full bg-slate-100 p-1.5 border border-slate-200">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`rounded-full px-5 py-2 text-xs font-bold transition ${
              billingCycle === "monthly" ? "bg-white text-slate-900 shadow-md" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setBillingCycle("yearly")}
            className={`rounded-full px-5 py-2 text-xs font-bold transition flex items-center gap-1.5 ${
              billingCycle === "yearly" ? "bg-purple-600 text-white shadow-md" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Yearly Billing <span className="rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-black text-slate-950">SAVE 20%</span>
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const Icon = plan.icon;
          const inrPrice = convertUsdToInr(plan.usdPrice);

          return (
            <div
              key={plan.name}
              className={`relative flex flex-col justify-between rounded-[28px] p-7 border transition-all duration-300 hover:-translate-y-1 ${plan.color}`}
            >
              {plan.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full signature-gradient px-4 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow-lg">
                  {plan.badge}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-2xl ${plan.name === "Enterprise" ? "bg-slate-800 text-purple-400" : "bg-purple-100 text-purple-700"}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  {!plan.highlight && (
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                      plan.name === "Enterprise" ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-600"
                    }`}>
                      {plan.badge}
                    </span>
                  )}
                </div>

                <h3 className={`text-xl font-extrabold ${plan.name === "Enterprise" ? "text-white" : "text-slate-900"}`}>{plan.name}</h3>
                <p className={`mt-1.5 text-xs font-semibold ${plan.name === "Enterprise" ? "text-slate-400" : "text-slate-500"}`}>{plan.description}</p>

                {/* Price Display */}
                <div className="my-6">
                  {plan.usdPrice > 0 ? (
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className={`text-3xl font-black font-display ${plan.name === "Enterprise" ? "text-white" : "text-slate-950"}`}>
                          ₹{inrPrice.toLocaleString("en-IN")}
                        </span>
                        <span className={`text-xs font-bold ${plan.name === "Enterprise" ? "text-slate-400" : "text-slate-500"}`}>/{plan.period}</span>
                      </div>
                      <p className="text-[11px] font-semibold text-slate-400 mt-0.5">~${plan.usdPrice} USD</p>
                    </div>
                  ) : (
                    <div className="text-3xl font-black text-slate-950 font-display">₹0 FREE</div>
                  )}
                </div>

                {/* Feature List */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-xs font-semibold leading-snug">
                      <Check className={`h-4 w-4 shrink-0 mt-0.5 ${plan.name === "Enterprise" ? "text-purple-400" : "text-purple-600"}`} />
                      <span className={plan.name === "Enterprise" ? "text-slate-300" : "text-slate-700"}>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleOpenCheckout(plan.name, plan.usdPrice)}
                className={`w-full h-12 rounded-2xl font-extrabold text-xs uppercase tracking-wider transition ${plan.buttonClass}`}
              >
                {plan.cta}
              </button>
            </div>
          );
        })}
      </div>

      {/* ─── RAZORPAY DEV MODE CHECKOUT MODAL ─── */}
      {activeCheckoutPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-3xl bg-white shadow-2xl overflow-hidden border border-slate-200">
            {/* Razorpay Top Header */}
            <div className="bg-[#0c2340] p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-black text-white text-lg">
                  R
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-extrabold font-display">Razorpay Secure</h4>
                    <span className="rounded bg-amber-400 px-1.5 py-0.5 text-[9px] font-black uppercase text-slate-950">DEV MODE</span>
                  </div>
                  <p className="text-[11px] text-blue-200 font-medium">Merchant Key: {RAZORPAY_KEY_ID}</p>
                </div>
              </div>
              <button
                onClick={() => setActiveCheckoutPlan(null)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Order Summary Strip */}
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Subscription Order</span>
                <h4 className="text-sm font-black text-slate-900">{activeCheckoutPlan.name}</h4>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black text-blue-700 font-display">₹{activeCheckoutPlan.inrPrice.toLocaleString("en-IN")}</p>
                <span className="text-[10px] text-slate-500 font-semibold">Incl. 18% GST</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="p-6 space-y-5">
              <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Select Test Payment Method</p>

              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: "upi", label: "UPI / QR", icon: Smartphone },
                  { id: "card", label: "Card", icon: CreditCard },
                  { id: "netbanking", label: "NetBanking", icon: Building2 },
                  { id: "wallet", label: "Wallet", icon: Wallet },
                ].map((m) => {
                  const MIcon = m.icon;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setPaymentMethod(m.id as typeof paymentMethod)}
                      className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-2xl border text-xs font-bold transition ${
                        paymentMethod === m.id
                          ? "border-blue-600 bg-blue-50/60 text-blue-700 ring-2 ring-blue-600/20"
                          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      <MIcon className="h-5 w-5" />
                      <span className="text-[10px]">{m.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Method Detail Inputs */}
              {paymentMethod === "upi" && (
                <div className="space-y-2">
                  <label className="block text-[11px] font-bold text-slate-600">Enter Test VPA / UPI ID</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full h-11 rounded-xl border border-slate-200 px-3.5 text-xs font-bold text-slate-800 outline-none focus:border-blue-600"
                  />
                  <p className="text-[10px] text-slate-400">Default test VPA: <code className="text-blue-600 font-bold">success@razorpay</code></p>
                </div>
              )}

              {paymentMethod === "card" && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Test Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full h-10 rounded-xl border border-slate-200 px-3.5 text-xs font-bold text-slate-800"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Expiry</label>
                      <input type="text" value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} className="w-full h-10 rounded-xl border border-slate-200 px-3.5 text-xs font-bold text-slate-800" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">CVV</label>
                      <input type="text" value={cardCvv} onChange={(e) => setCardCvv(e.target.value)} className="w-full h-10 rounded-xl border border-slate-200 px-3.5 text-xs font-bold text-slate-800" />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "netbanking" && (
                <div className="space-y-2">
                  <label className="block text-[11px] font-bold text-slate-600">Select Test Bank</label>
                  <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="w-full h-11 rounded-xl border border-slate-200 px-3 text-xs font-bold text-slate-800"
                  >
                    <option value="HDFC Bank">HDFC Bank (Test)</option>
                    <option value="ICICI Bank">ICICI Bank (Test)</option>
                    <option value="State Bank of India">State Bank of India (Test)</option>
                    <option value="Axis Bank">Axis Bank (Test)</option>
                  </select>
                </div>
              )}

              {paymentMethod === "wallet" && (
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700">
                  Paytm / PhonePe Wallet Test Mode Enabled.
                </div>
              )}

              {/* Pay Now Button */}
              <button
                onClick={handleRazorpayPayment}
                disabled={paymentProcessing}
                className="w-full h-13 rounded-2xl bg-[#0c2340] hover:bg-[#15345d] text-white font-extrabold text-xs uppercase tracking-wider shadow-xl flex items-center justify-center gap-2 transition"
              >
                <Lock className="h-4 w-4 text-blue-400" />
                {paymentProcessing
                  ? "Processing Razorpay Payment..."
                  : `Pay ₹${activeCheckoutPlan.inrPrice.toLocaleString("en-IN")} via Razorpay`}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── PAYMENT SUCCESS RECEIPT MODAL ─── */}
      {paymentReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl border border-slate-100 text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="h-9 w-9" />
            </div>

            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-200">
                Payment Successful
              </span>
              <h3 className="mt-3 text-2xl font-black text-slate-900 font-display">Razorpay Payment Received!</h3>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Your <strong className="text-purple-700">{paymentReceipt.planName}</strong> plan has been activated immediately.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400 font-semibold">Payment ID:</span>
                <span className="font-mono font-bold text-slate-800">{paymentReceipt.paymentId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-semibold">Order ID:</span>
                <span className="font-mono font-bold text-slate-800">{paymentReceipt.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-semibold">Amount Paid:</span>
                <span className="font-black text-green-700 text-sm">₹{paymentReceipt.amount.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-semibold">Date & Time:</span>
                <span className="font-medium text-slate-600">{paymentReceipt.date}</span>
              </div>
            </div>

            <button
              onClick={() => setPaymentReceipt(null)}
              className="w-full h-12 rounded-2xl signature-gradient text-white font-extrabold text-xs uppercase tracking-wider shadow-lg"
            >
              Access Pro Recruiter AI Tools
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
