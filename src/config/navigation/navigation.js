import {
  Bike,
  CircleUserRound,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Tags,
  Users,
  Wrench,
} from "lucide-react";

export const adminNavigation = [
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
  {
    label: "Users",
    to: "/admin/users",
    icon: Users,
  },
  {
    label: "Dashboard",
    to: "/admin",
    icon: LayoutDashboard,
    end: true,
  },
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

export const memberNavigation = [
  {
    label: "Profile",
    to: "/member",
    icon: CircleUserRound,
    end: true, //if not all will be selected
  },
];
export const staffNavigation = [
  {
    label: "POS",
    to: "/staff",
    icon: ShoppingCart,
    end: true,
  },
  {
    label: "Profile",
    to: "/staff/profile",
    icon: CircleUserRound,
  },
];
