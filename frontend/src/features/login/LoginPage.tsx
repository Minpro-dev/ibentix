import { Form, Formik } from "formik";
import { loginSchema } from "./schema/loginSchema";
import LoginForm from "./components/LoginForm";
import type { LoginFormType } from "./types/loginTypes";
import { handleSubmitLogin } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

function LoginPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSubmitForm = async (values: LoginFormType) => {
    const res = await handleSubmitLogin(values);

    console.log("res -> ", res);

    const token = res?.accessToken;
    const userResponse = res?.user;

    const user = {
      id: userResponse?.userId,
      firstName: userResponse?.firstName,
      lastName: userResponse?.lastName,
      email: userResponse?.email,
      phone: userResponse?.phone,
      gender: userResponse?.gender,
      address: userResponse?.address,
      countryId: userResponse?.countryId,
      role: userResponse?.role,
      avatar: userResponse?.avatar,
      createdAt: userResponse?.createdAt,
    };

    setAuth(token, user);

    if (res.user.role === "ATTENDEE") {
      navigate("/home", { replace: true });
    } else {
      navigate("/organizer/dashboard", { replace: true });
    }
  };

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
              handleSubmitForm(values);
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
