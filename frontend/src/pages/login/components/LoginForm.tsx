import { Field } from "formik";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import type { LoginFormProps } from "../types/loginTypes";
import Button from "../../../ui/Button";

function LoginForm({
  errors,
  touched,
  isValid,
  dirty,
  isLoading,
}: LoginFormProps) {
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <div className="space-y-6">
      {/* Email Field */}
      <div className="flex flex-col gap-2">
        <label className="text-[11px] text-zinc-400 ml-1 ">Email Address</label>
        <div className="relative">
          <Field
            name="email"
            placeholder="name@email.com"
            className={`w-full px-5 py-3.5 rounded-2xl border bg-zinc-50/50 outline-none transition-all text-sm text-zinc-700 placeholder:text-zinc-300
              ${
                errors.email && touched.email
                  ? "border-red-200 focus:ring-2 focus:ring-red-500/10"
                  : "border-zinc-100 focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-200"
              }`}
          />
        </div>
        {errors.email && touched.email && (
          <p className="text-red-500 text-[10px] ml-1 lowercase tracking-tight">
            {errors.email}
          </p>
        )}
      </div>

      {/* Password Field */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center px-1">
          <label className="text-[11px] text-zinc-400">Password</label>
          <button
            type="button"
            onClick={() => setHidePassword(!hidePassword)}
            className="text-[11px] cursor-pointer text-indigo-600 hover:text-indigo-700 transition-colors lowercase">
            {hidePassword ? "show" : "hide"}
          </button>
        </div>
        <div className="relative">
          <Field
            name="password"
            type={hidePassword ? "password" : "text"}
            placeholder="••••••••"
            className={`w-full px-5 py-3.5 rounded-2xl border bg-zinc-50/50 outline-none transition-all text-sm text-zinc-700 placeholder:text-zinc-300
              ${
                errors.password && touched.password
                  ? "border-red-200 focus:ring-2 focus:ring-red-500/10"
                  : "border-zinc-100 focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-200"
              }`}
          />
        </div>
        {errors.password && touched.password && (
          <p className="text-red-500 text-[10px] ml-1 lowercase tracking-tight">
            {errors.password}
          </p>
        )}
      </div>

      {/* Action Button */}
      <div>
        <Button
          disabled={!isValid || !dirty || isLoading}
          type="submit"
          className="w-full">
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <span>Sign in to Ibentix</span>
          )}
        </Button>
      </div>
    </div>
  );
}

export default LoginForm;
