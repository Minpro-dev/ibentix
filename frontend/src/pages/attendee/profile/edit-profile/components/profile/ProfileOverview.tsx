import React from 'react';
import { CheckCircle2, Gift, Ticket as TicketIcon, Check, Copy } from 'lucide-react';
import type { UserProfile } from '../../types/EditProfileTypes';

interface ProfileOverviewProps {
  profile: UserProfile | null;
  copied: boolean;
  handleCopyCode: (code: string) => void;
}

export const ProfileOverview: React.FC<ProfileOverviewProps> = ({ profile, copied, handleCopyCode }) => {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-[#e4e8ef] overflow-hidden relative">
        <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center">
          <div className="relative">
            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-[#f7f9ff] shadow-xl">
              <img src={profile?.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            {profile?.isVerified && (
              <div className="absolute -bottom-2 -right-2 bg-white p-1 rounded-full shadow-md">
                <CheckCircle2 className="text-[#1863dc]" size={32} fill="#e5eaff" />
              </div>
            )}
          </div>
          
          <div className="text-center md:text-left space-y-4 max-w-lg">
            <div>
              <h2 className="text-4xl font-black text-[#171c21] mb-1">{profile?.fullName}</h2>
              <p className="text-lg font-medium text-[#737785]">{profile?.email}</p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              <span className="bg-[#004bb2] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-sm">Premium Member</span>
              <span className="bg-[#f0f4fb] text-[#004bb2] text-xs font-bold px-4 py-1.5 rounded-full border border-blue-50">Verified Attendee</span>
            </div>
            <p className="text-[#424654] leading-relaxed italic text-lg">"{profile?.bio}"</p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#f0f4fb] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 opacity-60" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#e5eaff] rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2 opacity-40" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-[#e4e8ef] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Gift className="text-[#004bb2]" size={24} />
              <h3 className="text-xl font-bold text-[#171c21]">Refer & Earn</h3>
            </div>
            <p className="text-[#424654] text-sm mb-6">
              Invite your friends to Concierge. They get exclusive access, and you earn benefits for every booking they make.
            </p>
            <div className="bg-[#f7f9ff] border-2 border-dashed border-[#e4e8ef] p-4 rounded-xl flex items-center justify-between group">
              <span className="font-mono font-black text-[#004bb2] text-xl tracking-tighter">{profile?.referralCode}</span>
              <button 
                onClick={() => profile?.referralCode && handleCopyCode(profile.referralCode)}
                className="p-2 text-[#004bb2] hover:bg-white rounded-lg transition-all shadow-sm"
              >
                {copied ? <Check size={20} className="text-[#005d4f]" /> : <Copy size={20} />}
              </button>
            </div>
          </div>
        </section>

        <section className="bg-white p-8 rounded-2xl shadow-sm border border-[#e4e8ef]">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <TicketIcon className="text-[#004bb2]" size={24} />
              <h3 className="text-xl font-bold text-[#171c21]">Active Coupons</h3>
            </div>
            <span className="text-xs font-bold text-[#737785] bg-[#f0f4fb] px-3 py-1 rounded-full">
              {profile?.coupons?.length} Active
            </span>
          </div>
          <div className="space-y-3">
            {profile?.coupons?.map(coupon => (
              <div key={coupon.id} className="flex items-center justify-between p-3 bg-[#f7f9ff] rounded-lg border border-[#f0f4fb]">
                <div>
                  <p className="font-bold text-[#171c21] text-sm">{coupon.code}</p>
                  <p className="text-[11px] text-[#737785]">{coupon.description}</p>
                </div>
                <button 
                  onClick={() => handleCopyCode(coupon.code)}
                  className="text-[#004bb2] hover:bg-white p-1.5 rounded-md transition-all border border-transparent hover:border-[#e4e8ef]"
                >
                  <Copy size={16} />
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
