import React from 'react';
import { User, AlertCircle } from 'lucide-react';
import { Formik, type FormikProps } from 'formik';
import { cn } from '../../../../../../lib/utils';


interface PersonalInfoSectionProps {
  formik: FormikProps<any>;
}

export const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({ formik }) => {
  return (
    <section className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-200">
  <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
    <User className="text-blue-600" />
    Personal Information
  </h2>

  <form onSubmit={formik.handleSubmit} className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* FULL NAME */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700 ml-1">
          Full Name
        </label>

        <input
          name="fullName"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.fullName}
          className={cn(
            "w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500",
            formik.touched.fullName && formik.errors.fullName && "border-red-500 ring-1 ring-red-500"
          )}
          placeholder="Alex Rivera"
        />

        {formik.touched.fullName && formik.errors.fullName && (
          <div className="flex items-center gap-1 text-red-500 text-xs mt-1 ml-1 font-medium">
            <AlertCircle size={12} />
            {formik.errors.fullName as string}
          </div>
        )}
      </div>

      {/* EMAIL */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700 ml-1">
          Email Address
        </label>

        <input
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className={cn(
            "w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500",
            formik.touched.email && formik.errors.email && "border-red-500 ring-1 ring-red-500"
          )}
          placeholder="alex.rivera@example.com"
        />

        {formik.touched.email && formik.errors.email && (
          <div className="flex items-center gap-1 text-red-500 text-xs mt-1 ml-1 font-medium">
            <AlertCircle size={12} />
            {formik.errors.email as string}
          </div>
        )}
      </div>
    </div>

    {/* BIO */}
    <div className="space-y-2">
      <label className="text-sm font-semibold text-gray-700 ml-1">
        Bio (Optional)
      </label>

      <textarea
        name="bio"
        rows={4}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.bio}
        className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        placeholder="Tell us a bit about yourself..."
      />

      <div className="flex justify-end text-xs text-gray-500 font-medium">
        {formik.values.bio.length} / 300 characters
      </div>
    </div>
  </form>
</section>
  );
};
