import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-2xl shadow-ambient">
      <div className="flex justify-between items-center px-6 py-4 w-full max-w-7xl mx-auto">
        <div className="text-2xl font-black text-primary font-plus-jakarta tracking-tight">
          Digital Concierge
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a className="text-on-surface-variant font-medium hover:text-primary transition-colors" href="#">Discover</a>
          <a className="text-on-surface-variant font-medium hover:text-primary transition-colors" href="#">Festivals</a>
          <a className="text-on-surface-variant font-medium hover:text-primary transition-colors" href="#">Concierge</a>
          <a className="text-primary border-b-2 border-primary pb-1 font-medium" href="#">Orders</a>
        </nav>
        <div className="flex items-center gap-4">
          <button className="material-symbols-outlined text-on-surface-variant scale-95 active:scale-90 transition-transform">
            search
          </button>
          <button className="bg-primary text-on-primary px-5 py-2 rounded-xl font-bold text-sm scale-95 active:scale-90 transition-transform">
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
};
