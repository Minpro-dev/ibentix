import { Outlet } from "react-router-dom";

import OutletNavigation from "../../../ui/OutletNavigation";

const promotionsNavigationData = [
  {
    to: "",
    title: "My Promotions",
  },
  {
    to: "new",
    title: "Create Promotion",
  },
];

function MarketingLayout() {
  return (
    <main>
      <div className="flex justify-center items-center">
        <OutletNavigation menus={promotionsNavigationData} />;
      </div>

      <div>
        <Outlet />
      </div>
    </main>
  );
}

export default MarketingLayout;
