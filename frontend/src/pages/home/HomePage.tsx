// function HomePage() {
//   return (
//     <div>
//       <h1>Home Page</h1>
//     </div>
//   );
// }

// export default HomePage;

import React from "react";
import EventCard from "../../ui/EventCard";
import Hero from "../../ui/Hero";

const HomePage: React.FC = () => {
  const dummyData = [
    {
      id: 1,
      title: "LEGOLAND Malaysia",
      location: "Johor, Malaysia",
      price: 300000,
      originalPrice: 450000,
      rating: 4.8,
      imageUrl: "https://picsum.photos/seed/lego/400/300",
      discount: "Hemat 33%",
    },
    {
      id: 2,
      title: "Universal Studios Singapore",
      location: "Sentosa, SG",
      price: 850000,
      rating: 4.9,
      imageUrl: "https://picsum.photos/seed/uss/400/300",
    },
    {
      id: 3,
      title: "Deakin Lancaster Indonesia | TRIAL CLASS Bandung",
      location: "Deakin University Lancaster University Indonesia",
      price: 200000,
      rating: 5.0,
      imageUrl: "https://picsum.photos/seed/deakin/400/300",
      discount: "Free",
    },
    {
      id: 4,
      title: "Bitcoin Indonesia Community Meetup Depok 23 Mei 2026",
      location: "Lokakama 27",
      price: 800000,
      rating: 4.5,
      imageUrl: "https://picsum.photos/seed/bitcoin-depok/400/300",
      discount: "Free",
    },
    {
      id: 5,
      title: "Bitcoin Indonesia Community Meetup Bandung 16 Mei 2026",
      location: "Kantina - Coffee & Space",
      price: 50000,
      rating: 4.7,
      imageUrl: "https://picsum.photos/seed/bitcoin-bandung/400/300",
      discount: "Free",
    },
    {
      id: 6,
      title: "QS Discover MBA Fair in Jakarta",
      location: "Park Hyatt Jakarta",
      price: 500000,
      rating: 4.8,
      imageUrl: "https://picsum.photos/seed/qs-mba/400/300",
      discount: "Free",
    },
    {
      id: 7,
      title: "The MarTech Summit Jakarta 2026",
      location: "The St. Regis Jakarta",
      price: 20000000,
      rating: 4.9,
      imageUrl: "https://picsum.photos/seed/martech/400/300",
      discount: "Sales end soon",
    },
    {
      id: 6,
      title: "Jakarta 2026 Venture Capital World Summit",
      location: "Singapore Land Tower",
      price: 2850000,
      originalPrice: 3500000,
      rating: 4.6,
      imageUrl: "https://picsum.photos/seed/vc-summit/400/300",
      discount: "From €168.94",
    },
    {
      id: 7,
      title: "Certified International Professional Negotiator (CIPN)",
      location: "Online Training",
      price: 25000000,
      originalPrice: 0,
      rating: 4.7,
      imageUrl: "https://picsum.photos/seed/cipn/400/300",
      discount: "From $1,602.45",
    },
    // Tambahkan data lainnya sesuai screenshot
  ];

  const CATEGORIES = [
    { id: 1, label: "Music", icon: "🎵" },
    { id: 2, label: "Nightlife", icon: "🌙" },
    { id: 3, label: "Performing & Visual Arts", icon: "🎭" },
    { id: 4, label: "Holidays", icon: "🎉" },
    { id: 5, label: "Dating", icon: "💝" },
    { id: 6, label: "Hobbies", icon: "🎮" },
    { id: 7, label: "Business", icon: "💼" },
    { id: 8, label: "Food & Drink", icon: "🍴" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Hero />

      <main className="max-w-7xl mx-auto px-8 py-12">
        {/* Kategori Icons */}
        <section className="flex justify-start md:justify-between gap-6 mb-12 overflow-x-auto pb-4 no-scrollbar">
          {CATEGORIES.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center gap-3 cursor-pointer group min-w-[80px]"
            >
              {/* Container Ikon */}
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center group-hover:bg-blue-50 group-hover:shadow-md transition-all duration-300">
                <span className="text-3xl group-hover:scale-110 transition-transform">
                  {item.icon}
                </span>
              </div>

              {/* Label Text */}
              <span className="text-xs font-semibold text-gray-600 text-center group-hover:text-blue-600 transition-colors">
                {item.label}
              </span>
            </div>
          ))}
        </section>

        {/* Event Reccomendation- Trending Event */}

        <section className="mb-12">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-xl font-bold">Rekomendasi event!</h2>
              <p className="text-gray-500 text-sm">
                Event-event populer buat kamu
              </p>
            </div>
            <button className="text-blue-500 font-bold text-sm">
              Lihat Semua
            </button>
          </div>

          {/* Wrapper Slider */}
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar snap-x snap-mandatory">
            {dummyData.map((item) => (
              <div
                key={item.id}
                className="min-w-[calc(50%-12px)] md:min-w-[calc(25%-12px)] snap-start"
              >
                <EventCard {...item} />
              </div>
            ))}
          </div>
        </section>

        {/* Event in Selected City Section */}
        <section className="mb-12">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-xl font-bold">Rekomendasi event!</h2>
              <p className="text-gray-500 text-sm">
                Temukan event populer di kotamu
              </p>
            </div>
            <button className="text-blue-500 font-bold text-sm">
              Lihat Semua
            </button>
          </div>

          {/* Wrapper Slider */}
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar snap-x snap-mandatory">
            {dummyData.map((item) => (
              <div
                key={item.id}
                className="min-w-[calc(50%-12px)] md:min-w-[calc(25%-12px)] snap-start"
              >
                <EventCard {...item} />
              </div>
            ))}
          </div>
        </section>

        {/* Banner Iklan */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="rounded-2xl overflow-hidden h-48 bg-blue-100">
            <img
              src="https://picsum.photos/seed/promo1/800/400"
              className="w-full h-full object-cover"
              alt="Promo"
            />
          </div>
          <div className="rounded-2xl overflow-hidden h-48 bg-yellow-100">
            <img
              src="https://picsum.photos/seed/promo2/800/400"
              className="w-full h-full object-cover"
              alt="Promo"
            />
          </div>
        </section>
      </main>

      {/* Footer Sederhana */}
      <footer className="bg-white border-t py-12 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold mb-4">Perusahaan</h4>
            <ul className="text-sm text-gray-500 space-y-2">
              <li>Blog</li>
              <li>Karir</li>
              <li>Tentang Kami</li>
            </ul>
          </div>
          {/* Tambahkan kolom footer lainnya */}
        </div>
      </footer>
    </div>
  );
};

export default HomePage;


// import React, { useState, useEffect } from 'react';
// import { collection, query, where, getDocs, limit, orderBy } from 'firebase/firestore';
// import { db } from '../lib/firebase';
// import { Event } from '../types';
// import { Button } from '../components/ui/button';
// import { Input } from '../components/ui/input';
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
// import { Badge } from '../components/ui/badge';
// import { Search, MapPin, Calendar as CalendarIcon, ArrowRight } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import { IDR_FORMATTER } from '../constants';
// import { format } from 'date-fns';
// import { debounce } from 'lodash';

// export const Home: React.FC = () => {
//   const [events, setEvents] = useState<Event[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   const fetchEvents = async (search: string = '') => {
//     setLoading(true);
//     try {
//       let q = query(
//         collection(db, 'events'),
//         where('startDate', '>=', new Date().toISOString()),
//         orderBy('startDate'),
//         limit(6)
//       );

//       const querySnapshot = await getDocs(q);
//       const fetchedEvents = querySnapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       })) as Event[];

//       if (search) {
//         setEvents(fetchedEvents.filter(e => 
//           e.name.toLowerCase().includes(search.toLowerCase()) || 
//           e.category.toLowerCase().includes(search.toLowerCase())
//         ));
//       } else {
//         setEvents(fetchedEvents);
//       }
//     } catch (error) {
//       console.error("Error fetching events:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const debouncedSearch = debounce((value: string) => {
//     fetchEvents(value);
//   }, 500);

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setSearchTerm(value);
//     debouncedSearch(value);
//   };

//   return (
//     <div className="flex flex-col gap-12 pb-20">
//       {/* Hero Section */}
//       <section className="relative h-[500px] w-full overflow-hidden bg-indigo-950 text-white">
//         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070')] bg-cover bg-center opacity-40"></div>
//         <div className="container relative mx-auto flex h-full flex-col justify-center px-4">
//           <h1 className="max-w-3xl text-5xl font-bold leading-tight md:text-7xl font-heading">
//             Discover and Experience <span className="text-indigo-400">Amazing Events</span>
//           </h1>
//           <p className="mt-6 max-w-xl text-lg text-zinc-300">
//             Find the best concerts, workshops, and conferences happening near you. Join thousands of people in creating unforgettable memories.
//           </p>
//           <div className="mt-10 flex w-full max-w-2xl items-center gap-2 rounded-xl bg-white p-2 shadow-2xl md:p-3">
//             <Search className="ml-2 h-5 w-5 text-zinc-400" />
//             <Input 
//               placeholder="Search events, categories, locations..." 
//               className="border-none bg-transparent text-zinc-900 focus-visible:ring-0"
//               value={searchTerm}
//               onChange={handleSearchChange}
//             />
//             <Button className="hidden md:flex">Search</Button>
//           </div>
//         </div>
//       </section>

//       {/* Featured Events */}
//       <section className="container mx-auto px-4">
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h2 className="text-3xl font-bold font-heading">Upcoming Events</h2>
//             <p className="text-muted-foreground mt-1">Don't miss out on these popular experiences</p>
//           </div>
//           <Link to="/events">
//             <Button variant="ghost" className="gap-2">
//               View All <ArrowRight className="h-4 w-4" />
//             </Button>
//           </Link>
//         </div>

//         {loading ? (
//           <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {[1, 2, 3].map((i) => (
//               <div key={i} className="h-[400px] w-full animate-pulse rounded-xl bg-zinc-200"></div>
//             ))}
//           </div>
//         ) : events.length > 0 ? (
//           <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {events.map((event) => (
//               <Card key={event.id} className="group overflow-hidden border-none shadow-md transition-all hover:shadow-xl">
//                 <div className="relative h-48 w-full overflow-hidden">
//                   <img 
//                     src={event.image || `https://picsum.photos/seed/${event.id}/800/600`} 
//                     alt={event.name}
//                     className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
//                     referrerPolicy="no-referrer"
//                   />
//                   <Badge className="absolute right-4 top-4 bg-white/90 text-zinc-900 hover:bg-white">
//                     {event.category}
//                   </Badge>
//                 </div>
//                 <CardHeader className="pb-2">
//                   <div className="flex items-center gap-2 text-sm text-indigo-600 font-medium">
//                     <CalendarIcon className="h-4 w-4" />
//                     {format(new Date(event.startDate), 'PPP')}
//                   </div>
//                   <CardTitle className="line-clamp-1 text-xl font-heading mt-1">{event.name}</CardTitle>
//                 </CardHeader>
//                 <CardContent className="pb-4">
//                   <div className="flex items-center gap-1 text-sm text-muted-foreground">
//                     <MapPin className="h-4 w-4" />
//                     {event.location}
//                   </div>
//                   <p className="mt-3 line-clamp-2 text-sm text-zinc-600">
//                     {event.description}
//                   </p>
//                 </CardContent>
//                 <CardFooter className="flex items-center justify-between border-t bg-zinc-50/50 pt-4">
//                   <div className="font-bold text-lg text-indigo-700">
//                     {event.price === 0 ? 'Free' : IDR_FORMATTER.format(event.price)}
//                   </div>
//                   <Link to={`/events/${event.id}`}>
//                     <Button size="sm">Details</Button>
//                   </Link>
//                 </CardFooter>
//               </Card>
//             ))}
//           </div>
//         ) : (
//           <div className="flex h-64 flex-col items-center justify-center rounded-xl border-2 border-dashed border-zinc-200 bg-zinc-50">
//             <Search className="h-12 w-12 text-zinc-300" />
//             <p className="mt-4 text-lg font-medium text-zinc-500">No events found</p>
//             <Button variant="link" onClick={() => fetchEvents('')}>Clear search</Button>
//           </div>
//         )}
//       </section>

//       {/* Categories */}
//       <section className="bg-zinc-100 py-16">
//         <div className="container mx-auto px-4">
//           <h2 className="mb-10 text-center text-3xl font-bold font-heading">Browse by Category</h2>
//           <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7">
//             {['Music', 'Tech', 'Business', 'Art', 'Sports', 'Food', 'Health'].map((cat) => (
//               <Button key={cat} variant="outline" className="h-24 flex-col gap-2 bg-white hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200">
//                 <span className="text-lg font-semibold">{cat}</span>
//               </Button>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };
