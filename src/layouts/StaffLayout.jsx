import { AppShell } from "./AppShell";
export function StaffLayout() {
  return (
    <AppShell
      navigation={staffNavigation}
      section="Staff"
      workspace="Staff workspace"
      user={staffUser}
    />
  );
}
