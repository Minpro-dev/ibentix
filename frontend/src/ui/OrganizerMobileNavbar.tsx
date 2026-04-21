import { useState } from "react";
import { NavLink } from "react-router-dom";
import { RiMenu3Fill, RiCloseLine, RiLogoutBoxLine } from "react-icons/ri";
import type { UserStore } from "../types/userType";
import { useAuthStore } from "../store/useAuthStore";
import { SIDEBAR_MENU } from "../static/sidebarRoutes";

interface MobileNavbarProps {
  user: UserStore;
}

export default function MobileNavbar({ user }: MobileNavbarProps) {
  const clearauth = useAuthStore((state) => state.clearAuth);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const renderAvatar = () => {
    if (user?.avatar) {
      return (
        <img
          src={user.avatar}
          alt="profile"
          className="w-full h-full object-cover"
        />
      );
    }
    return (
      <span className="text-indigo-600 text-sm font-black uppercase tracking-tighter">
        {user?.firstName?.charAt(0)}
        {user?.lastName?.charAt(0)}
      </span>
    );
  };

  return (
    <div className="lg:hidden">
      {/* top bar*/}
      <div className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-zinc-100 px-5 flex items-center justify-between z-100">
        <NavLink
          to="/organizer"
          className="text-xl font-bold text-indigo-600 tracking-tighter">
          Ibentix
        </NavLink>
        <button
          onClick={toggleMenu}
          className="p-2 bg-zinc-50 rounded-xl cursor-pointer text-zinc-900">
          {isOpen ? <RiCloseLine size={24} /> : <RiMenu3Fill size={24} />}
        </button>
      </div>

      {/* DRAWER OVERLAY */}
      <div
        className={`fixed inset-0 bg-zinc-900/40 backdrop-blur-sm z-110 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMenu}
      />

      <div
        className={`fixed top-0 right-0 h-full w-70 bg-white z-120 shadow-2xl transform transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}>
        <div className="flex flex-col h-full p-6">
          {/* profile */}

          <NavLink
            to="profile"
            onClick={toggleMenu}
            className={({ isActive }) => `
              flex items-center gap-4 p-4 rounded-[28px] border transition-all mb-8
              ${isActive ? "bg-indigo-600 border-indigo-600 shadow-lg shadow-indigo-100" : "bg-zinc-50 border-zinc-100"}
            `}>
            <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-white shadow-sm bg-white flex items-center justify-center shrink-0">
              {renderAvatar()}
            </div>
            <div className="min-w-0">
              <p
                className={`text-sm truncate ${user?.avatar ? "" : "text-zinc-900"} ${location.pathname.includes("profile") ? "text-white" : "text-zinc-900"}`}>
                {user?.firstName} {user?.lastName}
              </p>
              <p
                className={`text-[10px] tracking-widest ${location.pathname.includes("profile") ? "text-indigo-200" : "text-indigo-600"}`}>
                {user?.role?.toLowerCase()}
              </p>
            </div>
          </NavLink>
          <NavLink
            onClick={toggleMenu}
            to="event/new"
            className="mt-auto flex items-center justify-center gap-3 w-full py-4 bg-indigo-50 text-zinc-600 rounded-2xl text-xs  border border-indigo-100 hover:bg-indigo-600 hover:text-white transition-all">
            Create Event
          </NavLink>

          {/* sidebar */}
          <div className="flex-1 overflow-y-auto py-3">
            <nav className="grid grid-cols-2 gap-3">
              {SIDEBAR_MENU.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.to}
                  end={item.to === ""}
                  onClick={toggleMenu}
                  className={({ isActive }) => `
                    flex flex-col items-center justify-center gap-2 p-4 rounded-3xl transition-all
                    ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100"
                        : "bg-zinc-50 text-zinc-500 hover:bg-zinc-100"
                    }
                  `}>
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-[9px]">{item.label.split(" ")[0]}</span>
                </NavLink>
              ))}
            </nav>
          </div>

          {/* LOGOUT */}
          <button
            onClick={() => {
              toggleMenu();
              clearauth();
            }}
            className="mt-auto flex items-center justify-center gap-3 w-full py-4 bg-red-50 text-red-600 rounded-2xl text-xs cursor-pointer border border-red-100 hover:bg-red-600 hover:text-white transition-all">
            <RiLogoutBoxLine size={18} />
            Logout Account
          </button>
        </div>
      </div>
    </div>
  );
}
