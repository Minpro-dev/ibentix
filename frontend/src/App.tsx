import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import SignupPage from "./pages/signup/SingupPage";
import LoginPage from "./pages/login/LoginPage";
import DashboardPage from "./pages/organizer/dashboard/DashboardPage";
import HomePage from "./pages/home/HomePage";
import api from "./api/axiosInstance";
import { useEffect, useRef } from "react";
import { useAuthStore } from "./store/useAuthStore";
import Unauthorized from "./ui/Unauthorized";
import PrivateRoute from "./ui/PrivateRoute";
import ResetPasswordPage from "./pages/resetPassword/ResetPasswordPage";
import AppLayoutOrganizer from "./ui/AppLayoutOrganizer";
import EventsOrganizer from "./pages/organizer/events/EventsOrganizer";

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
        path: "home",
        element: (
          <PrivateRoute allowedRoles={["ATTENDEE"]}>
            <HomePage />
          </PrivateRoute>
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

  // organizer page
  {
    path: "/organizer",
    element: <AppLayoutOrganizer />,
    children: [
      {
        path: "dashboard",
        element: (
          <PrivateRoute allowedRoles={["ORGANIZER"]}>
            <DashboardPage />
          </PrivateRoute>
        ),
      },
      {
        path: "events",
        element: (
          <PrivateRoute allowedRoles={["ORGANIZER"]}>
            <EventsOrganizer />
          </PrivateRoute>
        ),
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
