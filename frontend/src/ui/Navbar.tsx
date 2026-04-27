import { useState } from "react";
import { Search, Coins } from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useEventStore } from "../store/useEventStore";
import { useFetchUserPoints } from "../pages/attendee/order/hooks/useFetchUserPoints";
import Button from "./Button";
import FreeToggle from "./FreeToogle";
import ProfileDropdown from "./ProfileDropdown";
import { MENU_ITEMS } from "../static/navbarMenusStatic";
import { capitalize } from "../utils/capitalize";
import defaultAvatar from "./../assets/static/EventThumnailImage.jpg";
import { useLogoutMutation } from "../pages/attendee/logout/hooks/useLogoutMutation";
import { useEventWishlistStore } from "../store/useEventWishlistStore";

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const user = useAuthStore((state) => state.user);
  const wishlist = useEventWishlistStore((state) => state.wishlistIds);
  const totalWishlist = wishlist.length;
  const isLoggin = !!user;
  const { search, setSearch } = useEventStore();
  const { pointsData } = useFetchUserPoints(isLoggin);
  const { mutate: logout, isPending } = useLogoutMutation();

  const userPoints = pointsData?.data.points;
  const isEventRoute = location.pathname === "/events";

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-zinc-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center h-20 gap-8">
          {/* 1. Logo */}
          <div
            onClick={() => navigate("/")}
            className={`${isEventRoute && "hidden sm:block"} shrink-0 cursor-pointer`}>
            <span className="text-xl sm:text-2xl font-black text-indigo-600 tracking-tighter uppercase">
              Ibentix<span className="text-zinc-900">.</span>
            </span>
          </div>

          {/* 2. Search Bar Section */}
          {isEventRoute && (
            <div className="flex-1 max-w-lg flex items-center gap-3">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <input
                  type="text"
                  value={search}
                  placeholder="Search events..."
                  className="w-full pl-11 pr-4 py-2 sm:py-3 bg-zinc-50 border-none rounded-2xl text-xs sm:text-sm focus:ring-2  text-zinc-500 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <FreeToggle />
            </div>
          )}

          <div className="flex items-center gap-2 md:gap-8">
            <div className="hidden lg:flex items-center gap-6">
              {MENU_ITEMS.slice(0, 2).map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `
    relative flex flex-col cursor-pointer items-center transition-all group pt-2 pb-1
    ${isActive ? "text-indigo-600" : "text-zinc-500 hover:text-indigo-600"} ${item?.path === "/wishlist" ? "relative" : ""}
  `}>
                  <item.icon
                    size={20}
                    className="group-hover:scale-110 transition-transform"
                  />
                  <span className="text-[10px] mt-1.5">{item.label}</span>
                  {item?.path === "/wishlist"
                    ? totalWishlist > 0 && (
                        <div className="absolute top-1 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-500 ring-2 ring-white">
                          <span className="text-[10px] text-white leading-none">
                            {totalWishlist}
                          </span>
                        </div>
                      )
                    : null}
                </NavLink>
              ))}
            </div>

            {/* Profile Logic */}
            {user && user.isVerified && user.role === "ATTENDEE" ? (
              <div
                className="relative"
                onMouseEnter={() => setIsProfileOpen(true)}
                onMouseLeave={() => setIsProfileOpen(false)}>
                <div className="flex items-center gap-3 bg-zinc-50 hover:bg-indigo-50 p-1.5 pr-4 rounded-2xl border border-transparent hover:border-indigo-100 cursor-pointer transition-all">
                  <img
                    src={user?.avatar || defaultAvatar}
                    alt="User"
                    className="w-9 h-9 rounded-xl object-cover shadow-sm"
                  />
                  <div className="hidden md:block">
                    <p className="text-[11px] font-semibold text-zinc-900 tracking-tight leading-none">
                      {capitalize(user.firstName)}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <Coins size={10} className="text-indigo-600" />
                      <p className="text-[10px] font-semibold text-indigo-600">
                        IDR {userPoints?.toLocaleString("id-ID") || 0}
                      </p>
                    </div>
                  </div>
                </div>

                {isProfileOpen && (
                  <ProfileDropdown
                    user={user}
                    userPoints={userPoints}
                    onNavigate={navigate}
                    onLogout={logout}
                    isPending={isPending}
                  />
                )}
              </div>
            ) : (
              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  onClick={() => navigate("/signup")}
                  className="px-8 rounded-2xl tracking-widest text-[11px]">
                  Signup
                </Button>
                <Button
                  onClick={() => navigate("/login")}
                  className="px-8 rounded-2xl tracking-widest text-[11px]">
                  Login
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
