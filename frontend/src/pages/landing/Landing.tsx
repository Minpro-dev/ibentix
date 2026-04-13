import { useState } from "react";
import {
  Search,
  MapPin,
  Calendar,
  //   User,
  Menu,
  X,
  Filter,
  ChevronRight,
  Ticket,
} from "lucide-react";

// --- Dummy Data ---
const CATEGORIES = ["All", "Music", "Tech", "Workshop", "Business", "Sports"];
const DUMMY_EVENTS = [
  {
    id: 1,
    name: "Jakarta Tech Conference 2026",
    price: 150000,
    date: "24 Oct 2026",
    location: "Gelora Bung Karno, Jakarta",
    seats: 45,
    category: "Tech",
    image:
      "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    name: "Summer Indie Music Fest",
    price: 0,
    date: "12 Nov 2026",
    location: "Kuta, Bali",
    seats: 120,
    category: "Music",
    image:
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    name: "Startup Pitching Masterclass",
    price: 75000,
    date: "05 Dec 2026",
    location: "Online",
    seats: 10,
    category: "Business",
    image:
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800",
  },
];

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter Logic (Simple State)
  const filteredEvents = DUMMY_EVENTS.filter((event) => {
    const matchesCategory =
      activeCategory === "All" || event.category === activeCategory;
    const matchesSearch = event.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-zinc-900 font-sans">
      {/* --- NAVBAR --- */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Ticket className="text-white w-5 h-5" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-indigo-600">
                Ibentix
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <button className="text-sm font-medium text-zinc-600 hover:text-indigo-600 transition-colors">
                Find Events
              </button>
              <button className="text-sm font-medium text-zinc-600 hover:text-indigo-600 transition-colors">
                Create Event
              </button>
              <div className="h-6 w-[1px] bg-slate-200"></div>
              <button className="text-sm font-semibold text-zinc-700">
                Login
              </button>
              <button className="bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-indigo-700 transition-all shadow-md hover:shadow-indigo-200">
                Register
              </button>
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-zinc-600">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="relative py-16 md:py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl md:text-6xl font-extrabold text-zinc-900 tracking-tight mb-6">
              Don't miss out on{" "}
              <span className="text-indigo-600">incredible</span> experiences.
            </h1>
            <p className="text-lg text-zinc-500 mb-8">
              Discover, book, and host events seamlessly on Indonesia's most
              trusted event management platform.
            </p>

            {/* Search Bar - Note: Add debounce in production */}
            <div className="relative max-w-2xl mx-auto group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-zinc-400 group-focus-within:text-indigo-600 transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none shadow-sm"
                placeholder="Search events, concerts, or workshops..."
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
        {/* Subtle Background Decoration */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-50"></div>
      </header>

      {/* --- DISCOVERY & FILTERING --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100"
                    : "bg-white text-zinc-600 border border-slate-200 hover:border-indigo-300"
                }`}>
                {cat}
              </button>
            ))}
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-zinc-600 hover:bg-slate-50 transition-colors">
            <Filter size={16} />
            More Filters
          </button>
        </div>

        {/* --- EVENT GRID --- */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                {/* Image Wrap */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-indigo-600">
                      {event.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 text-indigo-600 text-xs font-semibold mb-2">
                    <Calendar size={14} />
                    {event.date}
                  </div>
                  <h3 className="text-lg font-bold text-zinc-900 mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                    {event.name}
                  </h3>
                  <div className="flex items-center gap-1 text-zinc-500 text-sm mb-4">
                    <MapPin size={14} />
                    {event.location}
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-zinc-400 font-medium">
                        Starts from
                      </p>
                      <p className="text-lg font-bold text-zinc-900">
                        {event.price === 0
                          ? "FREE"
                          : `IDR ${event.price.toLocaleString()}`}
                      </p>
                    </div>
                    <button className="p-2 bg-slate-100 rounded-full text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* --- EMPTY STATE --- */
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="text-slate-400" size={32} />
            </div>
            <h3 className="text-xl font-bold text-zinc-900">No events found</h3>
            <p className="text-zinc-500 mt-2">
              Try adjusting your filters or search keywords.
            </p>
            <button
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
              }}
              className="mt-6 text-indigo-600 font-semibold hover:underline">
              Clear all filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default LandingPage;
