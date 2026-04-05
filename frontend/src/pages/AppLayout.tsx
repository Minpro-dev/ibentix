import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div>
      <p>Navbar</p>
      <Outlet />
    </div>
  );
}

export default AppLayout;
