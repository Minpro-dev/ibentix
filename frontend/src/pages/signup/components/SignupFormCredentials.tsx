import { Field } from "formik";
import { useState } from "react";
import type { SignupFormCredentialsProps } from "../types/signupTypes";
import Button from "../../../ui/Button";

function SignupFormCredentials({
  onHandlePrev,
  errors,
  touched,
  isValid,
  dirty,
}: SignupFormCredentialsProps) {
  const [hidePassword, setHidePassword] = useState(true);

  const handleHidePassword = () => {
    setHidePassword((hide) => !hide);
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-zinc-500 ml-1">Email Address</label>
          <Field
            name="email"
            placeholder="name@email.com"
            className="px-4 py-3 text-xs rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500 bg-indigo-50/30 transition-all"
          />
          {errors.email && touched.email && (
            <p className="text-red-500 text-[10px] mt-1">{errors.email}</p>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-zinc-500 ml-1">Phone Number</label>
          <Field
            name="phone"
            maxLength={15}
            placeholder="08123456789"
            className="px-4 py-3 text-xs rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500 bg-indigo-50/30 transition-all"
          />
          {errors.phone && touched.phone && (
            <p className="text-red-500 text-[10px] mt-1">{errors.phone}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-zinc-500 ml-1">Password</label>
          <Field
            name="password"
            type={hidePassword ? "password" : "text"}
            placeholder="••••••••"
            className="px-4 py-3 text-xs rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500 bg-indigo-50/30 transition-all"
          />
          {errors.password && touched.password && (
            <p className="text-red-500 text-[10px] mt-1">{errors.password}</p>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-zinc-500 ml-1">
            Reconfirm Password
          </label>
          <Field
            name="confirmPassword"
            type={hidePassword ? "password" : "text"}
            placeholder="••••••••"
            className="px-4 py-3 text-xs rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500 bg-indigo-50/30 transition-all"
          />
          {errors.confirmPassword && touched.confirmPassword && (
            <p className="text-red-500 text-[10px] mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>
      </div>

      <div onClick={handleHidePassword} className="cursor-pointer text-xs">
        <p>{hidePassword ? "Show password" : "Hide password"}</p>
      </div>

      <div>
        <Button disabled={!isValid || !dirty} type="submit" className="w-full">
          Create Account
        </Button>
      </div>

      <div>
        <Button
          type="button"
          onClick={onHandlePrev}
          variant="secondary"
          className="w-full">
          Previous
        </Button>
      </div>
    </div>
  );
}

export default SignupFormCredentials;
