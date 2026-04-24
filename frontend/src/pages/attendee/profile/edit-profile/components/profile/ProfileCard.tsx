import React from 'react';
import { Camera, CheckCircle2 } from 'lucide-react';
import type { UserProfile } from '../../types/EditProfileTypes';

interface ProfileCardProps {
  profile: UserProfile | null;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ profile, fileInputRef, handleFileChange }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#e4e8ef] text-center">
        <div className="relative inline-block mb-6 group">
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-[#f0f4fb] mx-auto transition-transform group-hover:scale-[1.02]">
            <img 
              src={profile?.avatarUrl} 
              alt="Avatar" 
              className="w-full h-full object-cover" 
            />
          </div>
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-2 right-2 bg-[#004bb2] text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
          >
            <Camera size={18} />
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
            accept="image/*"
          />
        </div>
        <h2 className="text-xl font-bold text-[#171c21] mb-2">Profile Picture</h2>
        <p className="text-[#737785] text-sm mb-6">JPG, GIF or PNG. Max size of 800K</p>
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="w-full bg-[#f0f4fb] text-[#004bb2] py-3 rounded-xl font-bold hover:bg-[#e4e8ef] transition-colors"
        >
          Change Photo
        </button>
      </div>

      <div className="bg-[#1863dc] p-6 rounded-2xl text-white shadow-lg overflow-hidden relative">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <CheckCircle2 size={28} />
            <span className="font-bold text-lg">Verified Attendee</span>
          </div>
          <p className="text-blue-50 text-sm leading-relaxed">
            Your account is verified for premium access to all events and concierge services.
          </p>
        </div>
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
      </div>
    </div>
  );
};
