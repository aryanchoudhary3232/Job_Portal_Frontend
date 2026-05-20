import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

export function AuthShell({
  eyebrow,
  title,
  description,
  stickerTitle,
  stickerSubtitle,
  stickerImage,
  compact,
  topRightLink,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  stickerTitle?: string;
  stickerSubtitle?: string;
  stickerImage?: string;
  compact?: boolean;
  topRightLink?: React.ReactNode;
  children: ReactNode;
}) {
  const panelPadding = compact ? "p-10" : "p-14";
  const sticker = stickerImage ? (
    <div className="flex w-full items-center justify-center">
      {/* Fixed-size box — illustration never grows beyond this */}
      <div
        style={{ width: 340, height: 340, flexShrink: 0 }}
        className="flex items-center justify-center overflow-hidden"
      >
        <Image
          src={stickerImage}
          alt={stickerTitle || "NCRJobs mascot"}
          width={340}
          height={340}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
          className="drop-shadow-[0_35px_80px_rgba(20,9,60,0.45)]"
        />
      </div>
    </div>
  ) : null;

  return (
    <div className="relative h-screen overflow-hidden page-shell">
      <div className="sr-only">
        <p>{eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>
        {stickerSubtitle ? <p>{stickerSubtitle}</p> : null}
      </div>
      {/* Ambient blobs */}
      <div className="fixed -top-24 -left-24 -z-10 h-96 w-96 rounded-full bg-[rgba(195,192,255,0.2)] blur-3xl" />
      <div className="fixed -bottom-24 -right-24 -z-10 h-96 w-96 rounded-full bg-[rgba(79,70,229,0.16)] blur-3xl" />

      {/* Back button — top-left: pill with arrow + text */}
      <Link
        href="/"
        className="fixed top-5 left-5 z-50 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold shadow-lg transition-all duration-200 hover:scale-105"
        style={{ backgroundColor: "rgba(255,255,255,0.9)", color: "var(--primary)", border: "1px solid var(--outline-variant)", backdropFilter: "blur(12px)" }}
        aria-label="Back to home"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16" height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H5" />
          <path d="M12 19l-7-7 7-7" />
        </svg>
        Back
      </Link>


      <div className="flex h-full">
        {/* Left gradient panel */}
        <section
          className={`signature-gradient relative hidden lg:flex lg:w-[45%] xl:w-[40%] flex-col items-center justify-center overflow-hidden text-white h-full ${panelPadding}`}
        >
          {/* Soft glow blobs inside panel */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 -left-20 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-1/4 -right-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
          </div>

          {/* Decorative right-edge border accent — vertical strip of stacked dots/rings */}
          <div className="absolute right-0 top-0 h-full w-10 flex flex-col items-center justify-center gap-4 z-10">
            {[...Array(9)].map((_, i) => (
              <span
                key={i}
                className="block rounded-full border border-white/25"
                style={{
                  width: i % 3 === 0 ? 14 : i % 3 === 1 ? 10 : 6,
                  height: i % 3 === 0 ? 14 : i % 3 === 1 ? 10 : 6,
                  opacity: 0.3 + (i % 3) * 0.2,
                }}
              />
            ))}
          </div>
          {/* A thin glowing right border line */}
          <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-white/40 to-transparent" />

          {/* Illustration — fixed box */}
          {sticker ? <div className="relative z-10">{sticker}</div> : null}
        </section>

        {/* Right content area — scrolls internally if content overflows */}
        <section className="flex flex-1 h-full overflow-y-auto scrollbar-hidden items-start justify-center px-6 md:px-12">
          <div className={`w-full max-w-md ${compact ? "py-6" : "py-10"}`}>
            {/* Top bar: logo left, switch link right — same row */}
            <div className="hidden lg:flex items-center justify-between mb-8">
              <Image
                src="/logo-wordmark.svg"
                alt="NCRJobs"
                width={180}
                height={44}
                className="h-11 w-auto"
              />
              {topRightLink && (
                <div
                  className="rounded-full px-4 py-2 text-sm"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.82)",
                    border: "1px solid var(--outline-variant)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  {topRightLink}
                </div>
              )}
            </div>
            {children}
          </div>
        </section>
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-50 h-1 signature-gradient" />
    </div>
  );
}
