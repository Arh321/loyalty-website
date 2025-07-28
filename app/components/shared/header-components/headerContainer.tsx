"use client";

import Link from "next/link";
import HeaderMenu from "./headerMenu";
import { AnimatePresence, motion } from "framer-motion";
import { useScrolled } from "@/app/hooks/useScrollDirection";
import clsx from "clsx";
const HeaderContainer = () => {
  const hasScrolled = useScrolled(20); // بعد از ۲۰ پیکسل اسکرول فعال می‌شه
  return (
    <header
      className={clsx(
        "w-full flex flex-col items-center z-10 fixed top-0 right-0 gap-5",
        hasScrolled && "pt-5"
      )}
    >
      <AnimatePresence>
        {!hasScrolled && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="w-2/3  bg-gradient-to-r  rounded-b-[10px] flex items-center justify-center  from-primary1 via-primary2 to-primary1"
          >
            <Link
              href="#"
              className="w-full font-Yekan-Medium  text-center text-highlighter text-lg lg:text-xl lxl:text-2xl vdxl:text-3xl p-2 xl:p-3 vdxl:p-5"
            >
              دریافت مشاوره رایگان
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <HeaderMenu />
    </header>
  );
};

export default HeaderContainer;
