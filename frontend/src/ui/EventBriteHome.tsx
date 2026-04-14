import { useState } from "react";

const categories = [
  { icon: "🎵", label: "Music" },
  { icon: "🌙", label: "Nightlife" },
  { icon: "🎭", label: "Performing & Visual Arts" },
  { icon: "🎉", label: "Holidays" },
  { icon: "💝", label: "Dating" },
  { icon: "🎮", label: "Hobbies" },
  { icon: "💼", label: "Business" },
  { icon: "🍽️", label: "Food & Drink" },
];

const events = [
  {
    id: 1,
    title: "Secure Speaking Gigs & High-Level Collaborations: EBC Influencers Circle",
    date: "Thu, Apr 17 • 3:00 AM GMT+7",
    price: "Free",
    badge: "Sales end soon",
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80",
    promoted: true,
  },
  {
    id: 2,
    title: "WEBINAR RAHASIA PIPA DUIT 24/7",
    date: "Sat, May 2 • 3:00 PM",
    price: "Free",
    badge: "Going fast",
    img: "https://images.unsplash.com/photo-1591522811280-a8759970b03f?w=400&q=80",
    promoted: false,
  },
  {
    id: 3,
    title: "QS Discover & Connect Master's Fair in Jakarta",
    date: "Sat, Apr 25 • 10:30 AM",
    price: "Free",
    badge: null,
    img: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400&q=80",
    promoted: false,
  },
  {
    id: 4,
    title: "Inner Light Journaling Monthly Workshop",
    date: "Thu, May 27 • 1:00 AM GMT+7",
    price: "Check ticket price",
    badge: null,
    img: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=400&q=80",
    promoted: true,
  },
  {
    id: 5,
    title: "QS Discover MBA Fair in Jakarta",
    date: "Sat, Apr 25 • 1:00 PM",
    price: "Free",
    badge: null,
    img: "https://images.unsplash.com/photo-1605711285791-0219e80e43a3?w=400&q=80",
    promoted: false,
  },
  {
    id: 6,
    title: "The MarTech Summit Jakarta 2026",
    date: "Tomorrow • 8:30 AM",
    price: "From £1,075.69",
    badge: "Sales end soon",
    img: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&q=80",
    promoted: false,
  },
  {
    id: 7,
    title: "Jakarta 2026 Venture Capital World Summit",
    date: "Wed, Jul 1 • 1:00 PM",
    price: "From $169.94",
    badge: null,
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=80",
    promoted: false,
  },
  {
    id: 8,
    title: "Certified International Professional Negotiator (CIPN)",
    date: "Monday • 8:30 AM",
    price: "From $1,602.45",
    badge: null,
    img: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&q=80",
    promoted: false,
  },
];

const destinations = [
  { name: "New York", img: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&q=80" },
  { name: "Los Angeles", img: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&q=80" },
  { name: "Chicago", img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80" },
  { name: "Washington", img: "https://images.unsplash.com/photo-1501466044931-62695aada8e9?w=600&q=80" },
];

const popularCities = [
  "Austin", "Abilene", "Denver", "Seattle", "Phoenix", "Albuquerque",
  "Detroit", "Anaheim", "Raleigh", "Baltimore", "Nashville", "Wichita",
  "Indianapolis", "San Antonio",
];

const nearbyAreas = [
  "Jakarta Pusat", "Bekasi", "Bandung", "Serpong", "Karawaci",
  "Kotamadya Jakarta Selatan", "Cikalong Wetan", "Tangerang", "Pamulang", "Karawang",
];

const footerLinks = {
  "Use Eventbrite": ["Create Events", "Pricing", "Event Marketing Platform", "Eventbrite Mobile Ticket App", "Eventbrite Check-In App", "Eventbrite App Marketplace", "Event Registration Software", "Community Guidelines", "FAQs", "Sitemap"],
  "Plan Events": ["Sell Tickets Online", "Performing Arts Ticketing Software", "Sell Concert Tickets Online", "Event Payment System", "Solutions for Professional Services", "Event Management Software", "Halloween Party Planning", "Virtual Events Platform", "QR Codes for Event Check-In", "Post your event online"],
  "Find Events": ["New Orleans Food & Drink Events", "San Francisco Holiday Events", "Tulsa Music Events", "Denver Holiday Events", "Atlanta Pop Music Events", "New York Events", "Chicago Events", "Events in Dallas Today", "Los Angeles Events", "Washington Events"],
  "Connect With Us": ["Contact Support", "Contact Sales", "X", "Facebook", "LinkedIn", "Instagram", "TikTok"],
};

const tabs = ["All", "For you", "Today", "This weekend"];

export default function EventbriteHome() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("Bintaro");

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-3 h-14">
          {/* Logo */}
          <a href="#" className="flex items-center gap-1 shrink-0">
            <svg viewBox="0 0 120 30" className="h-7 w-auto" fill="none">
              <text x="0" y="24" fontFamily="Georgia,serif" fontWeight="bold" fontSize="22" fill="#f05537">eventbrite</text>
            </svg>
          </a>

          {/* Search */}
          <div className="flex flex-1 max-w-2xl gap-2 ml-4">
            <div className="flex items-center flex-1 border border-gray-300 rounded-full px-4 h-9 gap-2 focus-within:border-gray-500 bg-white">
              <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              <input
                className="flex-1 text-sm outline-none bg-transparent"
                placeholder="Search events"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center border border-gray-300 rounded-full px-4 h-9 gap-2 focus-within:border-gray-500 bg-white min-w-[130px]">
              <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              <input
                className="flex-1 text-sm outline-none bg-transparent w-0"
                value={location}
                onChange={e => setLocation(e.target.value)}
              />
            </div>
            <button className="bg-[#f05537] hover:bg-[#d44a2e] text-white rounded-full w-9 h-9 flex items-center justify-center shrink-0 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </button>
          </div>

          {/* Nav links */}
          <nav className="hidden lg:flex items-center gap-5 ml-4 text-sm font-medium text-gray-700">
            <a href="#" className="hover:text-gray-900 whitespace-nowrap">Find Events</a>
            <a href="#" className="hover:text-gray-900 whitespace-nowrap">Create Events</a>
            <a href="#" className="hover:text-gray-900 flex items-center gap-1 whitespace-nowrap">
              Help Center
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
            </a>
            <a href="#" className="hover:text-gray-900 whitespace-nowrap">Find my tickets</a>
            <a href="#" className="border border-gray-900 rounded-full px-4 py-1.5 hover:bg-gray-900 hover:text-white transition-colors whitespace-nowrap">Sign in</a>
          </nav>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gray-900 h-64 md:h-80">
        <img
          src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1400&q=80"
          alt="Concert"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
        <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-16 max-w-2xl">
          <p className="text-xs font-bold tracking-widest text-orange-400 uppercase mb-2">Get Into It</p>
          <h1 className="text-white font-extrabold text-3xl md:text-5xl leading-tight mb-4" style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.5)" }}>
            From Pop Ballads<br />to Emo Encores
          </h1>
          <button className="self-start bg-white text-gray-900 font-semibold text-sm rounded-full px-6 py-2.5 hover:bg-gray-100 transition-colors">
            Get Into Live Music
          </button>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="flex items-center justify-between gap-4 overflow-x-auto scrollbar-hide">
            {categories.map(cat => (
              <button key={cat.label} className="flex flex-col items-center gap-1.5 min-w-[64px] group">
                <span className="text-2xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                <span className="text-xs text-gray-600 group-hover:text-gray-900 whitespace-nowrap text-center leading-tight">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Browsing in */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <span>Browsing events in</span>
          <button className="flex items-center gap-1 font-semibold text-gray-900 hover:underline">
            <svg className="w-4 h-4 text-[#f05537]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/></svg>
            {location}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 mb-6 border-b border-gray-200">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? "border-gray-900 text-gray-900"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Events Section */}
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Events in {location}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
          {events.map(event => (
            <div key={event.id} className="group cursor-pointer">
              <div className="relative rounded-lg overflow-hidden mb-2.5 aspect-[4/3] bg-gray-100">
                <img
                  src={event.img}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {event.badge && (
                  <span className={`absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded-full ${
                    event.badge === "Going fast"
                      ? "bg-orange-100 text-orange-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {event.badge}
                  </span>
                )}
              </div>
              <h3 className="text-sm font-semibold text-gray-900 leading-snug mb-1 line-clamp-2 group-hover:text-[#f05537] transition-colors">
                {event.title}
              </h3>
              <p className="text-xs text-gray-500 mb-0.5">{event.date}</p>
              <p className="text-xs font-semibold text-gray-700">{event.price}</p>
              {event.promoted && (
                <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/></svg>
                  Promoted
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Top Destinations */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Top destinations in United States</h2>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
              </button>
              <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {destinations.map(dest => (
              <div key={dest.name} className="relative rounded-xl overflow-hidden aspect-video cursor-pointer group">
                <img
                  src={dest.img}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-3 left-3 text-white font-bold text-lg">{dest.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Cities */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Popular cities</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-2">
            {popularCities.map(city => (
              <a key={city} href="#" className="text-sm text-gray-700 hover:text-[#f05537] hover:underline flex items-center gap-1">
                Things to do in {city}
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
              </a>
            ))}
          </div>
        </section>

        {/* Things to do around Bintaro */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Things to do around {location}</h2>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {nearbyAreas.map(area => (
              <a key={area} href="#" className="text-sm text-gray-700 hover:text-[#f05537] hover:underline flex items-center gap-1">
                Things to do in {area}
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
              </a>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-8">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section}>
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">{section}</h3>
                <ul className="space-y-1.5">
                  {links.map(link => (
                    <li key={link}>
                      <a href="#" className="text-xs text-gray-600 hover:text-gray-900 hover:underline">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 pt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <svg viewBox="0 0 80 20" className="h-5 w-auto"><text x="0" y="16" fontFamily="Georgia,serif" fontWeight="bold" fontSize="14" fill="#f05537">eventbrite</text></svg>
              <span>© 2026 Eventbrite</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {["How it Works", "Pricing", "Contact Support", "About", "Blog", "Help", "Careers", "Press", "Impact", "Security", "Developers", "Status", "Terms", "Privacy", "Accessibility", "Cookies", "Manage Cookie Preferences", "Do Not Sell or Share My Personal Information"].map(item => (
                <a key={item} href="#" className="hover:underline">{item}</a>
              ))}
            </div>
            <button className="border border-gray-300 rounded-full px-3 py-1 text-xs hover:bg-gray-100 transition-colors">
              United States
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
