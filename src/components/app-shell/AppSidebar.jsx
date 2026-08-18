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
      className={`
    relative z-40
    flex h-dvh min-h-0 flex-col
    overflow-hidden
    border-r bg-background
    shadow-sm

    transition-[width] duration-300 ease-in-out

    ${collapsed ? "w-18" : "w-65"}
  `}
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
