import axios from "axios";
import type { LoginFormType } from "../features/login/types/loginTypes";
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
  try {
    const res = await api.post("/auth/login", {
      email: values.email,
      password: values.password,
    });

    // console.log("res-login", res.data.data);

    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
