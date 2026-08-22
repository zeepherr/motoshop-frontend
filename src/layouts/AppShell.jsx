import { matchPath, Outlet, useLocation } from "react-router";

import { AppHeader } from "@/components/app-shell/AppHeader";
import { AppSidebar } from "@/components/app-shell/AppSidebar";
import { useState } from "react";

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
export function AppShell({ navigation, section, workspace, user }) {
  const location = useLocation();
  const activeItem =
    findActiveNavigationItem(location.pathname, navigation) ?? navigation[0];
  const [collapsed, setCollapsed] = useState(() => {
    return localStorage.getItem("sidebar-collapsed") === "true";
  });
  const toggleSidebar = () => {
    setCollapsed((prev) => {
      const next = !prev;

      localStorage.setItem("sidebar-collapsed", String(next));

      return next;
    });
  };
  return (
    <div
      className="grid h-dvh
    grid-cols-[72px_minmax(0,1fr)]
    overflow-hidden
    bg-background
    text-foreground"
    >
      {/* Left */}
      <AppSidebar
        navigation={navigation}
        workspace={workspace}
        user={user}
        collapsed={collapsed}
        onToggle={toggleSidebar}
      />

      {/* Right */}
      <div className="flex relative min-h-0 min-w-0 flex-col">
        <AppHeader section={section} title={activeItem?.label} />

        {/* Page content */}
        <main
          className="
            min-h-0
            min-w-0
            flex-1
            sm:mt-8
            mt-13
            relative
            overflow-y-auto
            scroll-smooth
            scrollbar-none
            [-ms-overflow-style:none]
            [&::-webkit-scrollbar]:hidden
            sm:px-2
            py-2
            sm:p-4
            lg:p-5
            mx-0
          "
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
