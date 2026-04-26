import { Field } from "formik";
import type { Role } from "../../../types/userType";
import type { SignupFormContactProps } from "../types/signupTypes";
import { useFetchCountries } from "../hooks/useFetchCountries";
import type { ICountry } from "../../../types/countryType";
import Button from "../../../ui/Button";
import { Check } from "lucide-react";

const userRoles: Role[] = ["ATTENDEE", "ORGANIZER"];

function SignupFormContact({
  onHandleSelectRole,
  onHandleNext,
  role,
  errors,
  touched,
}: SignupFormContactProps) {
  const { data } = useFetchCountries();
  const countries = data?.data.data;

  return (
    <>
      <div className="flex gap-3 sm:gap-5 pb-8 pt-4">
        {userRoles?.map((userRole, index) => {
          const isActive = userRole === role;
          return (
            <div
              key={index}
              onClick={() => onHandleSelectRole(userRole)}
              className={`
          relative w-1/2 py-3 px-3 flex flex-col items-center justify-center rounded-2xl cursor-pointer transition-all duration-300 border-2
          ${
            isActive
              ? "bg-indigo-600 border-indigo-600 shadow-md shadow-indigo-200"
              : "bg-white border-zinc-100 hover:border-zinc-200 text-zinc-500"
          }
        `}>
              {isActive && (
                <div className="absolute -top-3 -right-3 w-7 h-7 bg-indigo-600 border-4 border-zinc-50 rounded-full flex items-center justify-center shadow-xs z-10 animate-in zoom-in duration-200">
                  <Check className="text-white" size={14} strokeWidth={4} />
                </div>
              )}

              <p
                className={`text-xs mb-1 opacity-70 ${isActive ? "text-indigo-100" : "text-zinc-400"}`}>
                Register as
              </p>
              <p
                className={`text-sm tracking-wider font-semibold capitalize ${isActive ? "text-white" : "text-zinc-800"}`}>
                {userRole.toLowerCase()}
              </p>
            </div>
          );
        })}
      </div>

      {/* Form */}
      <div className="space-y-5">
        {/* Row 1: Names */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-zinc-500 ml-1">First Name</label>
            <Field
              name="firstName"
              placeholder="Novpa"
              className="px-4 py-3 text-xs rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500 bg-indigo-50/30 transition-all placeholder:text-gray-300"
            />
            {errors.firstName && touched.firstName && (
              <p className="text-red-500 text-[10px] mt-1">
                {errors.firstName}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-zinc-500 ml-1">Last Name</label>
            <Field
              name="lastName"
              placeholder="Ranny"
              className="px-4 py-3 text-xs rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500 bg-indigo-50/30 transition-all placeholder:text-gray-300"
            />
            {errors.lastName && touched.lastName && (
              <p className="text-red-500 text-[10px] mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>

        {/* Row 3: Gender & Country (Role Removed) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-zinc-500 ml-1">Gender</label>
            <Field
              as="select"
              name="gender"
              className="px-4 text-zinc-500 py-3 text-xs rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500 bg-indigo-50/30 cursor-pointer appearance-none">
              <option value="MALE">MALE</option>
              <option value="FEMALE">FEMALE</option>
            </Field>
            {errors.gender && touched.gender && (
              <p className="text-red-500 text-[10px] mt-1">{errors.gender}</p>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-zinc-500 ml-1">Country</label>
            <Field
              as="select"
              name="countryId"
              className="px-4 py-3 text-zinc-500 text-xs rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500 bg-indigo-50/30 cursor-pointer appearance-none">
              <option value="" disabled>
                select your country
              </option>
              {countries?.map((country: ICountry) => (
                <option key={country.countryId} value={country.countryId}>
                  {country.countryName}
                </option>
              ))}
            </Field>
            {errors.countryId && touched.countryId && (
              <p className="text-red-500 text-[10px] mt-1">
                {errors.countryId}
              </p>
            )}
          </div>
        </div>

        {/* Referral Code */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-zinc-500 ml-1">
            Referral Code (Optional)
          </label>
          <Field
            name="referralCode"
            placeholder="RF319"
            className="px-4 py-3 text-xs rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500 bg-indigo-50/30 transition-all placeholder:text-gray-300"
          />
          {errors.referralCode && touched.referralCode && (
            <p className="text-red-500 text-[10px] mt-1">
              {errors.referralCode}
            </p>
          )}
        </div>

        {/* Address Area */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-zinc-500 ml-1">Full Address</label>
          <Field
            as="textarea"
            name="address"
            rows={2}
            placeholder="Street name, City, etc."
            className="px-4 py-3 text-xs rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500 bg-indigo-50/30 resize-none transition-all"></Field>
          {errors.address && touched.address && (
            <p className="text-red-500 text-[10px] mt-1">{errors.address}</p>
          )}
        </div>

        {/* Action Button */}
        <Button type="button" onClick={onHandleNext} className="w-full">
          Next
        </Button>
      </div>
    </>
  );
}

export default SignupFormContact;
