import { useState } from "react";
import {
  Search,
  Heart,
  Ticket,
  LogOut,
  Settings,
  Compass,
  Coins,
  PlusCircle,
  X,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import Button from "./Button";
import { useLocation, useNavigate } from "react-router-dom"; // Tambahkan Link jika menggunakan react-router
import { useEventStore } from "../store/useEventStore";

const Navbar = () => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.clearAuth);
  const setSearch = useEventStore((state) => state.setSearch);
  const search = useEventStore((state) => state.search);

  const location = useLocation();
  console.log("location", location);

  const isEventRoute = location.pathname === "/events";

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-4">
          {/*  Logo */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2 shrink-0 cursor-pointer">
            <span className="text-xl font-bold text-indigo-600 hidden sm:block tracking-tight">
              Ibentix
            </span>
          </div>

          {/*  Search Bar & Filter Button */}
          {isEventRoute && (
            <div className="flex-1 max-w-xl flex items-center gap-2">
              <div className="relative w-full">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-zinc-400" />
                </span>
                <input
                  type="text"
                  value={search}
                  className="block w-full pl-10 pr-3 py-2 bg-slate-50 border border-transparent rounded-full text-sm placeholder-zinc-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="Search events..."
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div>
                <p>Free</p>
              </div>
            </div>
          )}

          {/* Nav Links & Profile */}
          <div className="flex items-center gap-2 sm:gap-6">
            {/*  Create Event (Desktop) */}
            {user && (
              <button
                onClick={() => navigate("/create-event")}
                className="hidden md:flex flex-col items-center text-zinc-500 hover:text-indigo-600 transition-colors">
                <PlusCircle size={20} />
                <span className="text-[10px] font-medium mt-1">Create</span>
              </button>
            )}

            {/* 4) Favorites */}
            <button
              onClick={() => navigate("/wishlist")}
              className="hidden md:flex flex-col items-center text-zinc-500 hover:text-indigo-600 transition-colors cursor-pointer">
              <Heart size={20} />
              <span className="text-[10px] font-medium mt-1">Favorites</span>
            </button>

            {/* 5) Tickets */}
            <button
              onClick={() => navigate("/myticket")}
              className="hidden md:flex flex-col items-center text-zinc-500 hover:text-indigo-600 transition-colors">
              <Ticket size={20} />
              <span className="text-[10px] font-medium mt-1">Tickets</span>
            </button>

            {/* 6) Profile with Hover Popover */}
            {user ? (
              <div
                className="relative py-2"
                onMouseEnter={() => setIsProfileOpen(true)}
                onMouseLeave={() => setIsProfileOpen(false)}>
                <div className="flex items-center gap-3 bg-slate-50 p-1 pr-3 rounded-full border border-slate-100 cursor-pointer hover:border-indigo-200 transition-all">
                  <img
                    src={`${user.avatar}`}
                    alt="Avatar"
                    className="w-8 h-8 rounded-full border border-white shadow-sm"
                  />
                  <div className="hidden lg:block text-left">
                    <p className="text-xs font-bold text-zinc-900 leading-none">
                      {user.firstName} {user.lastName}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <Coins size={10} className="text-indigo-600" />
                      <p className="text-[10px] font-bold text-indigo-600">
                        IDR 2,000
                      </p>
                    </div>
                  </div>
                </div>

                {/* Profile Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-0 w-56 bg-white border border-slate-100 rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-2 border-b border-slate-50 lg:hidden">
                      <p className="text-sm font-bold text-zinc-900">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-xs text-indigo-600 font-bold">
                        IDR 2,000
                      </p>
                    </div>

                    {/* Create Event (Mobile Dropdown Only) */}
                    <button
                      onClick={() => navigate("/create-event")}
                      className="flex md:hidden items-center gap-3 px-4 py-2 text-sm text-indigo-600 font-semibold hover:bg-slate-50">
                      <PlusCircle size={16} /> Create Event
                    </button>

                    <button
                      onClick={() => navigate("/event")}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-zinc-600 hover:bg-slate-50 hover:text-indigo-600 w-full text-left">
                      <Compass size={16} /> Browse Events
                    </button>
                    <button
                      onClick={() => navigate("/details")}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-zinc-600 hover:bg-slate-50 w-full text-left">
                      <Settings size={16} /> Account Settings
                    </button>
                    <div className="border-t border-slate-50 mt-2 pt-2">
                      <button
                        onClick={logout}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-50 w-full text-left">
                        <LogOut size={16} /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Button variant="primary" onClick={() => navigate("/login")}>
                Login
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* --- Filter Modal (Tetap Sama) --- */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm transition-opacity">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-zinc-900">Filter Events</h3>
              <button
                onClick={() => setIsFilterModalOpen(false)}
                className="p-1 text-zinc-400 hover:text-zinc-600">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-zinc-700 mb-2">
                  Category
                </label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
                  <option>All Categories</option>
                  <option>Music</option>
                  <option>Technology</option>
                  <option>Workshop</option>
                </select>
              </div>
              <button
                onClick={() => setIsFilterModalOpen(false)}
                className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-[0.98] mt-4">
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
