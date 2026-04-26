import { Outlet, useNavigate } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import { useAuthStore } from "../store/useAuthStore";
import { Toaster } from "sonner";
import Breadcrumbs from "./BreadCrumbsOrganizer";
import OrganizerSideBar from "./OrganizerSideBar";
import MobileNavbar from "./OrganizerMobileNavbar";
import Button from "./Button";
import { useLogoutMutation } from "../pages/attendee/logout/hooks/useLogoutMutation";

function AppLayoutOrganizer() {
  const { mutate: logout, isPending } = useLogoutMutation();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  return (
    <div>
      <div className="grid grid-cols-5 h-dvh">
        {/* sidebar */}
        <aside className="hidden lg:block">
          <OrganizerSideBar user={user!} />
        </aside>

        {/* mobile navbar */}
        <MobileNavbar user={user!} />

        <div className="col-span-5 col-start-1 lg:col-span-4 lg:col-start-2 w-full ">
          <section>
            {/* BREADCRUMBS */}

            <div className="hidden md:flex fixed z-2 w-[80%] items-center justify-between border-b px-10 border-stone-200 shadow-xs bg-white">
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
                  <Button
                    disabled={isPending}
                    variant="danger"
                    onClick={() => logout()}>
                    <LuLogOut className="font-3xl text-red-600" />
                  </Button>
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
