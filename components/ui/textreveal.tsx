'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TextRevealProps {
  text: string;
  shouldAnimate: boolean;
  isActive: boolean;
  index: number;
  shouldFade: boolean;
}

// Main App Component
export default function TextReveal({ text, shouldAnimate, isActive, index, shouldFade }: TextRevealProps) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const words = text.split(" ");

  useEffect(() => {
    if (shouldAnimate && !hasAnimated) {
      setIsAnimating(true);
      setHasAnimated(true);
    }
  }, [shouldAnimate, hasAnimated]);

  useEffect(() => {
    if (shouldFade) {
      setIsAnimating(false);
    }
  }, [shouldFade]);

  // Variants for the container to orchestrate the animation
  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.04 * i,
        duration: 0.8,
        ease: "easeInOut",
      },
    }),
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  // Variants for each word to create a smoother smoke effect
  const childVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        type: "tween",
      },
    },
  };

  return (
    <motion.div
      className="flex items-center justify-start font-sans p-4"
      animate={{
        y: index * -20,
        opacity: hasAnimated ? 1 : 0,
      }}
      transition={{
        duration: 0.8,
        ease: "easeInOut",
      }}
    >
      <AnimatePresence mode="wait">
        {hasAnimated && !shouldFade && (
          <motion.div
            key="text-reveal"
            style={{ display: "flex", flexWrap: "wrap", justifyContent: 'start' }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="text-xl font-bold text-start mask-r-from-0.5 max-w-5xl leading-relaxed"
          >
            {isAnimating ? (
              // Animated version (first time)
              words.map((word, index) => (
                <motion.span
                  key={index}
                  variants={childVariants as any}
                  style={{ marginRight: "12px", marginTop: "10px" }}
                >
                  {word}
                </motion.span>
              ))
            ) : (
              // Simple version (after first animation)
              <div className="text-xl font-bold text-start max-w-5xl leading-relaxed">
                {text}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
