import { Search } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-surface border-b border-outline flex justify-between items-center w-full px-6 py-4 sticky top-0 z-50">
      <div className="text-xl font-bold text-primary tracking-tight headline-font flex items-center gap-2">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-on-primary">
          <Search className="w-4 h-4" />
        </div>
        The Digital Concierge
      </div>
      <div className="flex items-center gap-4">
        <button className="hover:bg-surface-container-high transition-colors p-2 rounded-full active:scale-95 transition-transform duration-150">
          <Search className="w-5 h-5 text-on-surface-variant" />
        </button>
        <div className="w-10 h-10 rounded-full bg-primary-container overflow-hidden ring-2 ring-primary/10">
          <img
            alt="User Profile"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWs5PaudMdE4scFA-6_-NmX2qO55P0R39HQrQSoIPj9pAGQseYb7a5druPgCIzucs_V3eDkaS-LJ-Df9CB5Pr_Jb4bFWpoPHShUn2bNDAHz8bZEWTq3jvBFP9kz91t_ueUqm3pyex6dA-woP0HymC1kBPlqdC6T7k5z3c7hg6SdWPzos2RRvnkuQ1bjR764DpHShlj8sLXTkZAWMpJs2EvlULeUfQ2reToJaatFrPx4_xqJUi04WpKz5YV7LYidg_6RLJNUaYw6vsk"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
}
