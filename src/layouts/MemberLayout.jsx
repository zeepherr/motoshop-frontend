import { Outlet } from "react-router";

function MemberLayout() {
  return (
    <div>
      <aside>Member Navigation</aside>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default MemberLayout;