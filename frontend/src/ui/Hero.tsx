import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const Hero: React.FC = () => {
  const banners = [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e", // Gambar 1
    "https://images.unsplash.com/photo-1506929662133-519b1290786a", // Gambar 2
    "https://images.unsplash.com/photo-1544735047-e8cc36730415"  // Gambar 3
  ];

  return (
    <section className="relative h-[450px] w-full pt-16 overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="h-full w-full"
      >
        {banners.map((url, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              {/* Background Image */}
              <img 
                src={url} 
                className="w-full h-full object-cover brightness-75"
                alt={`Banner ${index + 1}`}
              />
              
              {/* Overlay Content (Teks di Tengah) */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-lg">
                  Things To-Do
                </h1>
                <p className="mt-2 text-lg font-medium opacity-90 drop-shadow-md">
                  Temukan pengalaman seru untuk liburanmu
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Custom CSS untuk mempercantik dot pagination Swiper (Opsional) */}
      <style>{`
        .swiper-pagination-bullet-active {
          background: #fff !important;
        }
        .swiper-button-next, .swiper-button-prev {
          color: #fff !important;
          transform: scale(0.6);
        }
      `}</style>
    </section>
  );
};

export default Hero;