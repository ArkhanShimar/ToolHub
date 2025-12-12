export const pageTransition = {
  initial: { opacity: 0, y: 12 },
  enter: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5, 
      ease: [0.22, 0.9, 0.38, 1] 
    } 
  },
  exit: { 
    opacity: 0, 
    y: -8, 
    transition: { 
      duration: 0.35 
    } 
  }
};

export const heroText = {
  hidden: { 
    opacity: 0, 
    x: -24, 
    filter: 'blur(6px)' 
  },
  visible: (i = 1) => ({ 
    opacity: 1, 
    x: 0, 
    filter: 'blur(0px)', 
    transition: { 
      delay: i * 0.12, 
      duration: 0.6, 
      ease: [0.2, 0.8, 0.2, 1] 
    } 
  })
};

export const card = {
  initial: { 
    opacity: 0, 
    y: 18 
  },
  animate: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.45, 
      ease: 'easeOut' 
    } 
  },
  hover: { 
    scale: 1.03, 
    y: -6, 
    boxShadow: '0 20px 40px rgba(11,16,20,0.12)', 
    transition: { 
      duration: 0.25 
    } 
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const fadeInUp = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 0.9, 0.38, 1]
    }
  }
};

export const slideInLeft = {
  hidden: {
    opacity: 0,
    x: -50
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};

export const slideInRight = {
  hidden: {
    opacity: 0,
    x: 50
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};

export const scaleIn = {
  hidden: {
    opacity: 0,
    scale: 0.8
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut'
    }
  }
};

export const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: {
      duration: 0.2
    }
  }
};

export const drawerVariants = {
  hidden: {
    x: '-100%'
  },
  visible: {
    x: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  },
  exit: {
    x: '-100%',
    transition: {
      duration: 0.3,
      ease: 'easeIn'
    }
  }
};

export const tabVariants = {
  inactive: {
    opacity: 0.6,
    y: 2
  },
  active: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2
    }
  }
};

export const buttonHover = {
  scale: 1.05,
  transition: {
    duration: 0.2,
    ease: 'easeOut'
  }
};

export const buttonTap = {
  scale: 0.95,
  transition: {
    duration: 0.1
  }
};