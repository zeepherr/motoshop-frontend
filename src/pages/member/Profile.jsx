import { LogoutButton } from "@/components/auth/LogoutButton";
import useAuthStore from "@/stores/auth.store";
import { Loader2 } from "lucide-react";

function Profile() {
  const user = useAuthStore((store) => store.user);
  return (
    <div className="p-10">
      <main className="min-h-50 bg-background p-8 text-foreground">
        <div className="mx-auto max-w-4xl space-y-6">
          <div>
            <p className="text-sm text-muted-foreground">Signed in as</p>

            <h1 className="text-3xl font-semibold">
              {user?.firstName} {user?.lastName}
            </h1>

            <p className="mt-2 text-primary">{user?.role}</p>
          </div>

          <LogoutButton />
        </div>
      </main>
      <h1 className="text-4xl font-bold text-chart-5 ">Coming Soon...</h1>
      <p className="flex items-center gap-2 text-sm text-muted-foreground">
        Under development
        <Loader2 className="size-3 animate-spin text-primary" />
      </p>
    </div>
  );
}

export default Profile;
