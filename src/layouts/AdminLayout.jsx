import { Outlet } from "react-router";

function AdminLayout() {
  return (
    <div>
      <aside>Admin Sidebar</aside>

      <main>
        <header>Admin Header</header>

        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;