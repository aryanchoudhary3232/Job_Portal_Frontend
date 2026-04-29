import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function Navbar({ role }: { role: string }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-background text-foreground shadow-sm relative z-10">
      <div className="font-heading font-medium text-xl tracking-tight">
        JobPortal <span className="text-muted-foreground text-sm uppercase tracking-widest ml-2">{role}</span>
      </div>
      <div className="flex gap-4">
        <Button variant="ghost" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </nav>
  );
}
