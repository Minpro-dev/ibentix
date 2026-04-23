import { RiArrowLeftLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

function DetailsHeader() {
  const navigate = useNavigate();

  return (
    <header className="max-w-6xl mx-auto px-6 py-6">
      <button
        onClick={() => navigate(-1)}
        className="group cursor-pointer flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors">
        <RiArrowLeftLine className="transition-transform group-hover:-translate-x-1" />
        <span>Back</span>
      </button>
    </header>
  );
}

export default DetailsHeader;
