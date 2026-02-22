import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const sectionFade = {
  hidden: { 
    opacity: 0, 
    y: 50, 
    x: -25, 
    filter: "blur(12px)", 
    scale: 0.96,
    rotateX: 8,
  },
  show: { 
    opacity: 1, 
    y: 0, 
    x: 0, 
    filter: "blur(0px)", 
    scale: 1,
    rotateX: 0,
  },
};

export default function Reveal({ children, delay = 0, once = true }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      variants={sectionFade}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      transition={{
        type: "spring",
        stiffness: 180,
        damping: 22,
        mass: 1,
        delay,
      }}
      style={{ perspective: "1200px" }}
    >
      {children}
    </motion.div>
  );
}
