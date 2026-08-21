import NotFoundPage from "@/components/NotFound";
import { ROLES } from "@/constants/role";
import { AdminLayout } from "@/layouts/AdminLayout";
import AuthLayout from "@/layouts/AuthLayout";
import { MemberLayout } from "@/layouts/MemberLayout";
import { StaffLayout } from "@/layouts/StaffLayout";
import MotorCategoryPage from "@/pages/admin/CategoryPage";
import DashboardPage from "@/pages/admin/DashboardPage";
import MotorBrandPage from "@/pages/admin/MotorBrandPage";
import MotorPages from "@/pages/admin/MotorPages";
import PosPage from "@/pages/admin/PosPage";
import ProductPage from "@/pages/admin/ProductPage";
import ServicePage from "@/pages/admin/ServicePage";
import UsersPage from "@/pages/admin/UsersPage";
import Profile from "@/pages/member/Profile";
import { createBrowserRouter } from "react-router";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import VerifyEmailPage from "../pages/auth/VerifyEmailPage";
import ProtectedRoute from "./Protected.route";
import RoleRoute from "./Role.route";

const router = createBrowserRouter([
  //public routes
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        Component: LoginPage,
      },
      {
        path: "/register",
        Component: RegisterPage,
      },
      {
        path: "/verify-email",
        Component: VerifyEmailPage,
      },
    ],
  },
  // Protect routes
  {
    Component: ProtectedRoute,
    children: [
      //admin
      {
        element: <RoleRoute allowRoles={[ROLES.ADMIN]} />,
        children: [
          {
            path: "/admin",
            Component: AdminLayout,
            children: [
              {
                index: true,
                Component: DashboardPage,
              },
              {
                path: "pos",
                Component: PosPage,
              },
              {
                path: "categories",
                Component: MotorCategoryPage,
              },
              {
                path: "products",
                Component: ProductPage,
              },
              {
                path: "motor-brands",
                Component: MotorBrandPage,
              },
              {
                path: "motors",
                Component: MotorPages,
              },
              {
                path: "services",
                Component: ServicePage,
              },
              {
                path: "users",
                Component: UsersPage,
              },
              {
                path: "*",
                Component: NotFoundPage,
              },
            ],
          },
        ],
      },
      // Staff
      {
        element: <RoleRoute allowRoles={[ROLES.STAFF]} />,

        children: [
          {
            path: "/staff",
            Component: StaffLayout,
            children: [
              {
                index: true,
                Component: PosPage,
              },
              {
                path: "profile",
                Component: Profile,
              },
              // {
              //   path: "services",
              //   Component: ServicePage,
              // },
              {
                path: "*",
                Component: NotFoundPage,
              },
            ],
          },
        ],
      },

      // Member
      {
        element: <RoleRoute allowRoles={[ROLES.MEMBER]} />,

        children: [
          {
            path: "/member",
            Component: MemberLayout,
            children: [{ index: true, Component: Profile }],
          },
          {
            path: "*",
            Component: NotFoundPage,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    Component: NotFoundPage,
  },
]);

export default router;
