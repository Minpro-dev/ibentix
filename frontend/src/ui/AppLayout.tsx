import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useFetchWishlist } from "../pages/attendee/wishlist/hooks/useFetchWishlist";

function AppLayout() {
  useFetchWishlist();
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default AppLayout;
