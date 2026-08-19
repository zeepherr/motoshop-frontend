export const containerVariants = {
  hidden: {},

  show: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

export const itemVariants = {
  hidden: {
    opacity: 0,
    x: -10,
  },

  show: {
    opacity: 1,
    x: 0,

    transition: {
      duration: 0.22,
      ease: "easeOut",
    },
  },

  exit: {
    opacity: 0,
    scale: 0.96,

    transition: {
      duration: 0.15,
      ease: "easeIn",
    },
  },
};

export const emptyStateVariants = {
  hidden: {
    opacity: 0,
    y: 8,
  },

  show: {
    opacity: 1,
    y: 0,
  },

  exit: {
    opacity: 0,
    y: -8,
  },
};
