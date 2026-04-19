import { Compass, Search, Ticket, User } from 'lucide-react';
import { type ReactNode } from 'react';
import { cn } from '../lib/utils';

export function MobileNav() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-2xl border-t border-gray-100 flex justify-around items-center px-4 pb-8 pt-4 z-50">
      <NavItem icon={<Compass className="w-6 h-6" />} label="Explore" />
      <NavItem icon={<Search className="w-6 h-6" />} label="Search" />
      <NavItem icon={<Ticket className="w-6 h-6" />} label="Tickets" active />
      <NavItem icon={<User className="w-6 h-6" />} label="Profile" />
    </div>
  );
}

function NavItem({ icon, label, active = false }: { icon: ReactNode; label: string; active?: boolean }) {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center p-2 rounded-2xl transition-all active:scale-90",
      active ? "text-indigo-600 bg-indigo-50" : "text-gray-400"
    )}>
      {icon}
      <span className="text-[10px] font-bold mt-1 uppercase tracking-wider">{label}</span>
    </div>
  );
}
