import { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Calendar, 
  SlidersHorizontal, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { Event } from '../../types/userType';

const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Starlight Symphony: Echoes of Eternity',
    category: 'Music',
    date: 'AUG 15 • 19:00 WIB',
    location: 'JIExpo Kemayoran, Jakarta',
    price: 450000,
    priceType: 'Starting from',
    imageUrl: 'https://picsum.photos/seed/symphony/800/1000'
  },
  {
    id: '2',
    title: 'Zen Ceramic Masterclass',
    category: 'Workshops',
    date: 'AUG 18 • 10:00 WIB',
    location: 'Ubud Art Space, Bali',
    price: 250000,
    priceType: 'Fee',
    imageUrl: 'https://picsum.photos/seed/pottery/800/1000'
  },
  {
    id: '3',
    title: 'Future Tech Summit 2024',
    category: 'Seminars',
    date: 'AUG 22 • 09:00 WIB',
    location: 'BNDCC, Bali',
    price: 150000,
    priceType: 'Starting from',
    imageUrl: 'https://picsum.photos/seed/tech/800/1000'
  },
  {
    id: '4',
    title: 'Elite Pro Basketball Finals',
    category: 'Sports',
    date: 'AUG 25 • 15:00 WIB',
    location: 'Istora Senayan, Jakarta',
    price: 75000,
    priceType: 'Admission',
    imageUrl: 'https://picsum.photos/seed/basketball/800/1000'
  },
  {
    id: '5',
    title: 'Jakarta Culinary Odyssey',
    category: 'Festivals',
    date: 'SEP 01 • 14:00 WIB',
    location: 'GBK Area, Jakarta',
    price: 800000,
    priceType: 'Early Bird',
    imageUrl: 'https://picsum.photos/seed/culinary/800/1000'
  },
  {
    id: '6',
    title: 'Classical Moonlit Nights',
    category: 'Music',
    date: 'SEP 10 • 20:00 WIB',
    location: 'Dago Tea House, Bandung',
    price: 300000,
    priceType: 'Starting from',
    imageUrl: 'https://picsum.photos/seed/classical/800/1000'
  },
  {
    id: '7',
    title: 'Digital Art Expo',
    category: 'Exhibition',
    date: 'SEP 15 • 11:00 WIB',
    location: 'SCBD, Jakarta',
    price: 120000,
    priceType: 'Paid',
    imageUrl: 'https://picsum.photos/seed/art/800/1000'
  },
  {
    id: '8',
    title: 'Rock Out Festival',
    category: 'Music',
    date: 'SEP 20 • 16:00 WIB',
    location: 'Ancol, Jakarta',
    price: 650000,
    priceType: 'Paid',
    imageUrl: 'https://picsum.photos/seed/rock/800/1000'
  }
];

export default function App() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('Today');

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      setEvents(MOCK_EVENTS);
      setLoading(false);
    };
    fetchEvents();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount).replace('IDR', 'Rp');
  };

  const tabs = ['Today', 'This Week', 'Next Month', 'Festivals Only'];

  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#F8FAFC]">
      {/* Header telah dihapus sesuai permintaan */}

      <main className="flex-grow pt-20 pb-20 px-6 max-w-[1600px] mx-auto w-full">
        {/* Title Section */}
        <section className="mb-12 text-center md:text-left">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-2"
          >
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900">
              Explore All Events
            </h1>
            <p className="text-slate-500 text-lg">
              Curated experiences in Indonesia's most vibrant cities. 
              <span className="font-bold text-blue-600 ml-1.5">1,248 events available.</span>
            </p>
          </motion.div>
        </section>

        {/* Filters Section */}
        <section className="mb-12 space-y-6">
          <div className="bg-white p-4 rounded-3xl shadow-sm grid grid-cols-1 md:grid-cols-12 gap-4 items-center border border-slate-100">
            <div className="md:col-span-5 relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-blue-500" />
              <input 
                type="text" 
                placeholder="Search by event name or artist..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-100 text-slate-900 font-medium transition-all outline-none"
              />
            </div>
            
            <div className="md:col-span-2">
              <select className="w-full px-4 py-4 bg-slate-50 border-none rounded-2xl text-slate-700 font-medium outline-none cursor-pointer">
                <option>Location</option>
                <option>Jakarta</option>
                <option>Bali</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <select className="w-full px-4 py-4 bg-slate-50 border-none rounded-2xl text-slate-700 font-medium outline-none cursor-pointer">
                <option>Category</option>
                <option>Music</option>
                <option>Workshops</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <select className="w-full px-4 py-4 bg-slate-50 border-none rounded-2xl text-slate-700 font-medium outline-none cursor-pointer">
                <option>Price</option>
                <option>Free</option>
                <option>Paid</option>
              </select>
            </div>

            <div className="md:col-span-1">
              <button className="w-full h-14 bg-blue-600 text-white flex items-center justify-center rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
                <SlidersHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                  activeTab === tab 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-white text-slate-400 hover:bg-slate-50 border border-slate-100'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </section>

        {/* Event Grid - Diubah menjadi 4 kolom pada desktop */}
        <section className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              >
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="animate-pulse bg-slate-200 aspect-[4/5] rounded-3xl" />
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              >
                {filteredEvents.map((event, idx) => (
                  <motion.div 
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="group"
                  >
                    <div className="relative mb-5 overflow-hidden rounded-[32px] shadow-sm bg-white p-2 border border-slate-100">
                      <img 
                        src={event.imageUrl} 
                        alt={event.title}
                        className="w-full aspect-[4/5] object-cover rounded-[24px] transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest text-blue-600 shadow-sm">
                        {event.category}
                      </div>
                      <div className="absolute bottom-6 right-6 bg-white px-4 py-2 rounded-2xl shadow-xl border border-slate-50">
                        <span className="block text-[8px] uppercase font-black text-slate-400 mb-0.5">
                          {event.priceType}
                        </span>
                        <span className="text-lg font-black text-blue-600 tracking-tighter">
                          {formatCurrency(event.price)}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3 px-2">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-slate-400 font-bold">
                          <Calendar className="w-3 h-3" />
                          <span className="text-[10px] uppercase tracking-tighter">{event.date}</span>
                        </div>
                        <h3 className="text-lg font-black text-slate-800 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                          {event.title}
                        </h3>
                        <div className="flex items-center gap-1.5 text-slate-400 font-bold">
                          <MapPin className="w-3 h-3" />
                          <span className="text-[11px] uppercase tracking-tighter">{event.location}</span>
                        </div>
                      </div>

                      <button className="w-full py-3 bg-white text-blue-600 border border-slate-100 text-xs font-black uppercase tracking-widest rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all transform active:scale-95 flex items-center justify-center gap-2">
                        View Details
                        <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Pagination */}
        <nav className="mt-20 flex justify-center items-center gap-2">
          <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-slate-100 text-slate-400 hover:text-blue-600 transition-all shadow-sm">
            <ChevronLeft className="w-4 h-4" />
          </button>
          {[1, 2, 3].map(num => (
            <button key={num} className={`w-10 h-10 flex items-center justify-center rounded-xl font-black text-xs transition-all ${num === 1 ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-white border border-slate-100 text-slate-400 hover:bg-slate-50'}`}>
              {num}
            </button>
          ))}
          <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-slate-100 text-slate-400 hover:text-blue-600 transition-all shadow-sm">
            <ChevronRight className="w-4 h-4" />
          </button>
        </nav>
      </main>

      <footer className="bg-white border-t border-slate-100 w-full">
        <div className="flex flex-col md:flex-row justify-between items-center py-8 px-6 max-w-7xl mx-auto">
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">© 2026 Vista Pass. Digital Concierge Experience.</p>
          <div className="flex gap-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}