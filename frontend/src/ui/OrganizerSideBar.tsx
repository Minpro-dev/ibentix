import { NavLink } from "react-router-dom";
import { SIDEBAR_MENU } from "../static/sidebarRoutes";
import SideBarMenuItemOrganizer from "./SideBarMenuItemOrganizer";
import type { UserProfile } from "../types/userType";

interface OrganizerSideBarProps {
  user: UserProfile;
}

function OrganizerSideBar({ user }: OrganizerSideBarProps) {
  return (
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

        {/* navigations */}
        <nav className="space-y-1">
          {SIDEBAR_MENU.map((item, index: number) => (
            <SideBarMenuItemOrganizer key={index} item={item} />
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
  );
}

export default OrganizerSideBar;
