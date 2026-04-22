import { Hero } from "../../../ui/HeroWishlist";
import { EventGrid } from "./components/EventGrid";
import { MobileNav } from "../../../ui/MobileNav";

export default function Wishlist() {
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
