import { MapPin, Navigation } from 'lucide-react';

export function Location() {
  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900">Event Location</h2>
      
      <div className="bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-sm">
        <div className="h-80 w-full relative">
          <img 
            src="https://picsum.photos/seed/jakarta-map/1200/400" 
            alt="Jakarta Map"
            className="w-full h-full object-cover grayscale brightness-90"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-indigo-600/10 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="bg-indigo-600 text-white p-4 rounded-full shadow-2xl animate-bounce">
              <MapPin className="w-6 h-6 fill-current" />
            </div>
          </div>
        </div>
        
        <div className="p-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="font-bold text-xl text-gray-900">JIEXPO Kemayoran</h3>
            <p className="text-gray-500 font-medium">Jl. Benyamin Suaeb No.1, Jakarta Pusat, Indonesia</p>
          </div>
          <button className="whitespace-nowrap bg-white border border-gray-200 text-gray-900 px-8 py-3.5 rounded-2xl font-bold hover:bg-gray-50 transition-colors flex items-center gap-3 shadow-sm active:scale-95">
            <Navigation className="w-5 h-5" />
            Get Directions
          </button>
        </div>
      </div>
    </section>
  );
}
