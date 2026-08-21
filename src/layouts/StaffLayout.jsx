import { staffNavigation } from "@/config/navigation/navigation";
import useAuthStore from "@/stores/auth.store";
import { AppShell } from "./AppShell";
export function StaffLayout() {
  const user = useAuthStore((store) => store.user);
  return (
    <AppShell
      navigation={staffNavigation}
      section="Staff"
      workspace="Staff workspace"
      user={user}
    />
  );
}
