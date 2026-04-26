import { useEffect, useState } from "react";
import SignupFormCredentials from "./components/SignupFormCredentials";
import SignupFormContact from "./components/SignupFormContact";

import { Form, Formik } from "formik";
import {
  signupContactSchema,
  signupCredentialsSchema,
} from "./schema/signUpSchema";
import type { Role } from "../../types/userType";
import { useSignupMutation } from "./hooks/useSignupMutation";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";

function SingupPage() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<Role>("ATTENDEE");
  const { mutate } = useSignupMutation();
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const handleSelectRole = (role: Role) => {
    setRole(role);
  };

  const handleNextStep = () => {
    setStep(2);
  };

  const handlePrevStep = () => {
    setStep(1);
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  return (
    <main className="py-20">
      <div className="flex justify-center">
        <div className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-[50%] px-8 py-8 border border-zinc-300 rounded-xl">
          <div className="flex justify-center items-center pt-5 pb-10">
            <h1 className="text-3xl font-helvetica-arial font-base text-zinc-600">
              Create Account
            </h1>
          </div>

          <Formik
            enableReinitialize={true}
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              role,
              phone: "",
              gender: "MALE",
              countryId: "f5d8da5d-e27f-40cf-981f-92187a4e1ae4",
              address: "",
              password: "",
              confirmPassword: "",
              referralCode: "",
            }}
            validationSchema={
              step === 1 ? signupContactSchema : signupCredentialsSchema
            }
            onSubmit={(values) => {
              // const { confirmPassword: _confirmPassword, ...rest } = values;
              const valuesSelection = {
                ...values,
                referralCode:
                  values.referralCode !== "" ? values.referralCode : null,
              };

              mutate(valuesSelection);
            }}>
            {({ errors, touched, isValid, dirty }) => {
              return (
                <Form>
                  {step === 1 ? (
                    <SignupFormContact
                      onHandleSelectRole={handleSelectRole}
                      onHandleNext={handleNextStep}
                      errors={errors}
                      touched={touched}
                      role={role}
                    />
                  ) : (
                    <SignupFormCredentials
                      onHandlePrev={handlePrevStep}
                      errors={errors}
                      touched={touched}
                      isValid={isValid}
                      dirty={dirty}
                    />
                  )}
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </main>
  );
}

export default SingupPage;
