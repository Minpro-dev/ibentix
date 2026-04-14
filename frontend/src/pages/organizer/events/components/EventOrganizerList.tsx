import {
  Calendar,
  Edit3,
  ExternalLink,
  MapPin,
  Trash2,
  Users,
} from "lucide-react";
import Button from "../../../../ui/Button";

function EventOrganizerList() {
  return (
    <div>
      <div className="group bg-white border border-slate-200 rounded-2xl p-4 hover:shadow-md transition-all duration-200">
        <div className="flex flex-col items-center lg:flex-row gap-6">
          {/* 1. Thumbnail Area */}
          <div className="relative w-full lg:w-58 h-42 shrink-0">
            <img
              src="https://media.nbclosangeles.com/2025/04/GettyImages-2210019547.jpg?quality=85&strip=all&resize=1200%2C675"
              alt="demo"
              className="w-full h-full object-cover rounded-xl border border-slate-100"
            />
            <div className="absolute top-2 left-2">
              <span
                className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase bg-indigo-100 text-indigo-700"
                `}>
                Free
              </span>
            </div>
          </div>

          {/* 2. Content Info */}
          <div className="flex-1 min-w-0">
            <div className="block md:flex gap-10 justify-between items-start md:pb-10 pb-0">
              <div className="w-[80%]">
                <h3 className="text-lg font-semibold text-zinc-900 truncate group-hover:text-indigo-600 transition-colors">
                  Purwadhika BSD Open House
                </h3>
                <p className="text-sm text-zinc-500 line-clamp-2 mt-1">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Molestiae error vel blanditiis earum magnam non saepe alias ex
                  consequuntur illo, a hic nisi quisquam, et enim ab
                  perspiciatis sed suscipit?
                </p>
              </div>
              <div className="w-full md:py-0 py-5">
                <p className="text-xs text-zinc-400 font-medium pb-2">Price</p>
                <p className="text-md font-semibold text-zinc-900">
                  Rp. 300,000
                </p>
              </div>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              <div className="flex items-center gap-2 text-zinc-600">
                <Calendar size={16} className="text-indigo-500" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-zinc-400 uppercase font-bold">
                    Date
                  </span>
                  <span className="text-xs font-semibold">15 March 2026</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-zinc-600">
                <MapPin size={16} className="text-indigo-500" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-zinc-400 uppercase font-bold">
                    Location
                  </span>
                  <span className="text-xs font-semibold truncate">
                    Tanggerang
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-zinc-600">
                <Users size={16} className="text-indigo-500" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-zinc-400 uppercase font-bold">
                    Sisa Slot
                  </span>
                  <span className="text-xs font-semibold">10 Seat</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Action Buttons */}
          <div className="flex lg:flex-col justify-end items-center gap-2 border-t lg:border-t-0 lg:border-l border-slate-100 pt-4 lg:pt-0 lg:pl-6">
            <Button
              variant="secondary"
              size="sm"
              className="w-full lg:w-32 cursor-pointer"
              //   onClick={() => onEdit(event.slug)}
            >
              <Edit3 size={14} />
              Edit
            </Button>
            <Button
              variant="danger"
              size="sm"
              className="w-full lg:w-32 border-red-200 text-red-600 bg-white hover:bg-red-50 cursor-pointer"

              //   onClick={() => onDelete(event.slug)}
            >
              <Trash2 size={14} />
              Delete
            </Button>
            <button className="p-2 text-zinc-400 hover:text-indigo-600 transition-colors">
              <ExternalLink size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventOrganizerList;

// title: string;
// slug: string;
// description: string | null;
// availableSlot: number;
// thumbnailUrl: string | null;
// locationName: string;
// address: string;
// city: string;
// eventDate: Date;
// startSellingDate: Date;
// endSellingDate: Date;
// isFree: boolean;
// price: Decimal;
