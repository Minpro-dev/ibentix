import { 
  RiDashboardLine, 
  RiCalendarEventLine, 
  RiTicket2Line, 
  RiStarLine, 
  RiMegaphoneLine, 
  RiShieldUserLine 
} from 'react-icons/ri';

export const SIDEBAR_MENU = [
  {
    to: "",
    label: "Dashboard",
    icon: <RiDashboardLine />,
  },
  {
    to: "events",
    label: "Events",
    icon: <RiCalendarEventLine />,
  },
  {
    to: "orders",
    label: "Orders",
    icon: <RiTicket2Line />,
  },
  {
    to: "reviews",
    label: "Ratings & Reviews",
    icon: <RiStarLine />,
  },
  {
    to: "marketing",
    label: "Marketing",
    icon: <RiMegaphoneLine />,
  },
  {
    to: "organizer-profile",
    label: "Organizer Profile",
    icon: <RiShieldUserLine />,
  },
];