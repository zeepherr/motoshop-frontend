import { matchPath, Outlet, useLocation } from "react-router";

import { AppHeader } from "@/components/app-shell/AppHeader";
import { AppSidebar } from "@/components/app-shell/AppSidebar";

const findActiveNavigationItem = (pathname, navigation) => {
  return navigation.find((item) => {
    return matchPath(
      {
        path: item.to,
        end: item.end ?? false,
      },
      pathname,
    );
  });
};

export function AppShell({
  navigation,
  section,
  workspace,
  user,
  headerActions,
}) {
  const location = useLocation();

  const activeItem =
    findActiveNavigationItem(location.pathname, navigation) ?? navigation[0];

  return (
    <div
      className="
        min-h-svh
        bg-background
        text-foreground
        lg:grid
        lg:grid-cols-[260px_minmax(0,1fr)]
      "
    >
      {/* Left */}
      <AppSidebar navigation={navigation} workspace={workspace} user={user} />

      {/* Right */}
      <div className="min-w-0">
        <AppHeader
          section={section}
          title={activeItem?.label}
          actions={headerActions}
        />

        {/* Page content */}
        <main
          className="
            min-w-0
            p-4
            sm:p-6
            lg:p-8
          "
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
