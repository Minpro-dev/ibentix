import axios from "axios";
import type { LoginFormType } from "../pages/login/types/loginTypes";
import { api } from "../api/axiosInstance";

// ----- TESTING PURPOSES
export const getAllData = async () => {
  try {
    const res = await axios.get("http://localhost:8000/api/auth/testing");
    console.log("res", res);
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

  // console.log("res-login", res.data.data);

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
