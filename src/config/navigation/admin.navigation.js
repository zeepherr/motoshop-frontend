import {
  Bike,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Tags,
  Wrench,
} from "lucide-react";

export const adminNavigation = [
  {
    label: "Dashboard",
    to: "/admin",
    icon: LayoutDashboard,
    end: true,
  },
  {
    label: "POS",
    to: "/admin/pos",
    icon: ShoppingCart,
  },
  // {
  //   label: "Daily Sales",
  //   to: "/admin/daily-sales",
  //   icon: ChartNoAxesCombined,
  // },
  {
    label: "Products",
    to: "/admin/products",
    icon: Package,
  },
  {
    label: "Categories",
    to: "/admin/categories",
    icon: Tags,
  },
  // {
  //   label: "Inventory",
  //   to: "/admin/inventory",
  //   icon: Boxes,
  // },
  {
    label: "Motor Brands",
    to: "/admin/motor-brands",
    icon: Bike,
  },
  {
    label: "Motorcycles",
    to: "/admin/motors",
    icon: Bike,
  },
  {
    label: "Services",
    to: "/admin/services",
    icon: Wrench,
  },
  // {
  //   label: "Members / Users",
  //   to: "/admin/users",
  //   icon: Users,
  // },
  // {
  //   label: "Reports",
  //   to: "/admin/reports",
  //   icon: ChartNoAxesCombined,
  // },
  // {
  //   label: "Profile",
  //   to: "/admin/profile",
  //   icon: CircleUserRound,
  // },
  // {
  //   label: "Settings",
  //   to: "/admin/settings",
  //   icon: Settings,
  // },
];
