import React from "react";
import { useLocation, Link } from "react-router-dom";
import { RiArrowRightSLine, RiHome4Line } from "react-icons/ri";

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav className="flex items-center gap-2 text-[10px] h-15  italic tracking-widest text-zinc-400">
      {/* root*/}
      <Link
        to="/organizer"
        className="hover:text-indigo-600 transition-colors flex items-center gap-1">
        <RiHome4Line size={14} />
        <span>Ibentix</span>
      </Link>

      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;

        const label = value;

        return (
          <React.Fragment key={to}>
            <RiArrowRightSLine size={14} className="text-zinc-300" />
            {last ? (
              <span className="text-zinc-900 truncate max-w-37.5">
                {label.replace(/-/g, " ")}
              </span>
            ) : (
              <Link to={to} className="hover:text-indigo-600 transition-colors">
                {label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
