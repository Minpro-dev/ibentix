import { Heart, Ticket, ListOrdered, Compass, Settings } from "lucide-react";

export const MENU_ITEMS = [
  { label: "Browse Events", path: "/events", icon: Compass },
  { label: "Favorites", path: "/wishlist", icon: Heart },
  { label: "My Tickets", path: "/my-tickets", icon: Ticket },
  { label: "My Orders", path: "/my-orders", icon: ListOrdered },
  { label: "Settings", path: "/profile", icon: Settings },
];
