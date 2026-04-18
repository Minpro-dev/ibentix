import { Outlet } from "react-router-dom";
import PromotionNavigation from "./components/PromotionNavigation";

function MarketingLayout() {
  return (
    <main>
      <div className="flex justify-center items-center">
        <PromotionNavigation />
      </div>

      <div>
        <Outlet />
      </div>
    </main>
  );
}

export default MarketingLayout;
