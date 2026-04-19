import React from 'react';
import { motion } from 'framer-motion';
import { ProgressTracker } from '../../../../ui/checkout/ProgressTracker';
import { ReviewEvent } from '../../../../ui/checkout/ReviewEvent';
import { PersonalInfo } from '../../../../ui/checkout/PersonalInfo';
import { Rewards } from '../../../../ui/checkout/Rewards';
import { OrderSummary } from '../../../../ui/checkout/OrderSummary';
import { ShieldCheck, Lock, CreditCard } from 'lucide-react';

const CheckoutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F4F7FE] selection:bg-blue-100">
      {/* Container utama */}
      <main className="max-w-[1280px] mx-auto pt-16 pb-20 px-4 md:px-8">
        
        {/* Progress Tracker - Full Width di atas */}
        <div className="flex justify-center mb-12">
          <div className="w-full max-w-3xl">
            <ProgressTracker />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* KOLOM KIRI (7/12 atau 8/12) */}
          <div className="lg:col-span-8 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Review Selected Event */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-bold text-slate-800 mb-6">Review Selected Event</h2>
                  <ReviewEvent />
                </div>
              </div>

              {/* Personal Details */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <h2 className="text-xl font-bold text-slate-800 mb-6">Personal Details</h2>
                <PersonalInfo />
              </div>

              {/* Rewards & Coupons */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <h2 className="text-xl font-bold text-slate-800 mb-6">Rewards & Coupons</h2>
                <Rewards />
              </div>
            </motion.div>
          </div>

          {/* KOLOM KANAN / SIDEBAR (4/12 atau 5/12) */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-24 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                {/* Order Summary Card */}
                <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6">
                  <h2 className="text-xl font-bold text-slate-800 mb-6">Order Summary</h2>
                  <OrderSummary />
                </div>

                {/* Security Badges - Sesuai gambar di bawah Order Summary */}
                <div className="mt-8 flex justify-center items-center gap-6 text-slate-400">
                  <div className="flex items-center gap-1.5 grayscale opacity-70">
                    <ShieldCheck size={20} />
                    <span className="text-xs font-medium uppercase tracking-widest">Verified</span>
                  </div>
                  <div className="flex items-center gap-1.5 grayscale opacity-70">
                    <Lock size={18} />
                    <span className="text-xs font-medium uppercase tracking-widest">Encrypted</span>
                  </div>
                  <div className="flex items-center gap-1.5 grayscale opacity-70">
                    <CreditCard size={18} />
                    <span className="text-xs font-medium uppercase tracking-widest">Contactless</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </aside>

        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;