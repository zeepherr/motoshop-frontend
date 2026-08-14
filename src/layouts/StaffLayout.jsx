import { Outlet } from "react-router";

function StaffLayout() {
  return (
    <div>
      <aside>Staff Sidebar</aside>

      <main>
        <header>Staff Header</header>
        <Outlet />
      </main>
    </div>
  );
}

export default StaffLayout;