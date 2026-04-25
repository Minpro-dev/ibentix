import { House, LogOut } from "lucide-react";

import { capitalize } from "../utils/capitalize";
import { MENU_ITEMS } from "../static/navbarMenusStatic";
import type { NavigateFunction } from "react-router-dom";

interface ProfileDropdownProps {
  user: {
    firstName: string;
    lastName: string;
  };
  userPoints: number;
  onNavigate: NavigateFunction;
  onLogout: () => void;
}

export default function ProfileDropdown({
  user,
  userPoints,
  onNavigate,
  onLogout,
}: ProfileDropdownProps) {
  return (
    <div className="absolute right-0 w-64 bg-white border border-slate-100 rounded-2xl shadow-xl py-3 z-50 animate-in fade-in zoom-in-95 duration-200">
      {/* Mobile-only Header */}
      <div className="px-5 py-3 border-b border-slate-50 lg:hidden mb-2">
        <p className="text-sm text-zinc-900">
          {capitalize(user.firstName)} {user.lastName}
        </p>
        <p className="text-xs text-indigo-600 mt-1">
          IDR {userPoints?.toLocaleString("id-ID")}
        </p>
      </div>

      <button
        onClick={() => onNavigate("/")}
        className="flex sm:hidden cursor-pointer items-center gap-3 px-5 py-2.5 text-sm text-zinc-600 hover:bg-indigo-50/50 hover:text-indigo-600 w-full text-left transition-colors">
        <House size={18} strokeWidth={2.5} />
        <span>Home</span>
      </button>
      {/* Mapped Menu Items */}
      {MENU_ITEMS.map((item) => (
        <button
          key={item.path}
          onClick={() => onNavigate(item.path)}
          className="flex cursor-pointer items-center gap-3 px-5 py-2.5 text-sm text-zinc-600 hover:bg-indigo-50/50 hover:text-indigo-600 w-full text-left transition-colors">
          <item.icon size={18} strokeWidth={2.5} />
          <span>{item.label}</span>
        </button>
      ))}

      {/* Logout Section */}
      <div className="border-t border-slate-50 mt-3 pt-2">
        <button
          onClick={onLogout}
          className="flex cursor-pointer items-center gap-3 px-5 py-2.5 text-sm text-red-500 hover:bg-red-50 w-full text-left transition-colors">
          <LogOut size={18} strokeWidth={2.5} /> Logout
        </button>
      </div>
    </div>
  );
}
