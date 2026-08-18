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
      className={`
        grid h-dvh overflow-hidden
        bg-background text-foreground
        transition-[grid-template-columns] duration-300 ease-in-out

        ${
          collapsed
            ? "grid-cols-[72px_minmax(0,1fr)]"
            : "grid-cols-[260px_minmax(0,1fr)]"
        }
      `}
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
            mt-10
            relative
            overflow-y-auto
            scroll-smooth
            [scrollbar-with:none]
            [-ms-overflow-style:none]
            [&::-webkit-scrollbar]:hidden
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
