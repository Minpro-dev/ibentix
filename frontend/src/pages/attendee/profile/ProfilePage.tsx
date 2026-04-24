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

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// import { ProfileOverview } from './edit-profile/components/profile/ProfileOverview';
// import { useProfile } from '../../organizer/profile/hooks/useProfile';

// export default function ProfilePage() {
//   const { user: profile, isLoading } = useProfile();
//   const navigate = useNavigate();

//   const [copied, setCopied] = useState(false);

//   const handleCopyCode = (code: string) => {
//     navigator.clipboard.writeText(code);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   // ================= LOADING =================
//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
//       </div>
//     );
//   }

//   if (!profile) {
//     return <div className="text-center mt-10">Profile not found</div>;
//   }

//   return (
//     <div className="max-w-5xl mx-auto space-y-10 pb-24">

//       {/* HEADER */}
//       <header className="flex justify-between items-center">
//         <div>
//           <h1 className="text-4xl font-bold text-gray-900">
//             Profile Overview
//           </h1>
//           <p className="text-gray-500">
//             View your profile information
//           </p>
//         </div>

//         {/* 🔥 REDIRECT KE /edit */}
//         <button
//           onClick={() => navigate('/edit')}
//           className="px-6 py-2 bg-blue-600 text-white rounded-lg"
//         >
//           Edit Profile
//         </button>
//       </header>

//       {/* CONTENT */}
//       <ProfileOverview
//         profile={profile}
//         copied={copied}
//         handleCopyCode={handleCopyCode}
//       />
//     </div>
//   );
// }

// import React, { useState, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';

// import { ProfileOverview } from './edit-profile/components/profile/ProfileOverview';
// import { useProfile } from '../../organizer/profile/hooks/useProfile';

// export default function ProfilePage() {
//   const { user: profile, isLoading } = useProfile();
//   const navigate = useNavigate();

//   const [copied, setCopied] = useState(false);

//   // ✅ pakai useCallback biar tidak recreate function terus
//   const handleCopyCode = useCallback((code: string) => {
//     navigator.clipboard.writeText(code);
//     setCopied(true);

//     setTimeout(() => setCopied(false), 2000);
//   }, []);

//   // ================= LOADING =================
//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
//       </div>
//     );
//   }

//   // ================= EMPTY STATE =================
//   if (!profile) {
//     return (
//       <div className="flex flex-col items-center justify-center mt-20 text-gray-500">
//         <p className="text-lg font-medium">Profile not found</p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-5xl mx-auto space-y-10 pb-24 px-4">

//       {/* HEADER */}
//       <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
//         <div>
//           <h1 className="text-4xl font-bold text-gray-900">
//             Profile Overview
//           </h1>
//           <p className="text-gray-500">
//             View your profile information
//           </p>
//         </div>

//         {/* 🔥 REDIRECT KE /edit */}
//         <button
//           onClick={() => navigate('/edit')}
//           className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all shadow-sm"
//         >
//           Edit Profile
//         </button>
//       </header>

//       {/* CONTENT */}
//       <ProfileOverview
//         profile={profile}
//         copied={copied}
//         handleCopyCode={handleCopyCode}
//       />
//     </div>
//   );
// }

// import React, { useState, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useQuery } from '@tanstack/react-query';
// import axiosInstance from '../../../api/axiosInstance';

// // ─── Types ────────────────────────────────────────────────────────────────────
// // ✅ Align these field names with your actual backend response shape.
// // Check your API response in DevTools → Network → /auth/details → Response.
// export interface UserProfile {
//   fullName: string;       // or "name" — match exactly what your backend returns
//   email: string;
//   bio?: string;
//   avatar?: string;        // or "profilePicture", "profileImage" — match your backend
//   points?: number;
//   equivalentValue?: number;
//   referralCode?: string;
//   role?: string;
// }

// // ─── Data Fetching ────────────────────────────────────────────────────────────
// // ✅ Uses React Query for robust caching + loading/error states.
// // Swap '/auth/details' for your actual endpoint if different.
// function useProfile() {
//   return useQuery<UserProfile>({
//     queryKey: ['profile'],
//     queryFn: async () => {
//       const res = await axiosInstance.get('/auth/details');
//       // ✅ COMMON FIX: backends often nest data. Try one of:
//       //   return res.data;          ← if your API returns the object directly
//       //   return res.data.data;     ← if wrapped in { data: { ... } }
//       //   return res.data.user;     ← if wrapped in { user: { ... } }
//       return res.data.data ?? res.data;
//     },
//   });
// }

// // ─── Avatar Component ─────────────────────────────────────────────────────────
// function Avatar({ src, name }: { src?: string; name: string }) {
//   const [imgError, setImgError] = useState(false);

//   // ✅ FIX: shows initials if avatar URL is missing or broken
//   if (!src || imgError) {
//     const initials = name
//       .split(' ')
//       .map((n) => n[0])
//       .join('')
//       .toUpperCase()
//       .slice(0, 2);

//     return (
//       <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-2xl font-bold select-none">
//         {initials}
//       </div>
//     );
//   }

//   return (
//     <img
//       src={src}
//       alt={name}
//       className="w-24 h-24 rounded-full object-cover border-2 border-white shadow-md"
//       onError={() => setImgError(true)}
//     />
//   );
// }

// // ─── Profile Overview ─────────────────────────────────────────────────────────
// function ProfileOverview({
//   profile,
//   copied,
//   onCopyCode,
// }: {
//   profile: UserProfile;
//   copied: boolean;
//   onCopyCode: (code: string) => void;
// }) {
//   return (
//     <div className="space-y-8">
//       {/* Profile Card */}
//       <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
//         <Avatar src={profile.avatar} name={profile.fullName} />

//         <div className="flex-1 text-center sm:text-left">
//           {/* ✅ FIX: renders fullName directly — was empty before because
//               ProfileOverview was likely reading a field that didn't exist */}
//           <h2 className="text-2xl font-bold text-gray-900">
//             {profile.fullName || '—'}
//           </h2>
//           <p className="text-gray-500 mt-1">{profile.email}</p>
//           {profile.role && (
//             <span className="inline-block mt-2 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full uppercase tracking-wide">
//               {profile.role}
//             </span>
//           )}
//           {profile.bio && (
//             <p className="mt-3 text-gray-600 text-sm leading-relaxed max-w-md">
//               {profile.bio}
//             </p>
//           )}
//         </div>
//       </div>

//       {/* Points & Rewards */}
//       {(profile.points !== undefined || profile.referralCode) && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//           {profile.points !== undefined && (
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//               <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">Points</p>
//               <p className="text-3xl font-black text-gray-900 mt-1">
//                 {profile.points.toLocaleString()}
//               </p>
//               {profile.equivalentValue !== undefined && (
//                 <p className="text-gray-400 text-sm mt-1">
//                   ≈ Rp {profile.equivalentValue.toLocaleString()}
//                 </p>
//               )}
//             </div>
//           )}

//           {profile.referralCode && (
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//               <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">
//                 Referral Code
//               </p>
//               <div className="flex items-center gap-3 mt-2">
//                 <code className="text-lg font-bold text-gray-900 tracking-widest">
//                   {profile.referralCode}
//                 </code>
//                 <button
//                   onClick={() => onCopyCode(profile.referralCode!)}
//                   className="px-3 py-1 text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors font-medium"
//                 >
//                   {copied ? 'Copied!' : 'Copy'}
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// // ─── Main Page ────────────────────────────────────────────────────────────────
// export default function ProfilePage() {
//   const { data: profile, isLoading, isError, refetch } = useProfile();
//   const navigate = useNavigate();
//   const [copied, setCopied] = useState(false);

//   const handleCopyCode = useCallback((code: string) => {
//     navigator.clipboard.writeText(code);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   }, []);

//   // ── Loading ──────────────────────────────────────────────────────────────
//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
//       </div>
//     );
//   }

//   // ── Error ────────────────────────────────────────────────────────────────
//   if (isError) {
//     return (
//       <div className="flex flex-col items-center justify-center mt-20 gap-4 text-gray-500">
//         <p className="text-lg font-medium">Failed to load profile.</p>
//         <p className="text-sm text-gray-400">
//           Check the network tab — your token may be expired or the endpoint may be wrong.
//         </p>
//         <button
//           onClick={() => refetch()}
//           className="mt-2 px-5 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   // ── Empty ────────────────────────────────────────────────────────────────
//   if (!profile) {
//     return (
//       <div className="flex flex-col items-center justify-center mt-20 text-gray-500">
//         <p className="text-lg font-medium">Profile not found</p>
//       </div>
//     );
//   }

//   // ── Render ───────────────────────────────────────────────────────────────
//   return (
//     <div className="max-w-5xl mx-auto space-y-10 pb-24 px-4">
//       <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
//         <div>
//           <h1 className="text-4xl font-bold text-gray-900">Profile Overview</h1>
//           <p className="text-gray-500">View your profile information</p>
//         </div>
//         <button
//           onClick={() => navigate('/edit')}
//           className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all shadow-sm"
//         >
//           Edit Profile
//         </button>
//       </header>

//       <ProfileOverview
//         profile={profile}
//         copied={copied}
//         onCopyCode={handleCopyCode}
//       />
//     </div>
//   );
// }

// import React, { useState, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useQuery } from '@tanstack/react-query';
// import axiosInstance from '../../../api/axiosInstance';

// // ─────────────────────────────────────────────────────────────────────────────
// // ✅ HOW TO FIX "empty fields":
// //   1. Set DEBUG = true below → a panel will print raw API responses on screen
// //   2. Look at what field names your backend actually returns
// //   3. Update the resolve*() helpers near line 90 to match
// //
// // OR check DevTools → Network → /auth/details, /coupons, /referrals → Response
// // ─────────────────────────────────────────────────────────────────────────────
// const DEBUG = true; // ← set false once all fields display correctly

// // ─── Types — field names here are flexible, resolvers handle the mapping ──────
// export interface UserProfile {
//   // Profile basics — backend may use ANY of these names
//   fullName?: string;
//   name?: string;
//   email?: string;
//   bio?: string;
//   // Avatar — backend may use ANY of these names
//   avatar?: string;
//   profilePicture?: string;
//   profileImage?: string;
//   image?: string;
//   // Rewards
//   points?: number;
//   equivalentValue?: number;
//   // Referral
//   referralCode?: string;
//   referral_code?: string;
//   role?: string;
//   [key: string]: unknown; // allow other fields to pass through
// }

// export interface Coupon {
//   id: string;
//   couponCode?: string;
//   code?: string;
//   title?: string;
//   name?: string;
//   description?: string;
//   discountAmount?: number;
//   discount?: number;
//   expiresAt?: string;
//   expiry?: string;
//   expiredAt?: string;
//   validUntil?: string;
//   [key: string]: unknown;
// }

// export interface Referral {
//   id: string;
//   name?: string;
//   email?: string;
//   joined?: string;
//   joinedAt?: string;
//   createdAt?: string;
//   created_at?: string;
//   [key: string]: unknown;
// }

// // ─── Field Resolvers — UPDATE THESE to match your backend's field names ───────
// // These are the ONLY places you need to change field names.

// function resolveName(p: UserProfile): string {
//   // 🔧 Change 'fullName' to whatever key your backend uses
//   return (p.fullName || p.name || '') as string;
// }

// function resolveAvatar(p: UserProfile): string | undefined {
//   // 🔧 Change order to prioritize the field your backend uses
//   return (p.avatar || p.profilePicture || p.profileImage || p.image) as string | undefined;
// }

// function resolveReferralCode(p: UserProfile): string | undefined {
//   // 🔧 Change to the field name your backend uses
//   return (p.referralCode || p.referral_code) as string | undefined;
// }

// function resolveCouponCode(c: Coupon): string {
//   return (c.couponCode || c.code || '—') as string;
// }

// function resolveCouponTitle(c: Coupon): string {
//   return (c.title || c.name || 'Coupon') as string;
// }

// function resolveCouponDiscount(c: Coupon): number {
//   return (c.discountAmount ?? c.discount ?? 0) as number;
// }

// function resolveCouponExpiry(c: Coupon): string {
//   return (c.expiresAt || c.expiry || c.expiredAt || c.validUntil || '') as string;
// }

// function resolveReferralDate(r: Referral): string {
//   return (r.joined || r.joinedAt || r.createdAt || r.created_at || '') as string;
// }

// // ─── Data Fetching ────────────────────────────────────────────────────────────
// function useProfileData() {
//   const profileQuery = useQuery<UserProfile>({
//     queryKey: ['profile'],
//     queryFn: async () => {
//       const res = await axiosInstance.get('/auth/details');
//       // 🔧 Adjust if your API wraps the response:
//       //   res.data           → object is returned directly
//       //   res.data.data      → wrapped in { data: {...} }
//       //   res.data.user      → wrapped in { user: {...} }
//       return res.data?.data ?? res.data;
//     },
//   });

//   const referralsQuery = useQuery<Referral[]>({
//     queryKey: ['referrals'],
//     queryFn: async () => {
//       const res = await axiosInstance.get('/referrals');
//       const raw = res.data?.data ?? res.data;
//       // Handles: array, { referrals: [] }, { items: [] }, { data: [] }
//       return Array.isArray(raw) ? raw : (raw?.referrals ?? raw?.items ?? raw?.data ?? []);
//     },
//   });

//   const couponsQuery = useQuery<Coupon[]>({
//     queryKey: ['coupons'],
//     queryFn: async () => {
//       const res = await axiosInstance.get('/coupons');
//       const raw = res.data?.data ?? res.data;
//       return Array.isArray(raw) ? raw : (raw?.coupons ?? raw?.items ?? raw?.data ?? []);
//     },
//   });

//   return {
//     profile: profileQuery.data,
//     referrals: referralsQuery.data ?? [],
//     coupons: couponsQuery.data ?? [],
//     isLoading: profileQuery.isLoading,
//     isError: profileQuery.isError,
//     refetch: profileQuery.refetch,
//     _raw: {
//       profile: profileQuery.data,
//       referralsStatus: referralsQuery.status,
//       referrals: referralsQuery.data,
//       referralsError: referralsQuery.error,
//       couponsStatus: couponsQuery.status,
//       coupons: couponsQuery.data,
//       couponsError: couponsQuery.error,
//     },
//   };
// }

// // ─── Debug Panel ──────────────────────────────────────────────────────────────
// function DebugPanel({ data }: { data: Record<string, unknown> }) {
//   const [open, setOpen] = useState(true);
//   if (!DEBUG) return null;
//   return (
//     <div className="fixed bottom-4 right-4 z-50 w-[420px] max-h-[420px] overflow-auto bg-gray-900 text-green-400 text-xs rounded-xl shadow-2xl border border-gray-700 font-mono">
//       <div className="flex items-center justify-between px-3 py-2 bg-gray-800 rounded-t-xl sticky top-0">
//         <span className="font-bold text-yellow-400">🛠 Debug — Raw API Data</span>
//         <button onClick={() => setOpen(!open)} className="text-gray-400 hover:text-white ml-2">
//           {open ? '▲ hide' : '▼ show'}
//         </button>
//       </div>
//       {open && (
//         <pre className="p-3 whitespace-pre-wrap break-all leading-relaxed">
//           {JSON.stringify(data, null, 2)}
//         </pre>
//       )}
//     </div>
//   );
// }

// // ─── Avatar ───────────────────────────────────────────────────────────────────
// function Avatar({ src, name }: { src?: string; name: string }) {
//   const [imgError, setImgError] = useState(false);

//   if (!src || imgError) {
//     const initials = name
//       .split(' ')
//       .filter(Boolean)
//       .map((n) => n[0])
//       .join('')
//       .toUpperCase()
//       .slice(0, 2) || '?';

//     return (
//       <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xl font-bold select-none shrink-0">
//         {initials}
//       </div>
//     );
//   }

//   return (
//     <img
//       src={src}
//       alt={name}
//       className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-md shrink-0"
//       onError={() => setImgError(true)}
//     />
//   );
// }

// // ─── Coupons Section ──────────────────────────────────────────────────────────
// function CouponsSection({ coupons }: { coupons: Coupon[] }) {
//   return (
//     <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
//       <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Coupons</h3>
//       {coupons.length === 0 ? (
//         <p className="text-gray-400 text-sm">No coupons available.</p>
//       ) : (
//         <div className="space-y-3">
//           {coupons.map((c) => (
//             <div key={c.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-xl gap-3">
//               <div className="min-w-0">
//                 <p className="font-bold text-gray-800 text-sm truncate">{resolveCouponTitle(c)}</p>
//                 {c.description && (
//                   <p className="text-xs text-gray-500 mt-0.5 truncate">{c.description}</p>
//                 )}
//                 {resolveCouponExpiry(c) && (
//                   <p className="text-xs text-gray-400 mt-0.5">
//                     Expires: {new Date(resolveCouponExpiry(c)).toLocaleDateString()}
//                   </p>
//                 )}
//               </div>
//               <div className="text-right shrink-0">
//                 <code className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-1 rounded-lg">
//                   {resolveCouponCode(c)}
//                 </code>
//                 {resolveCouponDiscount(c) > 0 && (
//                   <p className="text-xs text-gray-500 mt-1">{resolveCouponDiscount(c)}% off</p>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// // ─── Referrals Section ────────────────────────────────────────────────────────
// function ReferralSection({
//   referralCode,
//   referrals,
//   copied,
//   onCopyCode,
// }: {
//   referralCode?: string;
//   referrals: Referral[];
//   copied: boolean;
//   onCopyCode: (code: string) => void;
// }) {
//   return (
//     <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
//       <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Referrals</h3>

//       {referralCode ? (
//         <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
//           <code className="text-base font-bold text-gray-900 tracking-widest flex-1 break-all">
//             {referralCode}
//           </code>
//           <button
//             onClick={() => onCopyCode(referralCode)}
//             className="px-3 py-1.5 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium shrink-0"
//           >
//             {copied ? '✓ Copied' : 'Copy'}
//           </button>
//         </div>
//       ) : (
//         <p className="text-gray-400 text-sm">No referral code found.</p>
//       )}

//       {referrals.length === 0 ? (
//         <p className="text-gray-400 text-sm">No referrals yet.</p>
//       ) : (
//         <ul className="divide-y divide-gray-100">
//           {referrals.map((r) => (
//             <li key={r.id} className="flex items-center justify-between py-2 text-sm">
//               <span className="text-gray-800 font-medium">{r.name || r.email || r.id}</span>
//               {resolveReferralDate(r) && (
//                 <span className="text-gray-400 text-xs">
//                   {new Date(resolveReferralDate(r)).toLocaleDateString()}
//                 </span>
//               )}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// // ─── Main Page ────────────────────────────────────────────────────────────────
// export default function ProfilePage() {
//   const { profile, referrals, coupons, isLoading, isError, refetch, _raw } = useProfileData();
//   const navigate = useNavigate();
//   const [copied, setCopied] = useState(false);

//   const handleCopyCode = useCallback((code: string) => {
//     navigator.clipboard.writeText(code);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   }, []);

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
//       </div>
//     );
//   }

//   if (isError || !profile) {
//     return (
//       <div className="flex flex-col items-center justify-center mt-20 gap-4 text-gray-500">
//         <p className="text-lg font-medium">{isError ? 'Failed to load profile.' : 'Profile not found.'}</p>
//         <button onClick={() => refetch()} className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm">
//           Retry
//         </button>
//         <DebugPanel data={_raw as Record<string, unknown>} />
//       </div>
//     );
//   }

//   const displayName = resolveName(profile);
//   const avatarSrc = resolveAvatar(profile);
//   const referralCode = resolveReferralCode(profile);

//   return (
//     <div className="max-w-5xl mx-auto space-y-8 pb-24 px-4">
//       {/* Header */}
//       <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 pt-6">
//         <div>
//           <h1 className="text-4xl font-bold text-gray-900">Profile Overview</h1>
//           <p className="text-gray-500">View your profile information</p>
//         </div>
//         <button
//           onClick={() => navigate('/edit')}
//           className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all shadow-sm"
//         >
//           Edit Profile
//         </button>
//       </header>

//       {/* Profile Card */}
//       <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
//         <Avatar src={avatarSrc} name={displayName} />
//         <div className="flex-1 text-center sm:text-left">
//           <h2 className="text-2xl font-bold text-gray-900">{displayName || '—'}</h2>
//           <p className="text-gray-500 mt-1">{profile.email as string}</p>
//           {profile.role && (
//             <span className="inline-block mt-2 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full uppercase tracking-wide">
//               {profile.role as string}
//             </span>
//           )}
//           {profile.bio && (
//             <p className="mt-3 text-gray-600 text-sm leading-relaxed max-w-md">{profile.bio as string}</p>
//           )}
//         </div>
//         {profile.points !== undefined && (
//           <div className="shrink-0 text-center bg-blue-50 rounded-xl px-6 py-4">
//             <p className="text-3xl font-black text-blue-700">{(profile.points as number).toLocaleString()}</p>
//             <p className="text-xs text-gray-500 mt-1 uppercase tracking-wide">Points</p>
//             {profile.equivalentValue !== undefined && (
//               <p className="text-xs text-gray-400 mt-0.5">≈ Rp {(profile.equivalentValue as number).toLocaleString()}</p>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Referrals + Coupons */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <ReferralSection
//           referralCode={referralCode}
//           referrals={referrals}
//           copied={copied}
//           onCopyCode={handleCopyCode}
//         />
//         <CouponsSection coupons={coupons} />
//       </div>

//       {/* Debug panel — set DEBUG = false once everything looks correct */}
//       <DebugPanel data={_raw as Record<string, unknown>} />
//     </div>
//   );
// }

import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../../api/axiosInstance';

// ─── Types (confirmed from debug output + backend code) ───────────────────────
interface UserProfile {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  gender?: string;
  address?: string;
  role: string;
  myReferralCode?: string;  // confirmed field name
  avatar?: string;          // confirmed field name
  isVerified: boolean;
  createdAt: string;
}

// Referral coupon = a coupon the user received for being referred
// Shape comes from referralCouponService.getReferralCouponDetails()
interface ReferralCoupon {
  id: string;
  couponCode?: string;
  code?: string;
  discountAmount?: number;
  discount?: number;
  validFrom?: string;
  validUntil?: string;
  expiresAt?: string;
  isUsed?: boolean;
  used?: boolean;
}

// ─── Data Fetching ────────────────────────────────────────────────────────────
function useProfileData() {
  // ✅ Confirmed: GET /api/auth/details → { profile: { ... } }
  const profileQuery = useQuery<UserProfile>({
    queryKey: ['profile'],
    queryFn: async () => {
      const res = await axiosInstance.get('/auth/details');
      return res.data?.profile ?? res.data?.data ?? res.data;
    },
  });

  // ✅ Confirmed: GET /api/referral-coupon → { status, message, data: couponDetails }
  // ATTENDEE authorized. Returns the coupon this user received for being referred.
  const referralCouponQuery = useQuery<ReferralCoupon | null>({
    queryKey: ['referral-coupon'],
    queryFn: async () => {
      const res = await axiosInstance.get('/referral-coupon');
      return res.data?.data ?? null;
    },
    retry: false, // don't retry — if user has no referral coupon, just show empty
  });

  return {
    profile: profileQuery.data,
    referralCoupon: referralCouponQuery.data ?? null,
    isLoading: profileQuery.isLoading,
    isError: profileQuery.isError,
    refetch: profileQuery.refetch,
  };
}

// ─── Avatar ───────────────────────────────────────────────────────────────────
function Avatar({ src, name }: { src?: string; name: string }) {
  const [imgError, setImgError] = useState(false);

  if (!src || imgError) {
    const initials = name
      .split(' ')
      .filter(Boolean)
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || '?';

    return (
      <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xl font-bold select-none shrink-0">
        {initials}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-md shrink-0"
      onError={() => setImgError(true)}
    />
  );
}

// ─── Referral Code Card ───────────────────────────────────────────────────────
// Shows the user's OWN referral code (from profile.myReferralCode)
// so they can share it with friends
function MyReferralCodeCard({
  code,
  copied,
  onCopy,
}: {
  code: string;
  copied: boolean;
  onCopy: (code: string) => void;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-3">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
        Your Referral Code
      </h3>
      <p className="text-xs text-gray-400">
        Share this code with friends. When they sign up using it, you both get rewards.
      </p>
      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
        <code className="text-lg font-black text-gray-900 tracking-widest flex-1">
          {code}
        </code>
        <button
          onClick={() => onCopy(code)}
          className="px-4 py-2 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-semibold shrink-0"
        >
          {copied ? '✓ Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  );
}

// ─── Referral Coupon Card ─────────────────────────────────────────────────────
// Shows the coupon this user RECEIVED because someone referred them
function ReferralCouponCard({
  coupon,
  copied,
  onCopy,
}: {
  coupon: ReferralCoupon | null;
  copied: boolean;
  onCopy: (code: string) => void;
}) {
  const code = coupon?.couponCode || coupon?.code;
  const discount = coupon?.discountAmount ?? coupon?.discount;
  const expiry = coupon?.validUntil || coupon?.expiresAt;
  const isUsed = coupon?.isUsed ?? coupon?.used ?? false;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-3">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
        Referral Coupon
      </h3>
      <p className="text-xs text-gray-400">
        A coupon you received for joining via a referral code.
      </p>

      {!coupon || !code ? (
        <p className="text-gray-400 text-sm py-2">No referral coupon available.</p>
      ) : (
        <div
          className={`p-4 rounded-xl border-2 ${
            isUsed
              ? 'border-gray-200 bg-gray-50 opacity-60'
              : 'border-blue-200 bg-blue-50'
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              {discount !== undefined && (
                <p className="text-2xl font-black text-blue-700">{discount}% off</p>
              )}
              <div className="flex items-center gap-2 mt-1">
                <code className="text-sm font-bold text-gray-800 tracking-wider">
                  {code}
                </code>
                {!isUsed && (
                  <button
                    onClick={() => onCopy(code)}
                    className="px-2 py-0.5 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded font-medium transition-colors"
                  >
                    {copied ? '✓' : 'Copy'}
                  </button>
                )}
              </div>
              {expiry && (
                <p className="text-xs text-gray-400 mt-1">
                  Valid until {new Date(expiry).toLocaleDateString('id-ID', {
                    day: 'numeric', month: 'long', year: 'numeric',
                  })}
                </p>
              )}
            </div>
            <span
              className={`shrink-0 text-xs font-semibold px-2 py-1 rounded-full ${
                isUsed
                  ? 'bg-gray-200 text-gray-500'
                  : 'bg-green-100 text-green-700'
              }`}
            >
              {isUsed ? 'Used' : 'Active'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ProfilePage() {
  const { profile, referralCoupon, isLoading, isError, refetch } = useProfileData();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback((code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (isError || !profile) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 gap-4 text-gray-500">
        <p className="text-lg font-medium">Failed to load profile.</p>
        <button
          onClick={() => refetch()}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  // ✅ Confirmed: firstName + lastName from API
  const displayName = `${profile.firstName} ${profile.lastName}`.trim();

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-24 px-4">

      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 pt-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Profile Overview</h1>
          <p className="text-gray-500">View your profile information</p>
        </div>
        <button
          onClick={() => navigate('/edit')}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all shadow-sm"
        >
          Edit Profile
        </button>
      </header>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <Avatar src={profile.avatar} name={displayName} />

        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-2xl font-bold text-gray-900">{displayName}</h2>
          <p className="text-gray-500 mt-1">{profile.email}</p>
          {profile.phone && (
            <p className="text-gray-400 text-sm mt-0.5">{profile.phone}</p>
          )}

          <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
            <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full uppercase tracking-wide">
              {profile.role}
            </span>
            {profile.isVerified ? (
              <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full">
                ✓ Verified
              </span>
            ) : (
              <span className="px-3 py-1 bg-amber-50 text-amber-600 text-xs font-semibold rounded-full">
                Unverified
              </span>
            )}
          </div>

          {profile.address && (
            <p className="mt-3 text-gray-400 text-sm">{profile.address}</p>
          )}
        </div>
      </div>

      {/* Referral Code + Referral Coupon */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {profile.myReferralCode && (
          <MyReferralCodeCard
            code={profile.myReferralCode}
            copied={copied}
            onCopy={handleCopy}
          />
        )}
        <ReferralCouponCard
          coupon={referralCoupon}
          copied={copied}
          onCopy={handleCopy}
        />
      </div>

    </div>
  );
}
