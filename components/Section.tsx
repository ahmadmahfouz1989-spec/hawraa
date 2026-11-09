"use client";

import { motion } from "motion/react";

interface SectionProps {
  id?: string;
  title: React.ReactNode;
  children: React.ReactNode;
}

/** قسم بعنوان بسيط، يظهر بهدوء عند التمرير */
export function Section({ id, title, children }: SectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mx-auto w-full max-w-md px-4 py-14"
    >
      <h2 className="mb-6 text-center text-2xl font-extrabold text-berry">{title}</h2>
      {children}
    </motion.section>
  );
}
