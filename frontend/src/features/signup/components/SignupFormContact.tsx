import { Field } from "formik";
import type { Role } from "../../../types/userType";
import type { SignupFormContactProps } from "../types/signupTypes";

const userRoles: Role[] = ["ATTENDEE", "ORGANIZER"];

function SignupFormContact({
  onHandleSelectRole,
  onHandleNext,
  role,
  errors,
  touched,
}: SignupFormContactProps) {
  return (
    <>
      <div className="flex gap-5 pb-5">
        {userRoles?.map((userRole, index) => (
          <div
            key={index}
            onClick={() => onHandleSelectRole(userRole)}
            className={`w-[50%] py-3 px-5 ${userRole === role ? "bg-indigo-600 text-zinc-50" : "bg-white  text-zinc-800"} flex justify-center items-center rounded-xl cursor-pointer`}>
            <p>
              As{" "}
              {userRole[0] + userRole.slice(1, userRole.length).toLowerCase()}
            </p>
          </div>
        ))}
      </div>

      {/* Form */}
      <div className="space-y-5">
        {/* Row 1: Names */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-indigo-700 ml-1">First Name</label>
            <Field
              name="firstName"
              placeholder="Novpa"
              className="px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500 bg-indigo-50/30 transition-all placeholder:text-gray-300"
            />
            {errors.firstName && touched.firstName && (
              <p className="text-red-500 text-[10px] mt-1">
                {errors.firstName}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-indigo-700 ml-1">Last Name</label>
            <Field
              name="lastName"
              placeholder="Ranny"
              className="px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500 bg-indigo-50/30 transition-all placeholder:text-gray-300"
            />
            {errors.lastName && touched.lastName && (
              <p className="text-red-500 text-[10px] mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>

        {/* Row 3: Gender & Country (Role Removed) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-indigo-700 ml-1">Gender</label>
            <Field
              as="select"
              name="gender"
              className="px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500 bg-indigo-50/30 cursor-pointer appearance-none">
              <option value="MALE">MALE</option>
              <option value="FEMALE">FEMALE</option>
            </Field>
            {errors.gender && touched.gender && (
              <p className="text-red-500 text-[10px] mt-1">{errors.gender}</p>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-indigo-700 ml-1">Country</label>
            <Field
              as="select"
              name="countryId"
              className="px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500 bg-indigo-50/30 cursor-pointer appearance-none">
              {/* 85625510-19bd-41b3-9f49-75d9c217d46a */}
              <option value="ID">Indonesia</option>
              <option value="US">United States</option>
              <option value="JP">Japan</option>
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
          <label className="text-sm text-indigo-700 ml-1">
            Referral Code (Optional)
          </label>
          <Field
            name="referralCode"
            placeholder="RF319"
            className="px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500 bg-indigo-50/30 transition-all placeholder:text-gray-300"
          />
          {errors.referralCode && touched.referralCode && (
            <p className="text-red-500 text-[10px] mt-1">
              {errors.referralCode}
            </p>
          )}
        </div>

        {/* Address Area */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-indigo-700 ml-1">Full Address</label>
          <Field
            as="textarea"
            name="address"
            rows={2}
            placeholder="Street name, City, etc."
            className="px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500 bg-indigo-50/30 resize-none transition-all"></Field>
          {errors.address && touched.address && (
            <p className="text-red-500 text-[10px] mt-1">{errors.address}</p>
          )}
        </div>

        {/* Action Button */}
        <button
          type="button"
          // disabled={}
          onClick={onHandleNext}
          className={`w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl shadow-xl shadow-indigo-100 transition-all active:scale-95 tracking-wider text-md`}>
          Next
        </button>
      </div>
    </>
  );
}

export default SignupFormContact;
