import { Form, Formik } from "formik";
import { loginSchema } from "./schema/loginSchema";
import LoginForm from "./components/LoginForm";

function LoginPage() {
  return (
    <main>
      <div className="flex justify-center">
        <div className="w-[90%] sm:w-[75%] md:w-[50%] lg:w-[35%] px-8 py-8 border border-zinc-300 rounded-xl">
          <div className="flex justify-center items-center pt-5 pb-10">
            <h1 className="text-3xl font-helvetica-arial font-semibold text-zinc-600">
              Login
            </h1>
          </div>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={loginSchema}
            onSubmit={(values) => {
              console.log(values);
            }}>
            {({ errors, touched, isValid, dirty }) => (
              <Form>
                <LoginForm
                  errors={errors}
                  touched={touched}
                  isValid={isValid}
                  dirty={dirty}
                />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;
