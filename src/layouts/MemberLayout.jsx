import { memberNavigation } from "@/config/navigation/navigation";
import useAuthStore from "@/stores/auth.store";
import { AppShell } from "./AppShell";

export function MemberLayout() {
  const user = useAuthStore((store) => store.user);
  console.log("MemberLayout rendered", user);
  return (
    <AppShell
      navigation={memberNavigation}
      section="Member"
      workspace="Motorcycle care"
      user={user}
    />

    // <main className="min-h-screen">
    //   I am member
    //   <Outlet />
    // </main>
  );
}
