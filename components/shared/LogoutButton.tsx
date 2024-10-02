"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { logout } from "@/app/api/logout/route";
import { LogOut } from "lucide-react";

interface LogoutProps {
  collapse: boolean;
}

const LogoutButton = ({ collapse }: LogoutProps) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleLogout = async () => {
    startTransition(async () => {
      setError(null);
      try {
        // Call the server action to log out
        await logout();
      } catch (err) {
        setError("فشل تسجيل الخروج. يرجى المحاولة مرة أخرى.");
      }
    });
  };

  return (
    <div className="flex flex-col items-center mt-8">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <Button
        onClick={handleLogout}
        className="w-full flex justify-start items-center gap-2"
        disabled={isPending}
      >
        <LogOut className="w-4 h-4" />
        {!collapse && (isPending ? "..." : "تسجيل الخروج")}
      </Button>
    </div>
  );
};

export default LogoutButton;
