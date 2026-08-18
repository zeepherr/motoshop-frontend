import NotFoundPage from "@/components/NotFound";
import { ROLES } from "@/constants/role";
import { AdminLayout } from "@/layouts/AdminLayout";
import AuthLayout from "@/layouts/AuthLayout";
import CategoryPage from "@/pages/admin/CategoryPage";
import DashboardPage from "@/pages/admin/DashboardPage";
import MotorBrandPage from "@/pages/admin/MotorBrandPage";
import MotorPages from "@/pages/admin/MotorPages";
import PosPage from "@/pages/admin/PosPage";
import ProductPage from "@/pages/admin/ProductPage";
import ServicePage from "@/pages/admin/ServicePage";
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
                Component: CategoryPage,
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
            ],
          },
        ],
      },
      // // Staff
      // {
      //   element: <RoleRoute allowedRoles={[ROLES.STAFF]} />,

      //   children: [
      //     {
      //       path: "/staff",
      //       Component: StaffLayout,
      //     },
      //   ],
      // },

      // // Member
      // {
      //   element: <RoleRoute allowedRoles={[ROLES.MEMBER]} />,

      //   children: [
      //     {
      //       path: "/member",
      //       Component: MemberLayout,
      //     },
      //   ],
      // },
    ],
  },
  {
    path: "*",
    Component: NotFoundPage,
  },
]);

export default router;
