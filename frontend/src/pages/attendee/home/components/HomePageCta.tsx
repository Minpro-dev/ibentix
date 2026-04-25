import { RiArrowRightLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

function HomePageCta() {
  const navigate = useNavigate();

  return (
    <section className="mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 bg-white border border-zinc-100 rounded-3xl">
        <div className="space-y-1.5">
          {/* Subtle Section Label */}
          <p className="text-xs text-indigo-500/80">Discovery</p>

          <h2 className="text-2xl font-medium text-zinc-900 tracking-tight">
            Recommended <span className="text-zinc-500 font-light">Events</span>
          </h2>

          <p className="text-zinc-400 text-sm">
            Handpicked experiences happening in your city.
          </p>
        </div>

        <div>
          <button
            onClick={() => navigate("/events")}
            className="group cursor-pointer flex items-center gap-2 px-5 py-2.5 bg-zinc-900 text-white rounded-xl text-[11px] font-medium tracking-wider hover:bg-indigo-600 transition-all duration-300 active:scale-95 shadow-sm">
            View All
            <RiArrowRightLine className="text-base opacity-70 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default HomePageCta;
