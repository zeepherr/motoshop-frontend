import NotFoundPage from "@/components/NotFound";
import { ROLES } from "@/constants/role";
import { AdminLayout } from "@/layouts/AdminLayout";
import AuthLayout from "@/layouts/AuthLayout";
import DashboardPage from "@/pages/admin/DashboardPage";
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
                element: <DashboardPage />,
              },
              // {
              //   path: "pos",
              //   element: <PosPage />,
              // },
              // {
              //   path: "daily-sales",
              //   element: <DailySalesPage />,
              // },
              // {
              //   path: "products",
              //   element: <ProductsPage />,
              // },
              // {
              //   path: "categories",
              //   element: <CategoriesPage />,
              // },
              // {
              //   path: "inventory",
              //   element: <InventoryPage />,
              // },
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
