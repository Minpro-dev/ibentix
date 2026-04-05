import { useNavigate } from "react-router-dom";

function Unauthorized() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Access denied</h1>
      <button
        onClick={() => navigate(-1)}
        className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white  py-4 rounded-2xl shadow-xl shadow-indigo-100 transition-all active:scale-95 tracking-wider text-md">
        Previous page
      </button>
    </div>
  );
}

export default Unauthorized;
