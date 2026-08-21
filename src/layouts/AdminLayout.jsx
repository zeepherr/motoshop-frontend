import { adminNavigation } from "@/config/navigation/navigation";
import { AppShell } from "@/layouts/AppShell";
import useAuthStore from "@/stores/auth.store";

export function AdminLayout() {
  const user = useAuthStore((state) => state.user);
  console.log(user);
  return (
    <AppShell
      navigation={adminNavigation}
      section="Admin"
      workspace="Shop management"
      user={user}
    />
  );
}
