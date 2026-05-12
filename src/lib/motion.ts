import type { Variants } from "framer-motion";

export function fadeUpVariants(reduced: boolean): Variants {
  if (reduced) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.01 } },
    };
  }
  return {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
  };
}

export function staggerContainer(reduced: boolean, stagger = 0.08): Variants {
  if (reduced) {
    return {
      hidden: {},
      visible: {},
    };
  }
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: 0.06 },
    },
  };
}
