import { Hero } from '../../../ui/EventHero';
import { About } from '../../../ui/About';
import { Location } from '../../../ui/Location';
import { Footer } from '../../../ui/Footer';
import { Sidebar } from '../../../ui/Sidebar';
import { MobileNav } from '../../../ui/MobileNav';

// import { Sidebar } from './components/layout/Sidebar';
// import { Footer } from './components/layout/Footer';
// import { MobileNav } from './components/layout/MobileNav';

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-indigo-100 selection:text-indigo-900">
      
      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-32">
        <Hero />
        
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-24">
            <About />
            <Location />
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 h-fit sticky top-28">
            <Sidebar />
          </aside>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}

