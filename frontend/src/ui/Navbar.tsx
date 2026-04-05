import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

function Navbar() {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  console.log("navbar ->", user);
  return (
    <div>
      <nav className="h-15 border-b border-zinc-400 flex justify-between items-center px-10 mb-5">
        <div>
          <p>Ibentix</p>
        </div>
        {user ? (
          <div>
            <p>{`${user?.firstName} ${user?.lastName}`}</p>
          </div>
        ) : (
          <div className="">
            <button
              onClick={() => navigate(-1)}
              className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-2xl shadow-xl shadow-indigo-100 transition-all active:scale-95 tracking-wider text-md">
              Login
            </button>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
