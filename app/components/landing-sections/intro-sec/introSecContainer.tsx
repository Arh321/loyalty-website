import MemoizedParticlesBackground from "./particles-bg";

const IntroSecContainer = () => {
  return (
    <div className="w-full xl:h-[calc(100dvh-120px)] vdxl:h-[calc(100dvh-200px)] relative overflow-hidden">
      <MemoizedParticlesBackground />
      <h2
        dir="rtl"
        className="text-primary1 w-max mx-auto flex flex-col items-center gap-5 absolute inset-0 m-auto z-[2] h-max"
      >
        <p className="lg:text-[38px] xl:text-[52px] ldxl:text-[56px] vdxl:text-[64px] font-Yekan-Demi-Bold text-center">
          یک نگاه، همه چیز را می‌گوید
        </p>
        <p className="font-Yekan-Regular leading-7 text-[20px] vdxl:text-[28px] max-w-[580px] vdxl:max-w-[640px] text-center">
          در دنیای رقابتی امروز، حفظ مشتریان وفادار یکی از کلیدهای موفقیت هر
          کسب‌ و کاری است. مجموعه نرم‌افزار های هوشمند مهام سیستم طراحی شده تا
          ارتباطی پایدار و سودمند بین شما و مشتریانتان ایجاد کند.
        </p>
      </h2>
      <div className="w-full h-[300px] bg-linear-to-t from-white to-transparent absolute bottom-0 right-0"></div>
    </div>
  );
};
export default IntroSecContainer;
