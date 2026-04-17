import { NavLink, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

function AppLayoutOrganizer() {
  const user = useAuthStore((state) => state.user);
  return (
    <div>
      <div className="grid grid-cols-5 h-dvh">
        <div className="col-span-1 h-dvh w-full flex flex-col justify-between px-5 py-5 bg-slate-100 ">
          <div>
            <div className="pb-10">
              <h1 className="text-2xl font-bold text-indigo-600 hidden sm:block tracking-tight">
                Ibentix
              </h1>
              <p className="text-zinc-500 text-sm">Organzer Panel</p>
            </div>
            {/* NAVIGATIONS */}
            <nav className="text-zinc-600">
              <div className="py-3">
                <NavLink to="dashboard">Dashboard</NavLink>
              </div>

              <div className="py-3">
                <NavLink to="events">Events</NavLink>
              </div>

              <div className="py-3">
                <NavLink to="">Orders</NavLink>
              </div>

              <div className="py-3">
                <NavLink to="">Ratings & Reviews</NavLink>
              </div>

              <div className="py-3">
                <NavLink to="">Marketing</NavLink>
              </div>
            </nav>
          </div>

          <div>
            <div className="flex items-center gap-4 px-2 py-2 border border-stone-300 rounded-full">
              {/* profile */}
              <div className="w-15 h-10 overflow-hidden rounded-full ">
                <div className="w-full h-full bg-indigo-100">
                  <img
                    src={`${user?.avatar}`}
                    alt={`$user-profile-${user?.firstName}-${user?.lastName}`}
                  />
                </div>
              </div>

              {/* Name & role */}
              <div className="flex w-full  items-center">
                <div>
                  <p className="text-zinc-700 pb-1  ">
                    {user?.firstName.at(0)?.toUpperCase()}
                    {user?.firstName?.slice(1, user?.firstName.length)}{" "}
                    {user?.lastName.at(0)?.toUpperCase()}
                    {user?.lastName?.slice(1, user?.lastName.length)}
                  </p>
                  <p className="text-zinc-500 text-xs">
                    {user?.role[0]?.toUpperCase()}
                    {user?.role.slice(1, user?.role?.length).toLowerCase()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-4 col-start-2 w-full ">
          <section>
            {/* BREADCRUMBS */}
            <div className="flex fixed z-2 w-full items-center justify-between border-b px-10 border-stone-200 shadow-xs bg-white">
              <div className="flex gap-3 h-15 text-sm italic text-stone-600  items-center ">
                <NavLink to="/">Beranda</NavLink> /
                <NavLink to="/">Organizer Management</NavLink>
              </div>
              <div>
                <button className="cursor-pointer px-4 py-2 bg-zinc-100 border-slate-200 border rounded-full text-sm text-zinc-600">
                  Create event
                </button>
              </div>
            </div>

            <div className="h-dvh overflow-y-scroll px-10 pb-10 pt-20">
              <Outlet />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default AppLayoutOrganizer;
