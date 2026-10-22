
import { createBrowserRouter } from "react-router-dom";

import LandingPage from "../modules/landing/LandingPage";

import Login from "../modules/auth/pages/LoginPage";
import Register from "../modules/auth/pages/RegisterPage";
import ForgotPassword from "../modules/auth/pages/ForgotPassword";

import Home from "../modules/home/pages/Home";

import DashboardLayout from "../components/layout/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import ChatLayout from "./ChatLayout";

import AdminLayout from "../modules/admin/layout/AdminLayout";
import AdminHome from "../modules/admin/pages/AdminHome";

import Profile from "../modules/profile/Profile";
import Settings from "../modules/home/pages/SettingPage";
import CreateTicket from "../modules/home/pages/CreateTicket";
import TicketChat from "../modules/home/pages/TicketChat";
import MyTickets from "../modules/home/myTickets/MyTickets";


const router = createBrowserRouter([
  // Public routes
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },

  // Protected user routes
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <ChatLayout />,
        children: [
          {
            element: <DashboardLayout />,
            children: [
              {
                path: "/home",
                element: <Home />,
              },
              {
                path: "/create-ticket",
                element: <CreateTicket />,
              },
              {
                path: "/create-ticket/:oneid",
                element: <TicketChat />,
              },
              {
                path: "/tickets",
                element: <MyTickets />,
              },
              {
                path: "/profile",
                element: <Profile />,
              },
              {
                path: "/settings",
                element: <Settings />,
              },
            ],
          },
        ],
      },
    ],
  },

  // Protected admin routes
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminRoute />,
        children: [
          {
            element: <AdminLayout />,
            children: [
              {
                path: "/admin",
                element: <AdminHome />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
