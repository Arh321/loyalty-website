"use client";

import Link from "next/link";
import HeaderMenu from "./headerMenu";
import { AnimatePresence, motion } from "framer-motion";
import { useScrolled } from "@/app/hooks/useScrollDirection";
import clsx from "clsx";

const HeaderContainer = () => {
  const hasScrolled = useScrolled(20); // فعال شدن بعد از ۲۰ پیکسل اسکرول

  const collapsedHeight = 120;
  const expandedHeight = 150;

  return (
    <motion.header
      animate={{
        height: hasScrolled ? collapsedHeight : expandedHeight,
      }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className={clsx(
        "w-full z-10 fixed top-0 right-0 flex flex-col items-center overflow-hidden" // مهم: overflow-hidden برای جلوگیری از پریدن محتوا
      )}
    >
      <div className="w-full relative h-full">
        <AnimatePresence>
          {!hasScrolled && (
            <motion.div
              key="cta"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="w-2/3 bg-gradient-to-r rounded-b-[10px] flex items-center justify-center from-primary1 via-primary2 to-primary1 absolute top-0 mx-auto right-0 left-0"
            >
              <Link
                href="#"
                className="w-full font-Yekan-Medium text-center text-highlighter text-lg lg:text-xl lxl:text-2xl vdxl:text-3xl p-2 xl:p-3 vdxl:p-5"
              >
                دریافت مشاوره رایگان
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          animate={{ top: hasScrolled ? 10 : 60 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="w-full flex justify-center absolute"
        >
          <HeaderMenu />
        </motion.div>
      </div>
    </motion.header>
  );
};

export default HeaderContainer;
