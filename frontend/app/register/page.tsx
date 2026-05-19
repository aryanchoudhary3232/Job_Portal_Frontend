import Link from "next/link";
import { AuthShell } from "@/components/auth/AuthShell";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthShell
      eyebrow="Student register"
      title="Create your student profile in minutes."
      description="Apply to NCR internships and entry roles with a verified student profile."
      stickerTitle="Student profile"
      stickerSubtitle="Start applying to verified student openings right away."
      stickerImage="/auth-register-illustration.svg"
      compact
      topRightLink={
        <span className="text-sm text-[var(--on-surface-variant)]">
          Already registered?{" "}
          <Link
            href="/login"
            className="font-bold text-[var(--primary)] hover:underline"
          >
            Sign in
          </Link>
        </span>
      }
    >
      <RegisterForm />
    </AuthShell>
  );
}
