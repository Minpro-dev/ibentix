import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import { useAuthStore } from "../store/useAuthStore";
import { Toaster } from "sonner";
import { SIDEBAR_MENU } from "../static/sidebarRoutes";
import SideBarMenuItemOrganizer from "./SideBarMenuItemOrganizer";
import Breadcrumbs from "./BreadCrumbsOrganizer";

function AppLayoutOrganizer() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  return (
    <div>
      <div className="grid grid-cols-5 h-dvh">
        <div className="col-span-1 h-dvh w-full flex flex-col justify-between px-5 py-5 bg-slate-100 ">
          <div className="flex flex-col h-full py-6 px-4">
            {/* LOGO SECTION */}
            <div className="pb-10 px-2">
              <h1 className="text-2xl font-bold text-indigo-600 tracking-tighter">
                Ibentix
              </h1>
              <p className="text-xs  text-zinc-400  tracking-[0.2em] mt-1">
                Organizer Panel
              </p>
            </div>

            {/* NAVIGATIONS DENGAN MAP */}
            <nav className="space-y-1">
              {SIDEBAR_MENU.map((item) => (
                <SideBarMenuItemOrganizer item={item} />
              ))}
            </nav>
          </div>

          <NavLink to="profile" className="block group">
            <div className="flex items-center gap-3 p-1.5 pr-6 border border-zinc-300 rounded-full hover:border-indigo-400 hover:bg-indigo-50/30 transition-all duration-300">
              {/* Profile Avatar Container */}
              <div className="w-10 h-10 rounded-full overflow-hidden border border-zinc-100 bg-indigo-50 shrink-0">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt="user-profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-indigo-600 text-xs font-semibold">
                    {user?.firstName?.charAt(0)}
                    {user?.lastName?.charAt(0)}
                  </div>
                )}
              </div>

              {/* Name & Role */}
              <div className="flex flex-col min-w-0">
                <p className="text-sm font-semibold t- text-zinc-800 capitalize truncate leading-tight">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-[10px] text-zinc-400 capitalize tracking-widest leading-tight mt-0.5">
                  {user?.role?.toLowerCase()}
                </p>
              </div>
            </div>
          </NavLink>
        </div>
        <div className="col-span-4 col-start-2 w-full ">
          <section>
            {/* BREADCRUMBS */}
            <div className="flex fixed z-2 w-[80%] items-center justify-between border-b px-10 border-stone-200 shadow-xs bg-white">
              <Breadcrumbs />
              <div className="flex gap-4 items-center">
                <div>
                  <button
                    onClick={() => navigate("event/new")}
                    className="cursor-pointer px-4 py-2 bg-zinc-100 border-slate-200 border rounded-2xl text-sm text-zinc-600">
                    Create event
                  </button>
                </div>
                <div
                  onClick={clearAuth}
                  className="bg-red-50 px-3 py-2 cursor-pointer hover:bg-red-100 transition-all duration-500 flex items-center rounded-xl">
                  <button>
                    <LuLogOut className="font-3xl text-red-600 cursor-pointer" />
                  </button>
                </div>
              </div>
            </div>

            <div className="h-dvh overflow-y-scroll px-10 pb-10 pt-20">
              <Outlet />
              <Toaster theme="system" />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default AppLayoutOrganizer;
