"use client";
import clsx from "clsx";
import { motion } from "framer-motion";

const BiSecLabels = ({ isInView }: { isInView: boolean }) => {
  const items = [
    {
      title: "تحلیل فروش",
      className: "absolute right-0 -top-4 rotate-[30deg] z-[3]",
      side: "right",
    },
    {
      title: "مدیریت یکپارچه",
      className: "absolute right-[80px] -top-4 rotate-[15deg] z-[2]",
      side: "right",
    },
    {
      title: "هوش تجاری",
      className: "absolute right-[190px] top-0 rotate-[-10deg] z-[1]",
      side: "right",
    },
    {
      title: "مدیریت نوین",
      className: "absolute left-0 -top-4 -rotate-[30deg] z-[3]",
      side: "left",
    },
    {
      title: "هوشمندی در خدمت",
      className: "absolute left-[80px] -top-4 -rotate-[15deg] z-[2]",
      side: "left",
    },
    {
      title: "کنترل کامل",
      className: "absolute left-[210px] top-0 -rotate-[-10deg] z-[1]",
      side: "left",
    },
  ];

  return (
    <ul
      className={clsx(
        "w-[55%] relative mx-auto",
        isInView && "!w-[65%] transition-all duration-500"
      )}
    >
      {items.map((item, index) => {
        // سمت چپ‌ها بیان به راست، سمت راست‌ها بیان به چپ
        const xOffset = item.side === "right" ? index * -40 : (index - 3) * 40;

        return (
          <motion.li
            key={index}
            initial={{ y: 0, x: 0, opacity: 100 }}
            animate={
              isInView
                ? { y: [-20, -30, 0], x: xOffset, opacity: 1 }
                : { y: 0, x: 0, opacity: 100 }
            }
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className={clsx(
              "bg-labels text-primary1 font-Yekan-Regular xl:text-[18px] xl:px-5 xl:py-3 vdxl:text-[28px] vdxl:px-5 vdxl:py-3 rounded-[8px]",
              item.className
            )}
            style={{
              boxShadow: "0 4px 150px rgba(0,0,0,0.3)",
            }}
          >
            {item.title}
          </motion.li>
        );
      })}
    </ul>
  );
};

export default BiSecLabels;
