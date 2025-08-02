"use client";

import React, { useEffect } from "react";

import { useInView } from "@/app/hooks/useInView";
import { animate, motion, useMotionValue } from "framer-motion";
import clsx from "clsx";

const TodayBusinessSec: React.FC = () => {
  const { ref } = useInView(); // پیش‌فرض threshold = 0.33
  return (
    <section
      ref={ref}
      dir="rtl"
      className="w-full h-[calc(100dvh-120px)] vdxl:h-[calc(100dvh-200px)] relative z-[2] bg-white/90 px-5 pb-10 pt-5 flex justify-center items-center"
    >
      <div className="w-3/4 grid grid-cols-2 gap-5 h-full ">
        <div className="col-span-1 relative h-full">
          <div className="absolute top-8 right-0 ">
            <FloatingImage
              src="/images/business-images/man.webp"
              className="lg:w-[220px] lg:h-[300px] dxl:w-[280px] dxl:h-[350px] vdxl:w-[320px] vdxl:h-[425px] rounded-[20px]"
              interval={2000}
              maxFloat={6}
            />
          </div>
          <div className="absolute bottom-8 left-0 ">
            <FloatingImage
              src="/images/business-images/women.webp"
              className="lg:w-[220px] lg:h-[300px] dxl:w-[280px] dxl:h-[350px] vdxl:w-[320px] vdxl:h-[425px] rounded-[20px]"
              interval={2000}
              maxFloat={6}
            />
          </div>
          <div className="bg-radial from-[rgb(37,42,80,0.3)] to-55% to-transparent w-full h-full"></div>
        </div>
        <div className="flex flex-col justify-between py-8 pr-5 max-w-[532px] vdxl:max-w-full">
          <h2 className="lg:text-[36px] xl:text-[40px] ldxl:text-[52px] font-Yekan-Demi-Bold text-primary1">
            کسب و کارهای امــروزی
          </h2>
          <p className="font-Yekan-Regular lg:text-[16px] dxl:text-[20px] vdxl:text-[21px] text-primary1 leading-7 vdxl:leading-8">
            در دنیای رقابتی امروز، دیگر تنها ارائه محصول یا خدمات باکیفیت کافی
            نیست. آنچه مشتریان به دنبال آن هستند، یک تجربه متفاوت و
            شخصی‌سازی‌شده است. باشگاه مشتریان، به‌عنوان یکی از قدرتمندترین
            ابزارهای بازاریابی مدرن، دقیقاً همین نیاز را برآورده می‌کند.
          </p>
          <ul className="font-Yekan-Regular lg:text-[16px] dxl:text-[20px] vdxl:text-[21px] text-primary1 leading-7 vdxl:leading-8 flex flex-col gap-2">
            <li className="list-disc">
              تحقیقات نشان می‌دهد که مشتریان وفادار ۸۰٪ بیشتر از مشتریان جدید
              خرید می‌کنند.
            </li>
            <li className="list-disc">
              باشگاه مشتریان با ارائه تخفیف‌ها، امتیازات، و جوایز انگیزه خرید
              بیشتری ایجاد می‌کند.
            </li>
            <li className="list-disc">
              در بازارهای اشباع‌شده، باشگاه مشتریان می‌تواند برگ برنده شما برای
              متمایز شدن از رقبا باشد.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TodayBusinessSec;

interface FloatingImageProps {
  src: string;
  alt?: string;
  className?: string;
  maxFloat?: number; // حداکثر انحراف از مرکز (px)
  interval?: number; // چند میلی‌ثانیه یکبار جهت عوض شه
}

const FloatingImage = ({
  src,
  alt = "",
  className = "",
  maxFloat = 4, // خیلی کم برای طبیعی بودن
  interval = 3000,
}: FloatingImageProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    let animationX: ReturnType<typeof animate>;
    let animationY: ReturnType<typeof animate>;

    const randomize = () => {
      const randX = Math.random() * maxFloat * 2 - maxFloat;
      const randY = Math.random() * maxFloat * 2 - maxFloat;

      animationX = animate(x, randX, {
        duration: interval / 1000,
        ease: "easeInOut",
      });

      animationY = animate(y, randY, {
        duration: interval / 1000,
        ease: "easeInOut",
      });
    };

    const loop = setInterval(randomize, interval);
    randomize();

    return () => {
      clearInterval(loop);
      animationX?.stop();
      animationY?.stop();
    };
  }, [x, y, maxFloat, interval]);
  return (
    <motion.img
      src={src}
      alt={alt}
      className={clsx("object-cover", className)}
      style={{ x, y }}
    />
  );
};
