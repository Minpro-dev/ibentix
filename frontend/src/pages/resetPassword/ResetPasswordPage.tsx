import { Formik, Form, Field, ErrorMessage } from "formik";
import { ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useRequestResetPassword } from "./hooks/useRequestResetPassword";
import { ForgotPasswordSchema } from "./shemas/forgotPasswordSchema";
import Button from "../../ui/Button";

const ForgotPasswordPage = () => {
  // TanStack Mutation
  const { mutate, isPending, isSuccess } = useRequestResetPassword();

  if (isSuccess) {
    return (
      <div className="min-h-[90vh] bg-white flex flex-col justify-center items-center px-4">
        <div className="text-center max-w-sm">
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="text-green-500 w-16 h-16" />
          </div>
          <h2 className="text-2xl font-bold text-zinc-700">Check your email</h2>
          <p className="mt-3 text-slate-500 text-sm">
            We've sent a password reset link. Please check your inbox and spam
            folder.
          </p>
          <Link
            to="/login"
            className="mt-8 inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-500">
            <ArrowLeft className="mr-2 w-4 h-4" /> Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-2xl font-semibold text-zinc-700">
            Forgot Password
          </h2>
          <p className="mt-2 text-slate-400 text-sm">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>
        </div>

        <Formik
          initialValues={{ email: "" }}
          validationSchema={ForgotPasswordSchema}
          onSubmit={(values) => {
            mutate(values.email);
          }}>
          {({ errors, touched }) => (
            <Form className="mt-8 space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs text-slate-700 mb-1">
                  Email Address
                </label>
                <Field
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  className={`block w-full px-4 py-3 text-sm rounded-lg border transition-all outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                    errors.email && touched.email
                      ? "border-red-500 focus:border-red-500"
                      : "border-slate-300 focus:border-indigo-500"
                  }`}
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="mt-1 text-xs text-red-500"
                />
              </div>

              <Button type="submit" disabled={isPending} className="w-full">
                {isPending ? (
                  <>
                    <Loader2 className="animate-spin mr-2 w-4 h-4" />
                    Sending Link...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </Button>
            </Form>
          )}
        </Formik>

        <div className="text-center mt-4">
          <Link
            to="/login"
            className="text-sm font-medium text-slate-500 hover:text-indigo-600 flex items-center justify-center transition-colors">
            <ArrowLeft className="mr-1 w-4 h-4" />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
