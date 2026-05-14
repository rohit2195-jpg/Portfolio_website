import { motion, useReducedMotion } from "framer-motion";

export default function FadeIn({ children, delay = 0, className, style, as: Tag }) {
  const reduced = useReducedMotion();

  if (reduced) {
    if (Tag) return <Tag className={className} style={style}>{children}</Tag>;
    return <>{children}</>;
  }

  const MotionTag = Tag ? motion[Tag] : motion.div;

  return (
    <MotionTag
      className={className}
      style={style}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.4, ease: "easeOut", delay }}
    >
      {children}
    </MotionTag>
  );
}
