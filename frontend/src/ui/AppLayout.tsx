import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useFetchWishlist } from "../pages/attendee/wishlist/hooks/useFetchWishlist";
import Footer from "./Footer";

function AppLayout() {
  useFetchWishlist();
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default AppLayout;
