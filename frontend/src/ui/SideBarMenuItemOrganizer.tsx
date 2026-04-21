import { NavLink } from "react-router-dom";

function SideBarMenuItemOrganizer({ item }: any) {
  return (
    <NavLink
      key={item.label}
      to={item.to}
      end={item.to === ""}
      className={({ isActive }) => `
          flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group
          ${
            isActive
              ? "bg-indigo-100 text-zinc-700 "
              : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
          }
        `}>
      <span className="text-xl opacity-70 group-hover:opacity-100 transition-opacity">
        {item.icon}
      </span>
      <span className="text-sm">{item.label}</span>
    </NavLink>
  );
}

export default SideBarMenuItemOrganizer;
