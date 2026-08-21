import { cn } from "@/lib/utils";
import { AnimatePresence, easeOut, motion } from "motion/react";
import { NavLink } from "react-router";

export function SidebarNavigation({ navigation, collapsed }) {
  return (
    <motion.nav
      className="
        min-h-0 flex-1 space-y-1
        overflow-y-auto overflow-x-hidden p-3
      "
      variants={navigationVariants}
      initial="hidden"
      animate="visible"
    >
      {navigation.map((item) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={item.to}
            variants={itemVariants}
            whileHover={collapsed ? undefined : { x: 2 }}
            whileTap={{ scale: 0.98 }}
          >
            <NavLink
              to={item.to}
              end={item.end}
              title={collapsed ? item.label : undefined}
              className={({ isActive }) => getNavClass(isActive, collapsed)}
            >
              {Icon && (
                <Icon className=" size-4 lg:size-5 shrink-0 stroke-[1.8]" />
              )}
              <AnimatePresence initial={false}>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -6 }}
                    transition={{ duration: 0.16, ease: easeOut }}
                    className="truncate text-sm"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          </motion.div>
        );
      })}
    </motion.nav>
  );
}

function getNavClass(isActive, collapsed) {
  return cn(
    "flex h-10 items-center rounded-xl transition-colors",

    collapsed ? "justify-center" : "gap-3 px-3",

    isActive
      ? collapsed
        ? "bg-muted text-primary"
        : "bg-primary text-primary-foreground"
      : "text-muted-foreground hover:bg-muted hover:text-foreground",
  );
}

const navigationVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.055,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    x: -10,
  },

  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.25,
      ease: "easeOut",
    },
  },
};
