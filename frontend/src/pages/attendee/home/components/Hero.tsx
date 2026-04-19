import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const Hero: React.FC = () => {
  // ✅ STATIC DATA: Sesuai dengan konten musik di gambar
  const banners = [
    {
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819", // Penyanyi Unsplash
      label: "GET INTO IT",
      titleTop: "FROM POP BALLADS",
      titleBottom: "TO EMO ENCORES",
      btnText: "Get Into Live Music",
    },
    {
      image: "https://images.unsplash.com/photo-1544735047-e8cc36730415", // Contoh gambar lain (Konser)
      label: "SPOTLIGHT",
      titleTop: "WEEKEND VIBES",
      titleBottom: "JAZZ NIGHTS",
      btnText: "Explore Concerts",
    },
  ];

  return (
    <section className="relative h-[450px] w-full pt-16 overflow-hidden bg-black">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="h-full w-full">
        {banners.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full group overflow-hidden rounded-[20px] mx-8 my-4 border border-slate-800 shadow-2xl">
              {/* Background Image: Gelap dan hangat */}
              <img
                src={slide.image}
                className="w-full h-full object-cover brightness-[0.6] transition-transform duration-[800ms] group-hover:scale-105"
                alt={`Slide ${index + 1}`}
              />

              {/* Konten Konten (Diposisikan di Kiri-Tengah) */}
              <div className="absolute inset-y-0 left-0 flex flex-col items-start justify-center text-white z-10 pl-20 max-w-xl">
                {/* Lencana "GET INTO IT" dengan background ungu pudar */}
                <div className="inline-flex items-center gap-1.5 bg-[#4F46E5]/10 text-[#EEF2FF] px-3.5 py-1.5 rounded-xl mb-4 border border-[#E0E7FF]/20 shadow-inner">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest">
                    {slide.label}
                  </span>
                </div>

                {/* Judul Teks dengan Gradient Background */}
                <h1 className="flex flex-col gap-1.5 mb-10 text-4xl md:text-5xl font-extrabold headline-font tracking-tighter leading-none">
                  {/* Teks Atas (Latar Gradient) */}
                  <span className="inline-block relative">
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-pink-400 opacity-60 rounded-xl" />
                    <span className="relative z-10 px-6 py-2 block">
                      {slide.titleTop}
                    </span>
                  </span>

                  {/* Teks Bawah (Latar Gradient Kebalikan) */}
                  <span className="inline-block relative">
                    <span className="absolute inset-0 bg-gradient-to-r from-pink-400 to-blue-500 opacity-60 rounded-xl" />
                    <span className="relative z-10 px-6 py-2 block">
                      {slide.titleBottom}
                    </span>
                  </span>
                </h1>

                {/* Tombol Putih */}
                <button className="bg-white text-slate-900 font-bold px-8 py-3.5 rounded-xl hover:scale-105 transition-all shadow-xl active:scale-95 text-sm uppercase tracking-wider">
                  {slide.btnText}
                </button>
              </div>

              {/* Efek Vignette di sekeliling gambar untuk kedalaman */}
              <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.8)] pointer-events-none" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Swiper Pagination Dot Style */}
      <style>{`
        .swiper-pagination-bullet {
          background: #4B5563; /* Slate 600 */
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          background: #3B82F6 !important; /* Blue 500 */
          width: 24px;
          border-radius: 10px;
          opacity: 1;
        }
        .swiper-button-next, .swiper-button-prev {
          color: #fff !important;
          transform: scale(0.6) translateY(-50%);
          transition: all 0.3s;
        }
        .swiper-button-next:hover, .swiper-button-prev:hover {
          color: #3B82F6 !important;
          transform: scale(0.7) translateY(-50%);
        }
      `}</style>
    </section>
  );
};

export default Hero;
