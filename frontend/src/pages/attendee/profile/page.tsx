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

import { useState } from "react";
import ProfileHero from "../../../ui/ProfileHero";
import PointsCard from "../../../ui/PointsCard";
import ReferralSection from "../../../ui/ReferralSection";
import CouponsSection from "../../../ui/CouponsSection";
import SecuritySection from "../../../ui/SecuritySection";
// import BottomNav from "../../../ui/BottomNav";
import type { Coupon, Profile, Referral } from "../../../types/userType";

export default function App() {
  // ✅ STATIC DATA
 const [profile] = useState<Profile>({
  name: "Adrian Wijaya",
  role: "ORGANIZER", // atau sesuai logic component
  avatar: "https://i.pravatar.cc/150",
  email: "adrian@example.com",
  points: 30000,
  equivalentValue: 30000,
  referralCode: "CONCIERGE-99",
});

  const [referrals] = useState<Referral[]>([
    {
      id: "1",
      name: "Alice",
      joined: "2024-01-01",
    },
  ] as Referral[]);
const [coupons] = useState<Coupon[]>([
  {
    id: "1",
    couponCode: "DISC20",
    discountAmount: 20,
    title: "New Year Special",
    description: "Min. transaction Rp 500.000",
    expiresAt: "2026-12-31",
  },
]);

  return (
    <div className="min-h-screen pb-32 bg-surface">


      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Profile Header Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
          <div className="md:col-span-8">
            <ProfileHero profile={profile} />
          </div>
          <div className="md:col-span-4">
            <PointsCard
              points={profile.points}
              equivalentValue={profile.equivalentValue}
            />
          </div>
        </div>

        {/* Referral & Coupons Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <ReferralSection
            referralCode={profile.referralCode}
            referrals={referrals}
          />

          <div className="space-y-12">
            <CouponsSection coupons={coupons} />
            <SecuritySection />
          </div>
        </div>
      </main>

      {/* <BottomNav /> */}
    </div>
  );
}