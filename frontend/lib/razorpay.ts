// Razorpay Integration Helper for HireVerse (Supports Test & Dev Mode)

export interface RazorpayOrder {
  id: string;
  amount: number;
  currency: string;
  planName: string;
  status: "created" | "paid";
}

export interface RazorpayPaymentSuccess {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
  planName: string;
  amountPaid: number;
}

export const RAZORPAY_KEY_ID =
  process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_hireverse_dev101";

// Helper to convert USD plan prices to INR (for Razorpay INR checkout)
export function convertUsdToInr(usdPrice: number): number {
  return Math.round(usdPrice * 83); // 1 USD ~ 83 INR
}

// Generate Mock Razorpay Order ID for Dev Mode
export function createRazorpayOrder(planName: string, amountUsd: number): RazorpayOrder {
  const amountInr = convertUsdToInr(amountUsd);
  return {
    id: "order_" + Math.random().toString(36).substring(2, 10).toUpperCase(),
    amount: amountInr * 100, // Razorpay amount in paise
    currency: "INR",
    planName,
    status: "created",
  };
}

// Verify Payment Signature (Dev Mode Mock)
export function verifyRazorpayPayment(
  paymentId: string,
  orderId: string
): RazorpayPaymentSuccess {
  return {
    razorpay_payment_id: paymentId || "pay_" + Math.random().toString(36).substring(2, 12),
    razorpay_order_id: orderId,
    razorpay_signature: "sig_" + Math.random().toString(36).substring(2, 16),
    planName: "Plan",
    amountPaid: 0,
  };
}
