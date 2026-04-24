import React from 'react';
import { Gift, Copy, Check, Ticket as TicketIcon } from 'lucide-react';
import type { UserProfile } from '../../types/EditProfileTypes';
import { cn } from '../../../../../../lib/utils';

interface RewardsSectionProps {
  profile: UserProfile | null;
  handleCopyCode: (code: string) => void;
  copied: boolean;
}

export const RewardsSection: React.FC<RewardsSectionProps> = ({ profile, handleCopyCode, copied }) => {
  return (
    <section className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-[#e4e8ef]">
      <h2 className="text-2xl font-bold text-[#171c21] mb-8 flex items-center gap-3">
        <Gift className="text-[#004bb2]" />
        Rewards & Referrals
      </h2>

      <div className="space-y-8">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-bold text-[#424654] mb-1">Your Referral Code</h3>
            <p className="text-xs text-[#737785] mb-3">Share this code with friends and earn rewards when they book their first event.</p>
          </div>
          <div className="flex gap-2">
            <div className="flex-1 bg-[#f7f9ff] border border-[#e4e8ef] border-dashed rounded-xl px-4 py-4 flex items-center justify-between">
              <span className="font-mono font-bold text-[#004bb2] tracking-wider text-lg">
                {profile?.referralCode || 'NOT_AVAILABLE'}
              </span>
              <button 
                onClick={() => profile?.referralCode && handleCopyCode(profile.referralCode)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all",
                  copied 
                    ? "bg-[#005d4f] text-white" 
                    : "bg-white text-[#004bb2] border border-[#004bb2] hover:bg-[#004bb2] hover:text-white"
                )}
              >
                {copied ? (
                  <>
                    <Check size={16} />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-[#f0f4fb]">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-[#424654]">Active Coupons</h3>
            <span className="bg-[#f0f4fb] text-[#004bb2] text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
              {profile?.coupons?.length || 0} Available
            </span>
          </div>
          
          <div className="grid gap-4">
            {profile?.coupons?.map((coupon) => (
              <div 
                key={coupon.id}
                className="group relative flex items-center gap-4 bg-[#f7f9ff] p-4 rounded-xl border border-[#e4e8ef] hover:border-[#b0c6ff] transition-all"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-lg flex items-center justify-center text-[#004bb2] border border-[#e4e8ef]">
                  <TicketIcon size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-mono font-bold text-[#171c21] truncate">{coupon.code}</span>
                    <span className="text-[10px] font-medium text-[#737785]">• Exp: {coupon.expires}</span>
                  </div>
                  <p className="text-xs text-[#424654] truncate italic">{coupon.description}</p>
                </div>
                <button 
                  onClick={() => handleCopyCode(coupon.code)}
                  className="opacity-0 group-hover:opacity-100 p-2 text-[#004bb2] hover:bg-white rounded-lg transition-all"
                  title="Copy Code"
                >
                  <Copy size={18} />
                </button>
              </div>
            ))}
            {(!profile?.coupons || profile.coupons.length === 0) && (
              <div className="text-center py-6 text-[#737785] italic text-sm">
                No active coupons available.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
