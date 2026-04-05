import axios from "axios";

export const getAllData = async () => {
  try {
    const res = await axios.get("http://localhost:8000/api/auth/testing");
    console.log("res", res);
  } catch (error) {
    console.log(error);
  }
};
