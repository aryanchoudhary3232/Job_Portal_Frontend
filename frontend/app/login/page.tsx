import Link from "next/link";
import { AuthShell } from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthShell
      eyebrow="Student sign in"
      title="Return to your student dashboard in seconds."
      description="Access internships, entry roles, and your application tracker with one clean login."
      stickerTitle="Student sign in"
      stickerSubtitle="Resume your NCR job search with verified student openings."
      stickerImage="/auth-login-illustration.svg"
      topRightLink={
        <span className="text-sm text-[var(--on-surface-variant)]">
          Need an account?{" "}
          <Link
            href="/register"
            className="font-bold text-[var(--primary)] hover:underline"
          >
            Create one
          </Link>
        </span>
      }
    >
      <LoginForm />
    </AuthShell>
  );
}
