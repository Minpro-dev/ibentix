import { Home, Ticket, User } from "lucide-react";
import { cn } from "../lib/utils";


export default function BottomNav() {
  const tabs = [
    { icon: Home, label: "Home", active: false },
    { icon: Ticket, label: "My Tickets", active: false },
    { icon: User, label: "Profile", active: true },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-surface border-t border-outline shadow-ambient">
      {tabs.map((tab) => (
        <button
          key={tab.label}
          className={cn(
            "flex flex-col items-center justify-center px-5 py-2 transition-all duration-200 ease-out",
            tab.active 
              ? "text-primary scale-100" 
              : "text-on-surface-variant hover:text-primary"
          )}
        >
          <tab.icon className={cn("w-5 h-5", tab.active && "fill-current")} />
          <span className="text-[10px] font-bold uppercase tracking-wider mt-1">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}
