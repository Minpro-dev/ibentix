// import { useEffect, useState } from "react";
// import Header from "../../../ui/Header";
// import ProfileHero from "../../../ui/ProfileHero";
// import PointsCard from "../../../ui/PointsCard";
// import ReferralSection from "../../../ui/ReferralSection";
// import CouponsSection from "../../../ui/CouponsSection";
// import SecuritySection from "../../../ui/SecuritySection";
// import BottomNav from "../../../ui/BottomNav";
// import api from "../../../api/axiosInstance"; // ✅ IMPORTANT
// import type { Coupon, Profile, Referral } from "../../../types/userType";

// export default function App() {
//   const [profile, setProfile] = useState<Profile | null>(null);
//   const [referrals, setReferrals] = useState<Referral[]>([]);
//   const [coupons, setCoupons] = useState<Coupon[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [profileRes, referralsRes, couponsRes] = await Promise.all([
//           api.get("/details"),
//           api.get("/referrals"),
//           api.get("/coupons"),
//         ]);

//         // ✅ adjust sesuai response backend kamu
//         setProfile(profileRes.data.data);
//         setReferrals(referralsRes.data.data);
//         setCoupons(couponsRes.data.data);
//       } catch (error: any) {
//         console.error("Error fetching data:", error);

//         // ✅ optional debug biar lebih jelas
//         if (error.response) {
//           console.error("Response error:", error.response.data);
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // ✅ loading state
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-surface">
//         <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
//       </div>
//     );
//   }

//   // ✅ kalau profile tidak ada
//   if (!profile) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p>Failed to load profile</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen pb-32 bg-surface">
//       <Header />

//       <main className="max-w-6xl mx-auto px-6 py-8">
//         {/* Profile Header Section */}
//         <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
//           <div className="md:col-span-8">
//             <ProfileHero profile={profile} />
//           </div>
//           <div className="md:col-span-4">
//             <PointsCard
//               points={profile.points}
//               equivalentValue={profile.equivalentValue}
//             />
//           </div>
//         </div>

//         {/* Referral & Coupons Section */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
//           <ReferralSection
//             referralCode={profile.referralCode}
//             referrals={referrals}
//           />

//           <div className="space-y-12">
//             <CouponsSection coupons={coupons} />
//             <SecuritySection />
//           </div>
//         </div>
//       </main>

//       <BottomNav />
//     </div>
//   );
// }

// // import { useState } from "react";
// // import ProfileHero from "../../../ui/ProfileHero";
// // import PointsCard from "../../../ui/PointsCard";
// // import ReferralSection from "../../../ui/ReferralSection";
// // import CouponsSection from "../../../ui/CouponsSection";
// // import SecuritySection from "../../../ui/SecuritySection";
// // // import BottomNav from "../../../ui/BottomNav";
// // import type { Coupon, Profile, Referral } from "../../../types/userType";

// // export default function App() {
// //   // ✅ STATIC DATA
// //  const [profile] = useState<Profile>({
// //   name: "Adrian Wijaya",
// //   role: "ORGANIZER", // atau sesuai logic component
// //   avatar: "https://i.pravatar.cc/150",
// //   email: "adrian@example.com",
// //   points: 30000,
// //   equivalentValue: 30000,
// //   referralCode: "CONCIERGE-99",
// // });

// //   const [referrals] = useState<Referral[]>([
// //     {
// //       id: "1",
// //       name: "Alice",
// //       joined: "2024-01-01",
// //     },
// //   ] as Referral[]);
// // const [coupons] = useState<Coupon[]>([
// //   {
// //     id: "1",
// //     couponCode: "DISC20",
// //     discountAmount: 20,
// //     title: "New Year Special",
// //     description: "Min. transaction Rp 500.000",
// //     expiresAt: "2026-12-31",
// //   },
// // ]);

// //   return (
// //     <div className="min-h-screen pb-32 bg-surface">


// //       <main className="max-w-6xl mx-auto px-6 py-8">
// //         {/* Profile Header Section */}
// //         <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
// //           <div className="md:col-span-8">
// //             <ProfileHero profile={profile} />
// //           </div>
// //           <div className="md:col-span-4">
// //             <PointsCard
// //               points={profile.points}
// //               equivalentValue={profile.equivalentValue}
// //             />
// //           </div>
// //         </div>

// //         {/* Referral & Coupons Section */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
// //           <ReferralSection
// //             referralCode={profile.referralCode}
// //             referrals={referrals}
// //           />

// //           <div className="space-y-12">
// //             <CouponsSection coupons={coupons} />
// //             <SecuritySection />
// //           </div>
// //         </div>
// //       </main>

// //       {/* <BottomNav /> */}
// //     </div>
// //   );
// // }

// import React, { useState, useEffect, useRef } from 'react';
// import { useFormik } from 'formik';
// import axiosInstance from '../../../api/axiosInstance';
// import type { UserProfile, EditProfileProps } from './edit-profile/types/EditProfileTypes';
// import { personalInfoSchema, securitySchema } from './edit-profile/schema/editProfileSchema';
// import { ProfileOverview } from './edit-profile/components/profile/ProfileOverview';
// import { ProfileCard } from './edit-profile/components/profile/ProfileCard';
// import { PersonalInfoSection } from './edit-profile/components/profile/PersonalInfoSection';
// import { SecuritySection } from './edit-profile/components/profile/SecuritySection';
// import { RewardsSection } from './edit-profile/components/profile/RewardsSection';


// export default function ProfilePage({ isEditMode }: EditProfileProps) {
//   const [profile, setProfile] = useState<UserProfile | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [showPassword, setShowPassword] = useState(false);
//   const [copied, setCopied] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleCopyCode = (code: string) => {
//     navigator.clipboard.writeText(code);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const fetchProfile = async () => {
//     try {
//       const response = await axiosInstance.get('/auth/details');
//       setProfile(response.data);
//     } catch (error) {
//       console.error('Failed to fetch profile', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const personalInfoForm = useFormik({
//     initialValues: {
//       fullName: profile?.fullName || '',
//       email: profile?.email || '',
//       bio: profile?.bio || '',
//     },
//     enableReinitialize: true,
//     validationSchema: personalInfoSchema,
//     onSubmit: async (values) => {
//       try {
//         const response = await axiosInstance.patch('auth/update-details', values);
//         setProfile(response.data.profile);
//         alert('Personal information updated!');
//       } catch (error) {
//         console.error('Update failed', error);
//       }
//     },
//   });

//   const securityForm = useFormik({
//     initialValues: {
//       currentPassword: '',
//       newPassword: '',
//       confirmPassword: '',
//     },
//     validationSchema: securitySchema,
//     onSubmit: async (values, { resetForm }) => {
//       try {
//         await axiosInstance.post('/change-password', values);
//         alert('Password changed successfully!');
//         resetForm();
//       } catch (error) {
//         console.error('Password change failed', error);
//       }
//     },
//   });

//   const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       if (file.size > 800 * 1024) {
//         alert('File size must be less than 800KB');
//         return;
//       }

//       const formData = new FormData();
//       formData.append('profilePicture', file);

//       try {
//         const response = await axiosInstance.patch('/auth/update-details', formData, {
//           headers: { 'Content-Type': 'multipart/form-data' },
//         });
//         setProfile(response.data.profile);
//       } catch (error) {
//         console.error('File upload failed', error);
//       }
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004bb2]" />
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-5xl mx-auto space-y-12 pb-24">
//       {/* Header */}
//       <header className="space-y-2">
//         <h1 className="text-5xl font-black tracking-tight leading-none text-[#171c21]">
//           {isEditMode ? 'Edit Profile' : 'Profile Overview'}
//         </h1>
//         <p className="text-[#424654] text-lg">
//           {isEditMode 
//             ? 'Manage your personal information and security preferences.' 
//             : 'Explore your premium account details and active rewards.'}
//         </p>
//       </header>

//       {!isEditMode ? (
//         <ProfileOverview 
//           profile={profile} 
//           copied={copied} 
//           handleCopyCode={handleCopyCode} 
//         />
//       ) : (
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
//           <div className="lg:col-span-4 space-y-6">
//             <ProfileCard 
//               profile={profile} 
//               fileInputRef={fileInputRef} 
//               handleFileChange={handleFileChange} 
//             />
//           </div>

//           <div className="lg:col-span-8 space-y-8">
//             <PersonalInfoSection formik={personalInfoForm} />
//             <SecuritySection 
//               formik={securityForm} 
//               showPassword={showPassword} 
//               setShowPassword={setShowPassword} 
//             />
//             <RewardsSection 
//               profile={profile} 
//               handleCopyCode={handleCopyCode} 
//               copied={copied} 
//             />

//             {/* Action Buttons */}
//             <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-4">
//               <button 
//                 type="button"
//                 className="w-full sm:w-auto px-10 py-4 text-[#424654] font-bold hover:bg-[#f0f4fb] rounded-xl transition-all"
//               >
//                 Cancel
//               </button>
//               <button 
//                 type="submit"
//                 disabled={personalInfoForm.isSubmitting || securityForm.isSubmitting}
//                 onClick={() => {
//                   personalInfoForm.handleSubmit();
//                   if (securityForm.values.newPassword) {
//                     securityForm.handleSubmit();
//                   }
//                 }}
//                 className="w-full sm:w-auto px-12 py-4 bg-gradient-to-r from-[#004bb2] to-[#1863dc] text-white font-bold rounded-xl shadow-xl shadow-blue-100 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
//               >
//                 {personalInfoForm.isSubmitting || securityForm.isSubmitting ? 'Saving...' : 'Save Changes'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// import React, { useState, useRef } from 'react';
// import { useFormik } from 'formik';
// import { personalInfoSchema, securitySchema } from './edit-profile/schema/editProfileSchema';
// import { ProfileOverview } from './edit-profile/components/profile/ProfileOverview';
// import { ProfileCard } from './edit-profile/components/profile/ProfileCard';
// import { PersonalInfoSection } from './edit-profile/components/profile/PersonalInfoSection';
// import { SecuritySection } from './edit-profile/components/profile/SecuritySection';
// import { RewardsSection } from './edit-profile/components/profile/RewardsSection';
// import { useProfile } from '../../organizer/profile/hooks/useProfile';

// export default function ProfilePage() {
//   // ✅ alias biar tetap pakai nama "profile"
//   const { user: profile, isLoading, updateProfile } = useProfile();

//   const [isEditMode, setIsEditMode] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [copied, setCopied] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleCopyCode = (code: string) => {
//     navigator.clipboard.writeText(code);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   // ================= FORM =================
//   const personalInfoForm = useFormik({
//     initialValues: {
//       fullName: profile?.fullName || '',
//       email: profile?.email || '',
//       bio: profile?.bio || '',
//     },
//     enableReinitialize: true,
//     validationSchema: personalInfoSchema,
//     onSubmit: async (values) => {
//       try {
//         await updateProfile.mutateAsync(values); // ✅ FIX
//         setIsEditMode(false);
//       } catch (error) {
//         console.error('Update failed', error);
//       }
//     },
//   });

//   const securityForm = useFormik({
//     initialValues: {
//       currentPassword: '',
//       newPassword: '',
//       confirmPassword: '',
//     },
//     validationSchema: securitySchema,
//     onSubmit: async () => {
//       console.log('Password change not implemented');
//     },
//   });

//   // ================= UPLOAD =================
//   const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     if (file.size > 800 * 1024) {
//       alert('File size must be less than 800KB');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('avatar', file);

//     try {
//       await updateProfile.mutateAsync(formData); // ✅ FIX
//     } catch (error) {
//       console.error('Upload failed', error);
//     }
//   };

//   // ================= LOADING =================
//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
//       </div>
//     );
//   }

//   // ✅ FIX: pakai profile (alias dari user)
//   if (!profile) {
//     return <div className="text-center mt-10">Profile not found</div>;
//   }

//   return (
//     <div className="max-w-5xl mx-auto space-y-10 pb-24">

//       {/* HEADER */}
//       <header className="flex justify-between items-center">
//         <div>
//           <h1 className="text-4xl font-bold text-gray-900">
//             {isEditMode ? 'Edit Profile' : 'Profile Overview'}
//           </h1>
//           <p className="text-gray-500">
//             {isEditMode
//               ? 'Update your personal information'
//               : 'View your profile information'}
//           </p>
//         </div>

//         {/* TOGGLE */}
//         <button
//           onClick={() => setIsEditMode(!isEditMode)}
//           className="px-6 py-2 bg-blue-600 text-white rounded-lg"
//         >
//           {isEditMode ? 'Cancel' : 'Edit Profile'}
//         </button>
//       </header>

//       {!isEditMode ? (
//         <ProfileOverview
//           profile={profile}
//           copied={copied}
//           handleCopyCode={handleCopyCode}
//         />
//       ) : (
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

//           <div className="lg:col-span-4">
//             <ProfileCard
//               profile={profile}
//               fileInputRef={fileInputRef}
//               handleFileChange={handleFileChange}
//             />
//           </div>

//           <div className="lg:col-span-8 space-y-8">
//             <PersonalInfoSection formik={personalInfoForm} />

//             <SecuritySection
//               formik={securityForm}
//               showPassword={showPassword}
//               setShowPassword={setShowPassword}
//             />

//             <RewardsSection
//               profile={profile}
//               handleCopyCode={handleCopyCode}
//               copied={copied}
//             />

//             <div className="flex justify-end gap-4">
//               <button
//                 onClick={() => setIsEditMode(false)}
//                 className="px-6 py-3 bg-gray-200 rounded-lg"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={() => personalInfoForm.handleSubmit()}
//                 disabled={personalInfoForm.isSubmitting}
//                 className="px-8 py-3 bg-blue-600 text-white rounded-lg"
//               >
//                 {personalInfoForm.isSubmitting ? 'Saving...' : 'Save Changes'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ProfileOverview } from './edit-profile/components/profile/ProfileOverview';
import { useProfile } from '../../organizer/profile/hooks/useProfile';

export default function ProfilePage() {
  const { user: profile, isLoading } = useProfile();
  const navigate = useNavigate();

  const [copied, setCopied] = useState(false);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ================= LOADING =================
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (!profile) {
    return <div className="text-center mt-10">Profile not found</div>;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-24">

      {/* HEADER */}
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            Profile Overview
          </h1>
          <p className="text-gray-500">
            View your profile information
          </p>
        </div>

        {/* 🔥 REDIRECT KE /edit */}
        <button
          onClick={() => navigate('/edit')}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg"
        >
          Edit Profile
        </button>
      </header>

      {/* CONTENT */}
      <ProfileOverview
        profile={profile}
        copied={copied}
        handleCopyCode={handleCopyCode}
      />
    </div>
  );
}