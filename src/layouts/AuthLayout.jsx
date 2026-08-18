import AuthHeader from "@/components/auth/AuthHeader";
import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="h-dvh overflow-hidden bg-background">
      <AuthHeader />

      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-5">
        <Outlet />
      </main>
    </div>
  );
}
