import { useParams, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Lock, Loader2, Eye, EyeOff } from "lucide-react";
import { ResetPasswordSchema } from "./shemas/resetPasswordSchema";
import { useResetPassword } from "./hooks/useResetPassword";
import { useState } from "react";
import Button from "../../ui/Button";

export function ResetPasswordForm() {
  const { token } = useParams<{ token: string }>();
  console.log(token);
  const { mutate, isPending } = useResetPassword(token || "");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-[90vh] bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-zinc-600 tracking-tight">
            Create new password
          </h2>
          <p className="mt-2 text-slate-400 text-sm">
            Your new password must be different from previous used passwords.
          </p>
        </div>

        <Formik
          initialValues={{ newPassword: "", repeatPassword: "" }}
          validationSchema={ResetPasswordSchema}
          onSubmit={(values) => {
            mutate(values.newPassword);
          }}>
          {({ errors, touched }) => (
            <Form className="space-y-5">
              {/* New Password */}
              <div className="relative">
                <label className="block text-xs text-zinc-500 mb-1">
                  New Password
                </label>
                <div className="relative">
                  <Field
                    name="newPassword"
                    type={showPassword ? "text" : "password"}
                    className={`block text-zinc-500 text-sm w-full pl-10 pr-10 py-3 rounded-lg border transition-all outline-none focus:ring-4 focus:ring-indigo-500/10 ${
                      errors.newPassword && touched.newPassword
                        ? "border-red-500"
                        : "border-slate-300 focus:border-indigo-500"
                    }`}
                    placeholder="••••••••"
                  />
                  <Lock
                    className="absolute left-3 top-3.5 text-slate-400"
                    size={18}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-slate-400 hover:text-indigo-600 transition-colors">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <ErrorMessage
                  name="newPassword"
                  component="p"
                  className="mt-1 text-xs text-red-500"
                />
              </div>

              {/* Repeat Password */}
              <div>
                <label className="block text-xs text-slate-500 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Field
                    name="repeatPassword"
                    type={showPassword ? "text" : "password"}
                    className={`block text-zinc-500 text-sm  w-full pl-10 py-3 rounded-lg border transition-all outline-none focus:ring-4 focus:ring-indigo-500/10 ${
                      errors.repeatPassword && touched.repeatPassword
                        ? "border-red-500"
                        : "border-slate-300 focus:border-indigo-500"
                    }`}
                    placeholder="••••••••"
                  />
                  <Lock
                    className="absolute left-3 top-3.5 text-slate-400"
                    size={18}
                  />
                </div>
                <ErrorMessage
                  name="repeatPassword"
                  component="p"
                  className="mt-1 text-xs text-red-500 font-medium"
                />
              </div>

              <Button type="submit" disabled={isPending} className="w-full">
                {isPending ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={20} />
                    Resetting...
                  </>
                ) : (
                  "Reset Password"
                )}
              </Button>
            </Form>
          )}
        </Formik>

        <div className="mt-8 text-center border-t border-slate-100 pt-6">
          <Link
            to="/login"
            className="text-xs text-zinc-500 hover:text-indigo-600 transition-colors">
            Return to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
