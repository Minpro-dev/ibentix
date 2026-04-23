import { RiAddLine, RiInformationLine, RiSubtractLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

interface DetailsActionBar {
  isFree: boolean;
  price: string;
  handleIncrement: () => void;
  handleDecrement: () => void;
  ticketCount: number;
  availableSlot: number;
  eventId: string;
  endSellingDate: string;
}

function DetailsActionBar({
  isFree,
  price,
  handleIncrement,
  handleDecrement,
  ticketCount,
  availableSlot,
  eventId,
  endSellingDate,
}: DetailsActionBar) {
  const navigate = useNavigate();
  const totalPrice = isFree ? 0 : Number(price) * ticketCount;

  return (
    <div className="sticky top-18 border rounded-xl border-gray-200 p-10 bg-white">
      <h3 className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-10">
        Reservation
      </h3>

      <div className="space-y-12">
        {/* PRICE */}
        <div>
          <p className="text-3xl font-light text-black">
            {isFree ? "Free" : `Rp ${Number(price).toLocaleString("id-ID")}`}
          </p>
          <p className="text-xs text-gray-400 mt-2">Price per person</p>
        </div>

        {/* QUANTITY */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-6">
          <span className="text-sm font-medium">Quantity</span>
          <div className="flex items-center gap-6">
            <button
              onClick={handleDecrement}
              className="p-1 hover:text-indigo-600 transition-colors cursor-pointer disabled:text-gray-300"
              disabled={ticketCount <= 1}>
              <RiSubtractLine size={20} />
            </button>
            <span className="text-lg font-medium w-6 text-center">
              {ticketCount}
            </span>
            <button
              onClick={handleIncrement}
              className="p-1 cursor-pointer hover:text-indigo-600 transition-colors disabled:text-gray-300"
              disabled={ticketCount >= availableSlot}>
              <RiAddLine size={20} />
            </button>
          </div>
        </div>

        {/* TOTAL */}
        <div className="flex justify-between items-end">
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-400">
              Total Price
            </p>
            <p className="text-2xl font-medium text-black mt-2">
              Rp {totalPrice.toLocaleString("id-ID")}
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="space-y-4">
          <button
            onClick={() => navigate(`/order/${eventId}?qty=${ticketCount}`)}
            disabled={availableSlot === 0}
            className="w-full cursor-pointer rounded-xl bg-black text-white py-5 text-sm font-bold uppercase tracking-widest hover:bg-indigo-700 transition-all disabled:bg-gray-200 disabled:text-gray-400">
            {availableSlot === 0 ? "Sold Out" : "Book Tickets"}
          </button>

          <div className="flex items-start gap-2 text-[11px] text-gray-400 uppercase tracking-wider leading-tight">
            <RiInformationLine className="shrink-0" />
            <span>
              Tickets available until{" "}
              {new Date(endSellingDate).toLocaleDateString("id-ID")} • Only{" "}
              {availableSlot} slots left
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsActionBar;
