import { SidebarBrand } from "./SidebarBrand";
import { SidebarNavigation } from "./SidebarNavigation";
import { SidebarUser } from "./SidebarUser";

export function AppSidebar({
  navigation,
  workspace,
  user,
  collapsed,
  onToggle,
}) {
  return (
    <aside
      className="
        relative flex h-dvh min-h-0 flex-col
        overflow-hidden border-r bg-background shadow-ll
      "
    >
      <SidebarBrand
        workspace={workspace}
        collapsed={collapsed}
        onToggle={onToggle}
      />

      <SidebarNavigation navigation={navigation} collapsed={collapsed} />

      <SidebarUser user={user} collapsed={collapsed} />
    </aside>
  );
}
