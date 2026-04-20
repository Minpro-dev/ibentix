import { RiCheckboxCircleFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";

interface Menu {
  to: string;
  title: string;
}

interface NavigationProps {
  menus: Menu[];
}

function OutletNavigation({ menus }: NavigationProps) {
  return (
    <>
      <div className="flex gap-8 mb-10 border-b border-zinc-100">
        {menus?.map((menu, index: number) => (
          <NavLink
            key={index}
            to={menu.to}
            end // Gunakan 'end' agar "/" tidak selalu aktif saat di "/new"
            className={({ isActive }) =>
              `flex items-center gap-2 pb-3 text-sm font-medium transition-all relative ${
                isActive
                  ? "text-indigo-600"
                  : "text-zinc-500 hover:text-zinc-800"
              }`
            }>
            {({ isActive }) => (
              <>
                <span>{menu.title}</span>
                {isActive && <RiCheckboxCircleFill className="text-lg" />}
                {/* Underline Indicator */}
                {isActive && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 rounded-full" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </>
  );
}

export default OutletNavigation;
