import React from 'react';
import { Lock, Eye, EyeOff, Info } from 'lucide-react';
import type { FormikProps } from 'formik';
import { cn } from '../../../../../../lib/utils';


interface SecuritySectionProps {
  formik: FormikProps<any>;
  showPassword: boolean;
  setShowPassword: (val: boolean) => void;
}

export const SecuritySection: React.FC<SecuritySectionProps> = ({ formik, showPassword, setShowPassword }) => {
  return (
    <section className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-[#e4e8ef]">
      <h2 className="text-2xl font-bold text-[#171c21] mb-8 flex items-center gap-3">
        <Lock className="text-[#004bb2]" />
        Security & Password
      </h2>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-[#424654] ml-1">Current Password</label>
          <div className="relative">
            <input 
              name="currentPassword"
              type={showPassword ? "text" : "password"}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.currentPassword}
              className={cn(
                "w-full bg-[#f0f4fb] border-none rounded-xl px-4 py-4 text-[#171c21] focus:ring-2 focus:ring-[#1863dc] transition-all pr-12",
                formik.touched.currentPassword && formik.errors.currentPassword && "ring-2 ring-red-500"
              )}
              placeholder="••••••••••••"
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#737785] hover:text-[#004bb2] pointer-events-auto"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {formik.touched.currentPassword && formik.errors.currentPassword && (
              <div className="text-red-500 text-xs mt-1 ml-1">{formik.errors.currentPassword as string}</div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#424654] ml-1">New Password</label>
            <input 
              name="newPassword"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newPassword}
              className={cn(
                "w-full bg-[#f0f4fb] border-none rounded-xl px-4 py-4 text-[#171c21] focus:ring-2 focus:ring-[#1863dc] transition-all",
                formik.touched.newPassword && formik.errors.newPassword && "ring-2 ring-red-500"
              )}
              placeholder="At least 8 characters"
            />
            {formik.touched.newPassword && formik.errors.newPassword && (
              <div className="text-red-500 text-xs mt-1 ml-1">{formik.errors.newPassword as string}</div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-[#424654] ml-1">Confirm New Password</label>
            <input 
              name="confirmPassword"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              className={cn(
                "w-full bg-[#f0f4fb] border-none rounded-xl px-4 py-4 text-[#171c21] focus:ring-2 focus:ring-[#1863dc] transition-all",
                formik.touched.confirmPassword && formik.errors.confirmPassword && "ring-2 ring-red-500"
              )}
              placeholder="Confirm new password"
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <div className="text-red-500 text-xs mt-1 ml-1">{formik.errors.confirmPassword as string}</div>
            )}
          </div>
        </div>

        <div className="bg-[#f0f4fb] p-4 rounded-xl flex gap-3 border border-blue-50">
          <Info size={18} className="text-[#737785] mt-0.5" />
          <p className="text-xs text-[#424654] italic font-medium">
            Changing your password will log you out of all active sessions on other devices.
          </p>
        </div>
      </form>
    </section>
  );
};
