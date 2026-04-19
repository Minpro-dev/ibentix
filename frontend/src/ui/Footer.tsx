import { Globe, Share2 } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          <div className="space-y-6">
            <span className="text-xl font-black tracking-tighter text-gray-900 block">
              ConciergeEvents
            </span>
            <p className="text-gray-500 text-sm leading-relaxed font-medium">
              © 2024 Concierge Events. High-End Hospitality for Digital Experiences.
            </p>
          </div>

          <div className="space-y-6">
            <h4 className="font-black text-xs tracking-widest text-gray-900 uppercase">Discover</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors text-sm font-semibold">About Us</a></li>
              <li><a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors text-sm font-semibold">Become an Organizer</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-black text-xs tracking-widest text-gray-900 uppercase">Support</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors text-sm font-semibold">Support Center</a></li>
              <li><a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors text-sm font-semibold">Terms of Service</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-black text-xs tracking-widest text-gray-900 uppercase">Connect</h4>
            <div className="flex gap-4">
              <button className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-indigo-600 shadow-sm hover:scale-110 transition-transform">
                <Globe className="w-5 h-5" />
              </button>
              <button className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-indigo-600 shadow-sm hover:scale-110 transition-transform">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
