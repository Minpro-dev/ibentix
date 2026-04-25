import { Form, Formik } from "formik";
import { loginSchema } from "./schema/loginSchema";
import LoginForm from "./components/LoginForm";
import { useLoginMutation } from "./hooks/useLoginMutation";

function LoginPage() {
  const { mutate: login, isPending } = useLoginMutation();

  return (
    <main className="min-h-[90dvh] flex items-center justify-center bg-zinc-50/50">
      <div className="w-[95%] sm:w-100 px-8 py-10 bg-white border border-zinc-200 rounded-2xl shadow-xl shadow-zinc-100/50">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-medium tracking-tight text-zinc-600">
            Welcome back!
          </h1>
          <p className="text-zinc-500 text-sm mt-2 font-light">
            Enter your details to continue
          </p>
        </div>

        {/* Formik Section */}
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={(values) => login(values)}>
          {({ errors, touched, isValid, dirty }) => (
            <Form>
              <LoginForm
                errors={errors}
                touched={touched}
                isValid={isValid}
                dirty={dirty}
                isLoading={isPending}
              />
            </Form>
          )}
        </Formik>
      </div>
    </main>
  );
}

export default LoginPage;
