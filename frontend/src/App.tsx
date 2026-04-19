import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import SignupPage from "./pages/signup/SingupPage";
import LoginPage from "./pages/login/LoginPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import HomePage from "./pages/home/HomePage";
import api from "./api/axiosInstance";
import { useEffect, useRef } from "react";
import { useAuthStore } from "./store/useAuthStore";
import Unauthorized from "./ui/Unauthorized";
import PrivateRoute from "./ui/PrivateRoute";
import ResetPasswordPage from "./pages/resetPassword/ResetPasswordPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "organizer/dashboard",
        element: (
          <PrivateRoute allowedRoles={["ORGANIZER"]}>
            <DashboardPage />
          </PrivateRoute>
        ),
      },
      {
        path: "home",
        element: (
          // <PrivateRoute allowedRoles={["ATTENDEE"]}>
          <HomePage />
          // </PrivateRoute>
        ),
      },
      {
        path: "details", // ✅ ADD THIS
        element: (
          // <PrivateRoute allowedRoles={["ATTENDEE"]}>
          <Profile />
          // </PrivateRoute>
        ),
      },
      {
        path: "myticket", // Tambahkan di sini
        element: (
          //<PrivateRoute allowedRoles={["ATTENDEE"]}>
          <Ticket />
          //</PrivateRoute>
        ),
      },
      {
        path: "event", // Tambahkan di sini
        element: (
          //<PrivateRoute allowedRoles={["ATTENDEE"]}>
          <Event />
          //</PrivateRoute>
        ),
      },
      {
        path: "payment", // Tambahkan di sini
        element: (
          //<PrivateRoute allowedRoles={["ATTENDEE"]}>
          <Payment />
          //</PrivateRoute>
        ),
      },
      {
        path: "review", // Tambahkan di sini
        element: (
          //<PrivateRoute allowedRoles={["ATTENDEE"]}>
          <Review />
          //</PrivateRoute>
        ),
      },
       {
        path: "myreview", // Tambahkan di sini
        element: (
          //<PrivateRoute allowedRoles={["ATTENDEE"]}>
          <AllReview />
          //</PrivateRoute>
        ),
      },
      {
        path: "event/:slug", // Tambahkan di sini
        element: (
          
          <EventDetail />
          
        ),
      },
      {
        path: "wishlist", // Tambahkan di sini
        element: (
          //<PrivateRoute allowedRoles={["ATTENDEE"]}>
          <Wishlist />
          //</PrivateRoute>
        ),
      },
      {
        path: "unauthorized",
        element: <Unauthorized />,
      },
      {
        path: "reset-password",
        element: <ResetPasswordPage />,
      },
    ],
  },
]);

function App() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const setInitializing = useAuthStore((state) => state.setInitializing);
  const isInistialized = useRef(false);

  useEffect(() => {
    const initializeAuth = async () => {
      if (isInistialized.current) return;
      isInistialized.current = true;
      try {
        const { data } = await api.get("/auth/refresh");
        console.log("app ->", data);
        setAuth(data.data.accessToken, data.data.user);
      } catch (error) {
        console.log("error -> ", error);
      } finally {
        setInitializing(false);
      }
    };

    initializeAuth();
  }, [setAuth, setInitializing]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
