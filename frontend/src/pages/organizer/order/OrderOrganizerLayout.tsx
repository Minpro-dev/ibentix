import { Outlet } from "react-router-dom";
import OutletNavigation from "../../../ui/OutletNavigation";
import OrderHeader from "./components/OrderHeader";

const orderNavigationData = [
  {
    to: "",
    title: "New",
  },
  {
    to: "completed",
    title: "Completed",
  },
];

function OrderOrganizerLayout() {
  return (
    <main>
      <OrderHeader />
      <div className="flex justify-center items-center">
        <OutletNavigation menus={orderNavigationData} />
      </div>
      <div>
        <Outlet />
      </div>
    </main>
  );
}

export default OrderOrganizerLayout;
