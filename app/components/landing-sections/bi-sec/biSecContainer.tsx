"use client";

import Image from "next/image";
import biScreen from "@/public/images/bi-screen.png";
import BiSecLabels from "./biSecLabels";
import { useInView } from "@/app/hooks/useInView";
import clsx from "clsx";
const BiSectionContainer = () => {
  const { ref, isInView } = useInView(); // به‌صورت پیش‌فرض threshold = 0.33
  return (
    <section
      ref={ref}
      className="w-full xl:h-[calc(100dvh-120px)] vdxl:h-[calc(100dvh-200px)] relative z-[2] bg-white p-5"
    >
      <BiSecLabels isInView={isInView} />
      <div
        className={clsx(
          "w-[50%] mx-auto  duration-[700ms] transition-all",
          isInView ? "translate-y-[100px]" : "translate-y-0"
        )}
      >
        <Image
          src={biScreen}
          alt="bi-screen"
          className="w-full h-auto object-cover rounded-[10px]"
        />
      </div>
    </section>
  );
};

export default BiSectionContainer;
