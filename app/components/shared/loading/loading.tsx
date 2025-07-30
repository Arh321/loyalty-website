"use client";
import Image from "next/image";
import logo from "@/public/images/logo.webp";
import { motion } from "framer-motion";
const LoadingApp = () => {
  return (
    <div
      dir="rtl"
      className="w-full h-dvh flex justify-center items-center bg-primary1"
    >
      <div className="flex items-center gap-4">
        <motion.div
          initial={{ x: -150, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className=" z-10 text-center"
        >
          <Image
            src={logo}
            alt="لوگوی راهکارهای هوشمند فرداد سیستم مهام"
            width={78}
            height={60}
            priority
          />
        </motion.div>
        <motion.div
          key="text"
          initial={{ x: 150, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
          className="flex flex-col font-Yekan-Medium"
        >
          <span>راهکارهای هوشمند</span>
          <span>فرداد سیستم مهام</span>
        </motion.div>
      </div>
    </div>
  );
};
export default LoadingApp;
