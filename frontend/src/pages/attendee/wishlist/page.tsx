
import { useEffect } from 'react';
import { Hero } from '../../../ui/HeroWishlist';
import { EventGrid } from '../../../ui/EventGrid';
import { MobileNav } from '../../../ui/MobileNav';
import { eventService } from '../../../services/WislistService/api';
import { useEventStore } from '../../../store/useEventWishlistStore';


export default function App() {
  const { setEvents, setLoading, setError } = useEventStore();

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const data = await eventService.getEvents();
        setEvents(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [setEvents, setLoading, setError]);

  return (
    <div className="min-h-screen pb-24 md:pb-12">
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-12">
        <Hero />
        <EventGrid />
      </main>

      <MobileNav />
    </div>
  );
}
