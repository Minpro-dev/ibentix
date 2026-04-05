import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./pages/AppLayout";
import SignupPage from "./features/signup/SingupPage";
import LoginPage from "./features/login/LoginPage";
import DashboardPage from "./features/dashboard/DashboardPage";
import HomePage from "./features/home/HomePage";

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
        element: <DashboardPage />,
      },
      {
        path: "home",
        element: <HomePage />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
