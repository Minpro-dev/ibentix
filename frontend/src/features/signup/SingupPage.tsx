import { useState } from "react";
import SignupFormCredentials from "./components/SignupFormCredentials";
import SignupContact from "./components/SignupFormContact";
import type { Role } from "../../types/userType";
import { Form, Formik } from "formik";
import {
  signupContactSchema,
  signupCredentialsSchema,
} from "./schema/signUpSchema";

function SingupPage() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<Role>("ATTENDEE");

  const handleSelectRole = (role: Role) => {
    setRole(role);
  };

  const handleModalOpen = () => {
    setIsModalOpen((open) => !open);
  };

  const handleNextStep = () => {
    setStep(2);
  };

  const handlePrevStep = () => {
    setStep(1);
  };

  return (
    <main>
      <div className="flex justify-center">
        <div className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-[50%] px-8 py-8 border border-zinc-300 rounded-xl">
          <div className="flex justify-center items-center pt-5 pb-10">
            <h1 className="text-3xl font-helvetica-arial font-semibold text-zinc-600">
              Create Account
            </h1>
          </div>

          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              phone: "",
              gender: "",
              country: "",
              address: "",
              password: "",
              confirmPassword: "",
              referralCode: "",
            }}
            validationSchema={
              step === 1 ? signupContactSchema : signupCredentialsSchema
            }
            onSubmit={(values) => {
              console.log(values);
            }}>
            {({ errors, touched, isValid, dirty }) => (
              <Form>
                {step === 1 ? (
                  <SignupContact
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
            )}
          </Formik>
        </div>
      </div>
    </main>
  );
}

export default SingupPage;
