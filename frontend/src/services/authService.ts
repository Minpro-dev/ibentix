import axios from "axios";
import type { LoginFormType } from "../pages/login/types/loginTypes";
import { api } from "../api/axiosInstance";

// ----- TESTING PURPOSES
export const getAllData = async () => {
  try {
    await axios.get("http://localhost:8000/api/auth/testing");
  } catch (error) {
    console.log(error);
  }
};

// ------- HANDLE SUBMIT LOGIN
export const handleSubmitLogin = async (values: LoginFormType) => {
  const res = await api.post("/auth/login", {
    email: values.email,
    password: values.password,
  });

  return res.data.data;
};

// --HANDLE SUBMIT CREATE ORDER
export const getUserProfile = async () => {
  const { data } = await api.get("/details");
  return data;
};

// handle sign up
export const handleSignup = async (values: any) => {
  await api.post("/auth/signup", values);
};

// handle get all countries
export const handleGetAllCountries = async () => {
  return await api.get("/countries");
};

// handle resend otp email
export const handleResendOtp = async () => {
  try {
    await api.get("/auth/resend-otp");
  } catch (error) {
    console.log(error);
  }
};

// req link reset password
export const forgotPasswordService = async (email: string) => {
  const response = await api.post("/auth/forgot-password", { email });
  return response.data;
};

// post new password
export const resetPasswordService = async (
  token: string,
  newPassword: string,
) => {
  const response = await api.patch(`/auth/forgot-password/${token}`, {
    newPassword,
  });
  return response.data;
};
