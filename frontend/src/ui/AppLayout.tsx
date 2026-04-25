import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useFetchWishlist } from "../pages/attendee/wishlist/hooks/useFetchWishlist";
import Footer from "./Footer";
import { Toaster } from "sonner";

function AppLayout() {
  useFetchWishlist();
  return (
    <div>
      <Navbar />
      <Outlet />
      <Toaster theme="system" />
      <Footer />
    </div>
  );
}

export default AppLayout;
