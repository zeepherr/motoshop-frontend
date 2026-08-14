import { createBrowserRouter } from "react-router";
import { ROLES } from "../constants/role";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import VerifyEmailPage from "../pages/auth/VerifyEmailPage";
import AdminLayout from "./../layouts/AdminLayout";
import MemberLayout from "./../layouts/MemberLayout";
import StaffLayout from "./../layouts/StaffLayout";
import ProtectedRoute from "./Protected.route";
import RoleRoute from "./Role.route";

const router = createBrowserRouter([
  //public routes
  {
    path: "/",
    Component: HomePage,
  },
  // {
  //   path: "/login",
  //   Component: LoginPage,
  // },
  // {
  //   path: "/register",
  //   Component: RegisterPage,
  // },
  // {
  //   path: "/verify-email",
  //   Component: VerifyEmailPage,
  // },
  // // Protect routes
  // {
  //   Component: ProtectedRoute,
  //   children: [
  //     {
  //       element: <RoleRoute allowRoles={[ROLES.ADMIN]} />,
  //       children: [
  //         //admin
  //         {
  //           path: "/admin",
  //           Component: AdminLayout,
  //         },
  //       ],
  //     },
  //     // Staff
  //     {
  //       element: <RoleRoute allowedRoles={[ROLES.STAFF]} />,

  //       children: [
  //         {
  //           path: "/staff",
  //           Component: StaffLayout,
  //         },
  //       ],
  //     },

  //     // Member
  //     {
  //       element: <RoleRoute allowedRoles={[ROLES.MEMBER]} />,

  //       children: [
  //         {
  //           path: "/member",
  //           Component: MemberLayout,
  //         },
  //       ],
  //     },
  //   ],
  // },
]);

export default router;
