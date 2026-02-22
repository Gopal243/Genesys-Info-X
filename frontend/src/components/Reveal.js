import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const sectionFade = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
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
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
