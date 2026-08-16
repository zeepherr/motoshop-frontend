import { Plus } from "lucide-react";

import { adminNavigation } from "@/config/navigation/admin.navigation";
import { AppShell } from "@/layouts/AppShell";

const adminUser = {
  name: "Admin HurngMoto",
  role: "admin",
  initials: "AH",
};

export function AdminLayout() {
  return (
    <AppShell
      navigation={adminNavigation}
      section="Admin"
      workspace="Shop management"
      user={adminUser}
      headerActions={
        <button
          type="button"
          className="
            hidden h-9 items-center gap-2
            rounded-lg
            bg-primary
            px-4
            text-sm font-medium
            text-primary-foreground
            sm:flex
          "
        >
          <Plus className="size-4" />
          New Sale
        </button>
      }
    />
  );
}
