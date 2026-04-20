import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import SignupPage from "./pages/signup/SingupPage";
import LoginPage from "./pages/login/LoginPage";
import DashboardPage from "./pages/organizer/dashboard/DashboardPage";
import HomePage from "./pages/attendee/home/HomePage";
import api from "./api/axiosInstance";
import { useEffect, useRef } from "react";
import { useAuthStore } from "./store/useAuthStore";
import Unauthorized from "./ui/Unauthorized";
import PrivateRoute from "./ui/PrivateRoute";
import ResetPasswordPage from "./pages/resetPassword/ResetPasswordPage";
import Profile from "./pages/attendee/profile/page";
import Ticket from "./pages/attendee/ticket/ticket";
import Events from "./pages/attendee/events/Events";
import Payment from "./pages/payment/page";
import Review from "./pages/attendee/review/page";
import AppLayoutOrganizer from "./ui/AppLayoutOrganizer";
import EventsOrganizer from "./pages/organizer/events/EventsOrganizer";
import CreateEvent from "./pages/organizer/createEvent/CreateEvent";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AllReview from "./pages/attendee/review/my-review/page";
import EventDetail from "./pages/attendee/details/EventDetails";
import Wishlist from "./pages/attendee/wishlist/page";
import OrganizerProfile from "./pages/organizer/organizerProfile/OrganizerProfile";
import MarketingLayout from "./pages/organizer/marketing/MarketingLayout";
import Promotions from "./pages/organizer/marketing/components/Promotions";
import CreatePromotion from "./pages/organizer/marketing/components/CreatePromotion";
import CreateOrder from "./pages/attendee/order/create-order/CheckoutPage";
import OrganizerReviews from "./pages/organizer/review/OrganizerReview";
import OrderOrganizerLayout from "./pages/organizer/order/OrderOrganizerLayout";
import OrderNewOrganizer from "./pages/organizer/order/components/OrderNewOrganizer";
import CompletedOrderOrganizer from "./pages/organizer/order/components/CompletedOrderOrganizer";
import ProfileDetails from "./pages/organizer/profile/ProfileDetails";

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
        index: true,
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
        path: "events", // Tambahkan di sini
        element: (
          //<PrivateRoute allowedRoles={["ATTENDEE"]}>
          <Events />
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
        path: "events/:slug", // Tambahkan di sini
        element: (
          //<PrivateRoute allowedRoles={["ATTENDEE"]}>
          <EventDetail />
          //</PrivateRoute>
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
        path: "order", // Tambahkan di sini
        element: (
          //<PrivateRoute allowedRoles={["ATTENDEE"]}>
          <CreateOrder />
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

  // organizer page
  {
    path: "/organizer",
    element: <AppLayoutOrganizer />,
    children: [
      {
        index: true,
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
      {
        path: "event/new",
        element: (
          <PrivateRoute allowedRoles={["ORGANIZER"]}>
            <CreateEvent />
          </PrivateRoute>
        ),
      },
      {
        path: "organizer-profile",
        element: (
          <PrivateRoute allowedRoles={["ORGANIZER"]}>
            <OrganizerProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "marketing",
        element: (
          <PrivateRoute allowedRoles={["ORGANIZER"]}>
            <MarketingLayout />
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            element: (
              <PrivateRoute allowedRoles={["ORGANIZER"]}>
                <Promotions />
              </PrivateRoute>
            ),
          },
          {
            path: "new",
            element: (
              <PrivateRoute allowedRoles={["ORGANIZER"]}>
                <CreatePromotion />
              </PrivateRoute>
            ),
          },
        ],
      },
      // order
      {
        path: "orders",
        element: (
          <PrivateRoute allowedRoles={["ORGANIZER"]}>
            <OrderOrganizerLayout />
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            element: (
              <PrivateRoute allowedRoles={["ORGANIZER"]}>
                <OrderNewOrganizer />
              </PrivateRoute>
            ),
          },
          {
            path: "completed",
            element: (
              <PrivateRoute allowedRoles={["ORGANIZER"]}>
                <CompletedOrderOrganizer />
              </PrivateRoute>
            ),
          },
        ],
      },

      {
        path: "reviews",
        element: (
          <PrivateRoute allowedRoles={["ORGANIZER"]}>
            <OrganizerReviews />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute allowedRoles={["ORGANIZER"]}>
            <ProfileDetails />
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
  const queryClient = new QueryClient();

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
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
