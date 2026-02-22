import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const sectionFade = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)", scale: 0.985 },
  show: { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 },
};

export default function Reveal({ children, delay = 0, once = true }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-120px" });

  return (
    <motion.div
      ref={ref}
      variants={sectionFade}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 28,
        mass: 0.9,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
