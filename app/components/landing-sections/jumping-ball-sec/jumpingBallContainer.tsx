"use client";
import { useState } from "react";
import style from "./jumpingBallSecStyle.module.css";
import clsx from "clsx";
import BouncingBall from "./bouncingBall";

type Item = {
  title: string;
  color: string;
  textColor: string;
  tip: string;
  id: number;
};
const items: Item[] = [
  {
    title: "ارتباطی نزدیکتر",
    color: style["first-bg"],
    tip: "CLUB",
    textColor: "text-[#466d74]",
    id: 1,
  },
  {
    title: "تجربه‌ای مدرن",
    color: style["second-bg"],
    tip: "MENU",
    textColor: "text-[#2d4470]",

    id: 2,
  },
  {
    title: "تصمیم سازی هوشمند",
    color: style["third-bg"],
    tip: "DASHBOARD",
    textColor: "text-[#1677ff]",

    id: 3,
  },
];
const JumpingBallContainer = () => {
  const [activeItem, setActiveItem] = useState<Item>(items[0]);
  const handleChangeIndex = () => {
    const currentIndex = items.findIndex((item) => item.id === activeItem.id);
    const nextIndex = (currentIndex + 1) % items.length;
    setActiveItem(items[nextIndex]);
  };

  return (
    <section
      className={clsx(
        activeItem.color,
        "w-full h-dvh z-[2] px-5 pb-5 pt-[350px] flex justify-center relative transition-all"
      )}
    >
      <div
        style={{
          letterSpacing: "5px",
          lineHeight: "300px",
        }}
        className="w-full h-full flex items-center justify-center text-[230px] absolute inset-0 m-auto font-bold blur-[3px]"
      >
        <span
          className={clsx(
            activeItem.textColor,
            style["text-effect"],
            "transition-all"
          )}
        >
          {activeItem.tip}
        </span>
      </div>
      <ul className="flex flex-col gap-[40px] h-max relative z-[2]">
        <BouncingBall onBounce={handleChangeIndex} />
        {/* <div className={style.ball} /> */}
        {items.map((item) => {
          return (
            <li
              key={item.id}
              className={clsx(
                "w-[340px] h-[64px] rounded-[10px] border transition-colors border-highlighter flex items-center justify-center font-Yekan-Regular text-[24px]",
                {
                  "bg-highlighter text-primary1": activeItem.id == item.id,
                }
              )}
            >
              {activeItem.id == item.id && <span>{item.title}</span>}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default JumpingBallContainer;
