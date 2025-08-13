import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className, 
  hover = false,
  gradient = false 
}) => {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.02 } : {}}
      className={clsx(
        "rounded-2xl border border-white/20 shadow-vibrant",
        gradient 
          ? "bg-gradient-to-br from-white to-slate-50" 
          : "bg-white/70 backdrop-blur-lg",
        hover && "card-hover",
        className
      )}
    >
      {children}
    </motion.div>
  );
};