import { Field } from "formik";
import { useState } from "react";
import type { LoginFormProps } from "../types/loginTypes";

function LoginForm({ errors, touched, isValid, dirty }: LoginFormProps) {
  const [hidePassword, setHidePassword] = useState(true);

  const handleHidePassword = () => {
    setHidePassword((hide) => !hide);
  };

  return (
    <div className="space-y-5">
      {/* Row 2: Contact */}

      <div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-indigo-700 ml-1">Email Address</label>
          <Field
            name="email"
            placeholder="name@email.com"
            className="px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500 bg-indigo-50/30 transition-all"
          />
          {errors.email && touched.email && (
            <p className="text-red-500 text-[10px] mt-1">{errors.email}</p>
          )}
        </div>
      </div>

      {/* Row 4: Passwords */}
      <div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-indigo-700 ml-1">Password</label>
          <Field
            name="password"
            type={hidePassword ? "password" : "text"}
            placeholder="••••••••"
            className="px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500 bg-indigo-50/30 transition-all"
          />
          {errors.password && touched.password && (
            <p className="text-red-500 text-[10px] mt-1">{errors.password}</p>
          )}
        </div>
      </div>

      <div onClick={handleHidePassword} className="cursor-pointer">
        <p className="text-zinc-600 text-sm">
          {hidePassword ? "Show password" : "Hide password"}
        </p>
      </div>

      {/* Action Button */}
      <button
        disabled={!isValid && !dirty}
        type="submit"
        className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white  py-4 rounded-2xl shadow-xl shadow-indigo-100 transition-all active:scale-95 tracking-wider text-md">
        Login
      </button>
    </div>
  );
}

export default LoginForm;
