import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../api/axiosInstance";
import { capitalize } from "../../../utils/capitalize";

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
  myReferralCode?: string; // confirmed field name
  avatar?: string; // confirmed field name
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
  const profileQuery = useQuery<UserProfile>({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await axiosInstance.get("/auth/details");
      return res.data?.profile ?? res.data?.data ?? res.data;
    },
  });

  const referralCouponQuery = useQuery<ReferralCoupon | null>({
    queryKey: ["referral-coupon"],
    queryFn: async () => {
      const res = await axiosInstance.get("/referral-coupon");
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
    const initials =
      name
        .split(" ")
        .filter(Boolean)
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) || "?";

    return (
      <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-xl font-bold select-none shrink-0">
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
        Share this code with friends. When they sign up using it, you both get
        rewards.
      </p>
      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
        <code className="text-lg font-black text-gray-900 tracking-widest flex-1">
          {code}
        </code>
        <button
          onClick={() => onCopy(code)}
          className="px-4 cursor-pointer py-2 text-xs bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-semibold shrink-0">
          {copied ? "✓ Copied!" : "Copy"}
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
        <p className="text-gray-400 text-sm py-2">
          No referral coupon available.
        </p>
      ) : (
        <div
          className={`p-4 rounded-xl border-2 ${
            isUsed
              ? "border-gray-200 bg-gray-50 opacity-60"
              : "border-indigo-200 bg-indigo-50"
          }`}>
          <div className="flex items-start justify-between gap-3">
            <div>
              {discount !== undefined && (
                <p className="text-2xl font-black text-indigo-700">
                  {discount}% off
                </p>
              )}
              <div className="flex items-center gap-2 mt-1">
                <code className="text-sm font-bold text-gray-800 tracking-wider">
                  {code}
                </code>
                {!isUsed && (
                  <button
                    onClick={() => onCopy(code)}
                    className="px-2 cursor-pointer py-0.5 text-xs bg-indigo-600 hover:bg-indigo-700 text-white rounded font-medium transition-colors">
                    {copied ? "✓" : "Copy"}
                  </button>
                )}
              </div>
              {expiry && (
                <p className="text-xs text-gray-400 mt-1">
                  Valid until{" "}
                  {new Date(expiry).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              )}
            </div>
            <span
              className={`shrink-0 text-xs font-semibold px-2 py-1 rounded-full ${
                isUsed
                  ? "bg-gray-200 text-gray-500"
                  : "bg-green-100 text-green-700"
              }`}>
              {isUsed ? "Used" : "Active"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ProfilePage() {
  const { profile, referralCoupon, isLoading, isError, refetch } =
    useProfileData();
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
      </div>
    );
  }

  if (isError || !profile) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 gap-4 text-gray-500">
        <p className="text-lg font-medium">Failed to load profile.</p>
        <button
          onClick={() => refetch()}
          className="px-5 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700">
          Retry
        </button>
      </div>
    );
  }

  const displayName =
    `${capitalize(profile.firstName)} ${capitalize(profile.lastName)}`.trim();

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-24 px-4">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 pt-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Profile Overview</h1>
          <p className="text-gray-500">View your profile information</p>
        </div>
        <button
          onClick={() => navigate("/edit")}
          className="px-6 py-2 bg-indigo-600 cursor-pointer hover:bg-indigo-700 text-white rounded-lg transition-all shadow-sm">
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
            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full uppercase tracking-wide">
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
