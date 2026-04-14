// function HomePage() {
//   return (
//     <div>
//       <h1>Home Page</h1>
//     </div>
//   );
// }

// export default HomePage;


import React from 'react';
import EventCard from '../../ui/EventCard'
import Hero from '../../ui/Hero';


const HomePage: React.FC = () => {
  const dummyData = [
    { id: 1, title: "LEGOLAND Malaysia", location: "Johor, Malaysia", price: 300000, originalPrice: 450000, rating: 4.8, imageUrl: "https://picsum.photos/seed/lego/400/300", discount: "Hemat 33%" },
    { id: 2, title: "Universal Studios Singapore", location: "Sentosa, SG", price: 850000, rating: 4.9, imageUrl: "https://picsum.photos/seed/uss/400/300" },
    {
    "id": 3,
    "title": "Deakin Lancaster Indonesia | TRIAL CLASS Bandung",
    "location": "Deakin University Lancaster University Indonesia",
    "price": 200000,
    "rating": 5.0,
    "imageUrl": "https://picsum.photos/seed/deakin/400/300",
    "discount": "Free"
  },
  {
    "id": 4,
    "title": "Bitcoin Indonesia Community Meetup Depok 23 Mei 2026",
    "location": "Lokakama 27",
    "price": 800000,
    "rating": 4.5,
    "imageUrl": "https://picsum.photos/seed/bitcoin-depok/400/300",
    "discount": "Free"
  },
  {
    "id": 5,
    "title": "Bitcoin Indonesia Community Meetup Bandung 16 Mei 2026",
    "location": "Kantina - Coffee & Space",
    "price": 50000,
    "rating": 4.7,
    "imageUrl": "https://picsum.photos/seed/bitcoin-bandung/400/300",
    "discount": "Free"
  },
  {
    "id": 6,
    "title": "QS Discover MBA Fair in Jakarta",
    "location": "Park Hyatt Jakarta",
    "price": 500000,
    "rating": 4.8,
    "imageUrl": "https://picsum.photos/seed/qs-mba/400/300",
    "discount": "Free"
  },
  {
    "id": 7,
    "title": "The MarTech Summit Jakarta 2026",
    "location": "The St. Regis Jakarta",
    "price": 20000000,
    "rating": 4.9,
    "imageUrl": "https://picsum.photos/seed/martech/400/300",
    "discount": "Sales end soon"
  },
  {
    "id": 6,
    "title": "Jakarta 2026 Venture Capital World Summit",
    "location": "Singapore Land Tower",
    "price": 2850000,
    "originalPrice": 3500000,
    "rating": 4.6,
    "imageUrl": "https://picsum.photos/seed/vc-summit/400/300",
    "discount": "From €168.94"
  },
  {
    "id": 7,
    "title": "Certified International Professional Negotiator (CIPN)",
    "location": "Online Training",
    "price": 25000000,
    "originalPrice": 0,
    "rating": 4.7,
    "imageUrl": "https://picsum.photos/seed/cipn/400/300",
    "discount": "From $1,602.45"
  }
    // Tambahkan data lainnya sesuai screenshot
  ];

  return (
    <div className="bg-gray-50 min-h-screen font-sans">

      <Hero />
      
      <main className="max-w-7xl mx-auto px-8 py-12">
        {/* Kategori Icons */}
        <section className="flex justify-between mb-12 overflow-x-auto pb-4">
          {['Play', 'Atraksi', 'Event', 'Tur', 'Kecantikan'].map((cat) => (
            <div key={cat} className="flex flex-col items-center gap-2 cursor-pointer group">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                <span className="text-2xl">🎢</span>
              </div>
              <span className="text-xs font-medium text-gray-700">{cat}</span>
            </div>
          ))}
        </section>

        {/* Promo Section */}
        <section className="mb-12">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-xl font-bold">Semua Promo To Do buat Liburanmu!</h2>
              <p className="text-gray-500 text-sm">Makin hemat makin berkesan dengan promo menarik.</p>
            </div>
            <button className="text-blue-500 font-bold text-sm">Lihat Semua</button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {dummyData.map(item => (
              <EventCard key={item.id} {...item} />
            ))}
          </div>
        </section>

        {/* Banner Iklan */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="rounded-2xl overflow-hidden h-48 bg-blue-100">
            <img src="https://picsum.photos/seed/promo1/800/400" className="w-full h-full object-cover" alt="Promo" />
          </div>
          <div className="rounded-2xl overflow-hidden h-48 bg-yellow-100">
            <img src="https://picsum.photos/seed/promo2/800/400" className="w-full h-full object-cover" alt="Promo" />
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