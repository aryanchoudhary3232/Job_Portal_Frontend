import { AuthShell } from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthShell
      eyebrow="Sign in"
      title="Return to a hiring workflow that actually feels organized."
      description="Use the demo accounts from the README or log in with your own newly created user and continue inside the role-specific workspace."
      stickerTitle="Sign in to NCRJobs"
      stickerSubtitle="Resume your NCR hiring journey with a verified, staff-backed workflow."
      stickerImage="/loginImage.png"
    >
      <LoginForm />
    </AuthShell>
  );
}
