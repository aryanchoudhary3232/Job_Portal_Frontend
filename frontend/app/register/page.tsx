import { AuthShell } from "@/components/auth/AuthShell";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthShell
      eyebrow="Register"
      title="Create the right workspace for the way you hire or get hired."
      description="Students, recruiters, and staff all get role-aware journeys with one consistent API gateway behind the scenes."
      stickerTitle="Create your NCR profile"
      stickerSubtitle="Start with NCR roles and expand with us as the platform grows."
      stickerImage="/registerImage.png"
    >
      <RegisterForm />
    </AuthShell>
  );
}
