import { RiArrowLeftLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

function OrderHeader() {
  const navigate = useNavigate();

  return (
    <header className="max-w-6xl mx-auto px-6 py-8 flex items-center gap-4">
      <button
        onClick={() => navigate(-1)}
        className="p-2 cursor-pointer hover:bg-gray-100 rounded-full transition-colors">
        <RiArrowLeftLine size={20} />
      </button>
      <h1 className="text-xl font-medium tracking-tight">Checkout Details</h1>
    </header>
  );
}

export default OrderHeader;
