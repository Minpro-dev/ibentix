import React from 'react';
import { 
  Bell, 
  Compass, 
  Ticket, 
  User, 
  HelpCircle, 
  Menu, 
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  user: {
    fullName: string;
    avatar: string;
    isPremium?: boolean;
  };
  isEditMode: boolean;
  setIsEditMode: (val: boolean) => void;
}

export default function DashboardLayout({ children, user, isEditMode, setIsEditMode }: DashboardLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { icon: Compass, label: 'Discover', href: '#' },
    { icon: Ticket, label: 'My Events', href: '#' },
    { icon: User, label: 'Profile', href: '#', active: true },
    { icon: HelpCircle, label: 'Support', href: '#' },
  ];

  return (
    <div className="min-h-screen bg-[#f7f9ff] text-[#171c21] font-sans">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-[#e4e8ef] shadow-sm">
        <div className="max-w-[1280px] mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-12">
            <span className="text-2xl font-black text-[#004bb2] font-headline">Concierge</span>
            <div className="hidden md:flex gap-8">
              {navItems.map((item) => (
                <a 
                  key={item.label}
                  href={item.href} 
                  className={cn(
                    "text-sm font-bold transition-all px-2 py-1",
                    item.active ? "text-[#004bb2] border-b-2 border-[#004bb2]" : "text-[#737785] hover:text-[#004bb2]"
                  )}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-2 bg-[#f0f4fb] p-1 rounded-xl">
              <button 
                onClick={() => setIsEditMode(false)}
                className={cn(
                  "px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                  !isEditMode ? "bg-white text-[#004bb2] shadow-sm" : "text-[#424654] hover:bg-white/50"
                )}
              >
                View
              </button>
              <button 
                onClick={() => setIsEditMode(true)}
                className={cn(
                  "px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                  isEditMode ? "bg-white text-[#004bb2] shadow-sm" : "text-[#424654] hover:bg-white/50"
                )}
              >
                Edit
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2 text-[#424654] hover:text-[#004bb2] transition-colors">
                <Bell size={20} />
              </button>
              <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#1863dc]">
                <img src={user.avatar} alt={user.fullName} className="w-full h-full object-cover" />
              </div>
            </div>

            <button 
              className="md:hidden p-2 text-[#424654]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-[1280px] mx-auto min-h-[calc(100vh-73px)]">
        {/* Main Content */}
        <main className="p-6 md:p-12 lg:p-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={isEditMode ? 'edit' : 'view'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile Menu */}
       <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60] md:hidden"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed right-0 top-0 bottom-0 w-64 bg-white z-[70] p-6 shadow-2xl md:hidden"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="font-bold text-[#004bb2]">Menu</span>
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X />
                </button>
              </div>
              <nav className="space-y-4">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg font-semibold",
                      item.active ? "bg-[#004bb2] text-white" : "text-[#424654]"
                    )}
                  >
                    <item.icon size={20} />
                    <span>{item.label}</span>
                  </a>
                ))}
              </nav>

              <div className="mt-8 pt-8 border-t border-[#f0f4fb]">
                <p className="text-xs font-bold text-[#737785] mb-4 uppercase">Mode</p>
                <div className="grid grid-cols-2 gap-2 bg-[#f0f4fb] p-1 rounded-xl">
                  <button 
                    onClick={() => { setIsEditMode(false); setIsMobileMenuOpen(false); }}
                    className={cn(
                      "py-2 rounded-lg text-xs font-bold transition-all",
                      !isEditMode ? "bg-white text-[#004bb2] shadow-sm" : "text-[#424654]"
                    )}
                  >
                    View
                  </button>
                  <button 
                    onClick={() => { setIsEditMode(true); setIsMobileMenuOpen(false); }}
                    className={cn(
                      "py-2 rounded-lg text-xs font-bold transition-all",
                      isEditMode ? "bg-white text-[#004bb2] shadow-sm" : "text-[#424654]"
                    )}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
