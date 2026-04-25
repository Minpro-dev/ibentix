import React, { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../../api/axiosInstance";

// ─── Types (confirmed from auth.schema.ts + API debug) ───────────────────────
interface UserProfile {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  gender?: "MALE" | "FEMALE";
  address?: string;
  countryId?: string;
  role: string;
  myReferralCode?: string;
  avatar?: string;
  isVerified: boolean;
  createdAt: string;
}

// All fields optional — confirmed from editUserSchema
interface EditUserPayload {
  firstName?: string;
  lastName?: string;
  phone?: string;
  gender?: "MALE" | "FEMALE";
  address?: string;
  countryId?: string;
  password?: string;
}

// ─── Validation (mirrors editUserSchema from auth.schema.ts) ─────────────────
function validateFields(
  fields: EditUserPayload & { confirmPassword?: string },
) {
  const errors: Record<string, string> = {};

  if (fields.firstName !== undefined) {
    if (fields.firstName.length < 2)
      errors.firstName = "First name must be at least 2 characters";
    if (fields.firstName.length > 30)
      errors.firstName = "First name must be at most 30 characters";
  }
  if (fields.lastName !== undefined) {
    if (fields.lastName.length < 2)
      errors.lastName = "Last name must be at least 2 characters";
    if (fields.lastName.length > 30)
      errors.lastName = "Last name must be at most 30 characters";
  }
  if (fields.phone !== undefined && fields.phone !== "") {
    if (fields.phone.length < 9)
      errors.phone = "Phone must be at least 9 digits";
    if (fields.phone.length > 15)
      errors.phone = "Phone must be at most 15 digits";
  }
  if (fields.address !== undefined && fields.address !== "") {
    if (fields.address.length < 5)
      errors.address = "Address must be at least 5 characters";
    if (fields.address.length > 45)
      errors.address = "Address must be at most 45 characters";
  }
  if (fields.password) {
    if (fields.password.length < 8)
      errors.password = "Password must be at least 8 characters";
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(fields.password))
      errors.password =
        "Password must contain uppercase, lowercase, and numbers";
    if (fields.password !== fields.confirmPassword)
      errors.confirmPassword = "Passwords do not match";
  }

  return errors;
}

// ─── Data Fetching ────────────────────────────────────────────────────────────
function useProfile() {
  return useQuery<UserProfile>({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await axiosInstance.get("/auth/details");
      return res.data?.profile ?? res.data?.data ?? res.data;
    },
  });
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="text-red-500 text-xs mt-1">{msg}</p>;
}

function Label({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
      {children}
      {required && <span className="text-red-400 ml-1">*</span>}
    </label>
  );
}

function Input({
  value,
  onChange,
  placeholder,
  type = "text",
  error,
  disabled,
  maxLength,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  error?: string;
  disabled?: boolean;
  maxLength?: number;
}) {
  return (
    <div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        className={`w-full px-4 py-3 rounded-xl border text-sm transition-all outline-none
          ${
            error
              ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-100"
              : "border-gray-200 bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          }
          ${disabled ? "bg-gray-50 text-gray-400 cursor-not-allowed" : "text-gray-900"}
        `}
      />
      <FieldError msg={error} />
    </div>
  );
}

// ─── Avatar Upload ────────────────────────────────────────────────────────────
function AvatarUpload({
  currentAvatar,
  firstName,
  lastName,
  preview,
  onFileSelect,
}: {
  currentAvatar?: string;
  firstName: string;
  lastName: string;
  preview: string | null;
  onFileSelect: (file: File) => void;
}) {
  const [imgError, setImgError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const src = preview || (!imgError ? currentAvatar : undefined);
  const initials =
    `${firstName[0] || ""}${lastName[0] || ""}`.toUpperCase() || "?";

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative group">
        {src ? (
          <img
            src={src}
            alt="Avatar"
            className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-28 h-28 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-3xl font-bold border-4 border-white shadow-lg">
            {initials}
          </div>
        )}

        {/* Hover overlay */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="absolute cursor-pointer inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="text-white text-xs font-medium">Change</span>
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          if (file.size > 800 * 1024) {
            alert("Image must be smaller than 800KB");
            return;
          }
          onFileSelect(file);
        }}
      />

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="text-sm text-indigo-600 hover:text-indigo-700 font-semibold transition-colors">
        Upload new photo
      </button>
      <p className="text-xs text-gray-400 text-center">
        JPG, PNG or WebP · Max 800KB
      </p>
    </div>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 space-y-6">
      <div>
        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
        {subtitle && <p className="text-sm text-gray-400 mt-0.5">{subtitle}</p>}
      </div>
      <div className="border-t border-gray-100" />
      {children}
    </div>
  );
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({
  message,
  type,
}: {
  message: string;
  type: "success" | "error";
}) {
  return (
    <div
      className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-xl shadow-lg text-sm font-semibold flex items-center gap-2 animate-in slide-in-from-top-2
      ${type === "success" ? "bg-green-600 text-white" : "bg-red-500 text-white"}`}>
      {type === "success" ? "✓" : "✕"} {message}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function EditProfilePage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: profile, isLoading } = useProfile();

  // Form state — pre-filled from profile
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState<"MALE" | "FEMALE" | "">("");
  const [address, setAddress] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  // Password fields (optional)
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [initialized, setInitialized] = useState(false);

  // Pre-fill form once profile loads
  React.useEffect(() => {
    if (profile && !initialized) {
      setFirstName(profile.firstName || "");
      setLastName(profile.lastName || "");
      setPhone(profile.phone || "");
      setGender((profile.gender as "MALE" | "FEMALE") || "");
      setAddress(profile.address || "");
      setInitialized(true);
    }
  }, [profile, initialized]);

  const showToast = useCallback(
    (message: string, type: "success" | "error") => {
      setToast({ message, type });
      setTimeout(() => setToast(null), 3500);
    },
    [],
  );

  // ✅ PATCH /api/auth/update-details with multipart/form-data
  const mutation = useMutation({
    mutationFn: async () => {
      const formData = new FormData();

      // Only send fields that changed
      if (firstName !== profile?.firstName)
        formData.append("firstName", firstName);
      if (lastName !== profile?.lastName) formData.append("lastName", lastName);
      if (phone !== (profile?.phone || "")) formData.append("phone", phone);
      if (gender && gender !== profile?.gender)
        formData.append("gender", gender);
      if (address !== (profile?.address || ""))
        formData.append("address", address);
      if (avatarFile) formData.append("avatar", avatarFile);
      // Password is optional — only send if filled
      if (password) formData.append("password", password);

      const res = await axiosInstance.patch("/auth/update-details", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
    onSuccess: () => {
      // Invalidate profile cache so ProfilePage refetches fresh data
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      showToast("Profile updated successfully!", "success");
      setTimeout(() => navigate(-1), 1200);
    },
    onError: (err: any) => {
      const msg =
        err?.response?.data?.message || "Update failed. Please try again.";
      showToast(msg, "error");
    },
  });

  const handleSubmit = () => {
    const validationErrors = validateFields({
      firstName,
      lastName,
      phone,
      gender: gender || undefined,
      address,
      password,
      confirmPassword,
    });

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    mutation.mutate();
  };

  const handleFileSelect = (file: File) => {
    setAvatarFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setAvatarPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center mt-20 text-gray-500">
        <p>Profile not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-24 px-4">
      {toast && <Toast message={toast.message} type={toast.type} />}

      {/* Header */}
      <header className="flex items-center gap-4 pt-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-500"
          aria-label="Go back">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Profile</h1>
          <p className="text-gray-400 text-sm mt-0.5">
            Update your personal information
          </p>
        </div>
      </header>

      {/* Avatar */}
      <Section
        title="Profile Photo"
        subtitle="Click the photo to upload a new one">
        <AvatarUpload
          currentAvatar={profile.avatar}
          firstName={firstName}
          lastName={lastName}
          preview={avatarPreview}
          onFileSelect={handleFileSelect}
        />
      </Section>

      {/* Personal Info */}
      <Section
        title="Personal Information"
        subtitle="All fields are optional — only changed fields will be saved">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <Label>First Name</Label>
            <Input
              value={firstName}
              onChange={setFirstName}
              placeholder="e.g. Ranny"
              error={errors.firstName}
              maxLength={30}
            />
          </div>
          <div>
            <Label>Last Name</Label>
            <Input
              value={lastName}
              onChange={setLastName}
              placeholder="e.g. RR"
              error={errors.lastName}
              maxLength={30}
            />
          </div>
        </div>

        {/* Email — read only, not editable via this endpoint */}
        <div>
          <Label>Email</Label>
          <Input
            value={profile.email}
            onChange={() => {}}
            disabled
            placeholder="Email cannot be changed here"
          />
          <p className="text-xs text-gray-400 mt-1">
            Email cannot be changed from this page.
          </p>
        </div>

        <div>
          <Label>Phone</Label>
          <Input
            value={phone}
            onChange={setPhone}
            placeholder="e.g. 08123456789"
            type="tel"
            error={errors.phone}
            maxLength={15}
          />
        </div>

        <div>
          <Label>Gender</Label>
          <select
            value={gender}
            onChange={(e) =>
              setGender(e.target.value as "MALE" | "FEMALE" | "")
            }
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all">
            <option value="">Select gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
        </div>

        <div>
          <Label>Address</Label>
          <Input
            value={address}
            onChange={setAddress}
            placeholder="e.g. Jl. Melati No. 18, BSD"
            error={errors.address}
            maxLength={45}
          />
          <p className="text-xs text-gray-400 mt-1">
            {address.length}/45 characters
          </p>
        </div>
      </Section>

      {/* Password — optional section */}
      <Section
        title="Change Password"
        subtitle="Leave blank to keep your current password">
        <div className="space-y-5">
          <div>
            <Label>New Password</Label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 8 chars, uppercase, lowercase & number"
                className={`w-full px-4 py-3 pr-12 rounded-xl border text-sm transition-all outline-none
                  ${
                    errors.password
                      ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                      : "border-gray-200 bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  } text-gray-900`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPassword ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
            <FieldError msg={errors.password} />

            {/* Password strength hints */}
            {password && (
              <div className="mt-2 space-y-1">
                {[
                  { ok: password.length >= 8, label: "At least 8 characters" },
                  { ok: /[A-Z]/.test(password), label: "One uppercase letter" },
                  { ok: /[a-z]/.test(password), label: "One lowercase letter" },
                  { ok: /\d/.test(password), label: "One number" },
                ].map(({ ok, label }) => (
                  <p
                    key={label}
                    className={`text-xs flex items-center gap-1.5 ${ok ? "text-green-600" : "text-gray-400"}`}>
                    <span>{ok ? "✓" : "○"}</span> {label}
                  </p>
                ))}
              </div>
            )}
          </div>

          <div>
            <Label>Confirm New Password</Label>
            <Input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={setConfirmPassword}
              placeholder="Repeat your new password"
              error={errors.confirmPassword}
            />
          </div>
        </div>
      </Section>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row justify-end gap-3 pb-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          disabled={mutation.isPending}
          className="px-6 py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors disabled:opacity-50">
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={mutation.isPending}
          className="px-8 py-3 rounded-xl cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-all shadow-sm disabled:opacity-60 flex items-center gap-2">
          {mutation.isPending && (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          )}
          {mutation.isPending ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
