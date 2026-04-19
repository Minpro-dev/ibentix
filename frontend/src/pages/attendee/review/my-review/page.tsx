import React, { useEffect } from 'react';
import { Filter, SortDesc, ChevronLeft, ChevronRight, Star, Heart, CreditCard, Edit, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion'; 
import ReviewCard from '../../../../ui/ReviewCard';
import ImpactStats from '../../../../ui/ImpactStats';
import { useReviewStore } from '../../../../store/useReviewStore';

interface Review {
  id: string | number;
  title: string;
  rating: number;
  date: string;
  content: string;
  price?: string;
  image?: string;
}

export default function MyReviewsPage(): React.ReactElement {
  const { reviews, user, fetchReviews, deleteReview, isLoading } = useReviewStore();

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return (
    <div className="min-h-screen bg-[#F1F5F9] selection:bg-blue-100">
      <main className="md:ml-64 pt-12 pb-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Header - Teks dibuat lebih gelap agar kontras */}
          <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
            <div className="space-y-2">
              <motion.h1 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-4xl font-black tracking-tight text-[#0F172A]"
              >
                My Reviews
              </motion.h1>
              <div className="flex items-center gap-3">
                <span className="bg-[#4F46E5] text-white px-2.5 py-1 rounded-lg text-xs font-bold shadow-sm">
                  {reviews.length} Reviews
                </span>
                <span className="text-[#475569] text-sm font-semibold">
                  Share your experiences with the community
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-5 py-2.5 bg-white text-[#475569] font-bold rounded-xl border-2 border-slate-200 shadow-sm hover:border-blue-400 hover:text-blue-600 transition-all">
                <Filter size={18} />
                Filter
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 bg-white text-[#475569] font-bold rounded-xl border-2 border-slate-200 shadow-sm hover:border-blue-400 hover:text-blue-600 transition-all">
                <SortDesc size={18} />
                Newest
              </button>
            </div>
          </header>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {isLoading ? (
              <div className="col-span-12 py-20 flex justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
              </div>
            ) : (
              <>
                {/* Featured Review */}
                {reviews.length > 0 && (
                  <div className="md:col-span-8">
                    <ReviewCard 
                      review={reviews[0]} 
                      onDelete={deleteReview} 
                      featured={true} 
                    />
                  </div>
                )}

                {/* Impact Stats */}
                <div className="md:col-span-4">
                  <ImpactStats user={user} />
                </div>

                {/* Other Reviews */}
                {reviews.slice(1).map((review: Review) => (
                  <div key={review.id} className="md:col-span-6">
                    <ReviewCard 
                      review={review} 
                      onDelete={deleteReview} 
                    />
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Pagination - Diperbaiki agar teks putih & background biru tajam */}
          <footer className="flex flex-col md:flex-row items-center justify-between gap-6 border-t-2 border-slate-200 pt-10 mt-12">
            <p className="text-[#64748B] text-sm font-bold">
              Showing <span className="text-[#0F172A]">{reviews.length}</span> of 12 reviews
            </p>
            
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 rounded-full flex items-center justify-center bg-white border-2 border-slate-200 text-slate-400 hover:border-blue-500 hover:text-blue-600 transition-all">
                <ChevronLeft size={20} />
              </button>
              
              <button className="w-10 h-10 rounded-full flex items-center justify-center bg-[#4F46E5] text-white font-black shadow-lg shadow-indigo-200">
                1
              </button>
              
              {[2, 3].map((num) => (
                <button 
                  key={num}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-white border-2 border-slate-200 text-[#475569] font-bold hover:border-blue-500 hover:text-blue-600 transition-all"
                >
                  {num}
                </button>
              ))}

              <button className="w-10 h-10 rounded-full flex items-center justify-center bg-white border-2 border-slate-200 text-slate-400 hover:border-blue-500 hover:text-blue-600 transition-all">
                <ChevronRight size={20} />
              </button>
            </div>
          </footer>
        </div>
      </main>

      {/* Mobile Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t-2 border-slate-100 px-8 py-4 flex justify-between items-center z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <NavButton icon={<ChevronLeft size={24} />} label="Home" />
        <NavButton icon={<Star size={24} className="fill-current" />} label="Reviews" active />
        <NavButton icon={<Heart size={24} />} label="Wishlist" />
        <NavButton icon={<CreditCard size={24} />} label="Pay" />
      </nav>
    </div>
  );
}

function NavButton({ icon, label, active }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <button className={`flex flex-col items-center gap-1 ${active ? 'text-[#4F46E5]' : 'text-[#94A3B8]'}`}>
      {icon}
      <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
    </button>
  );
}