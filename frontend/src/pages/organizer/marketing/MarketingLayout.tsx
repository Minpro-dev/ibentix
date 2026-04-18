import { NavLink, Outlet } from "react-router-dom";

function MarketingLayout() {
  return (
    <main>
      <div className="flex justify-center items-center">
        <div className=" flex gap-5">
          <div>
            <NavLink to="">My Promotions</NavLink>
          </div>
          <div>
            <NavLink to="new">Create promotion</NavLink>
          </div>
        </div>
      </div>

      <div>
        <Outlet />
      </div>
    </main>
  );
}

export default MarketingLayout;
