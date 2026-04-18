import { RiCheckboxCircleFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";

function PromotionNavigation() {
  return (
    <div className="flex gap-8 mb-10 border-b border-zinc-100">
      <NavLink
        to=""
        end // Gunakan 'end' agar "/" tidak selalu aktif saat di "/new"
        className={({ isActive }) =>
          `flex items-center gap-2 pb-3 text-sm font-medium transition-all relative ${
            isActive ? "text-indigo-600" : "text-zinc-500 hover:text-zinc-800"
          }`
        }>
        {({ isActive }) => (
          <>
            <span>My Promotions</span>
            {isActive && <RiCheckboxCircleFill className="text-lg" />}
            {/* Underline Indicator */}
            {isActive && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 rounded-full" />
            )}
          </>
        )}
      </NavLink>

      <NavLink
        to="new"
        className={({ isActive }) =>
          `flex items-center gap-2 pb-3 text-sm font-medium transition-all relative ${
            isActive ? "text-indigo-600" : "text-zinc-500 hover:text-zinc-800"
          }`
        }>
        {({ isActive }) => (
          <>
            <span>Create Promotion</span>
            {isActive && <RiCheckboxCircleFill className="text-lg" />}
            {isActive && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 rounded-full" />
            )}
          </>
        )}
      </NavLink>
    </div>
  );
}

export default PromotionNavigation;
