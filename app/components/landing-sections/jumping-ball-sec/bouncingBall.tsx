"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

export default function BouncingBall({ onBounce }: { onBounce: () => void }) {
  const parentControls = useAnimation();
  const childControls = useAnimation();

  useEffect(() => {
    const bounce = async () => {
      // Random tiny deformation values for shaking effect
      const shakeX = +(Math.random() * 0.1 + 0.9).toFixed(3); // 0.98 ~ 1.02
      const shakeY = +(Math.random() * 0.1 + 0.9).toFixed(3); // 0.98 ~ 1.02

      // Parent animation - only vertical movement
      parentControls.start({
        y: [0, -160, 0],
        transition: {
          duration: 1.2,
          ease: "easeInOut",
          times: [0, 0.7, 0.75, 1.2],
        },
      });

      // Child animation - rapid small scale changes for shaking effect
      childControls.start({
        scaleX: [1, shakeX, 1, shakeX, 1, shakeX, 1, shakeX, 1, shakeX, 1],
        scaleY: [1, shakeY, 1, shakeY, 1, shakeY, 1, shakeY, 1, shakeY, 1],
        transition: {
          duration: 1.2,
          times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        },
      });

      onBounce?.();
    };

    const interval = setInterval(() => {
      bounce();
    }, 1200);

    return () => clearInterval(interval);
  }, [parentControls, childControls, onBounce]);

  return (
    <motion.div
      animate={parentControls}
      className="absolute -top-[60px] left-1/2 -translate-x-1/2"
      style={{ originY: 1 }}
    >
      <motion.div
        animate={childControls}
        className="size-[60px] vdxl:w-[100px] vdxl:h-[100px] rounded-full bg-white shadow-xl"
      />
    </motion.div>
  );
}
