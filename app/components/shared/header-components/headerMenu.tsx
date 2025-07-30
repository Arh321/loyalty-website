import logo from "@/public/images/logo.webp";
import Image from "next/image";
import Link from "next/link";

const HeaderMenu = () => {
  const routes = [
    { url: "/", title: "خانه" },
    { url: "/club", title: "باشگاه مشتریان" },
    { url: "/menu", title: "منو دیجیتال" },
    { url: "/about", title: "درباره ما" },
    { url: "/contact", title: "تماس با ما" },
  ];

  return (
    <div
      style={{
        opacity: "0",
        transform: "translateY(-50px)",
        animationDelay: "0.3s",
      }}
      className="w-5/6 animate-slide-in bg-linear-to-l from-primary2 to-primary1 rounded-[10px]"
      dir="rtl"
    >
      <nav aria-label="منوی اصلی سایت" className="w-full">
        <div
          className="w-full bg-no-repeat bg-contain"
          style={{
            backgroundImage: "url(/images/header-images/header-lines.webp)",
            backgroundPositionX: "50px",
          }}
        >
          <div
            className="w-full px-[140px] py-[10px] flex items-center gap-[100px] bg-no-repeat bg-contain"
            style={{
              backgroundImage: "url(/images/header-images/lines.webp)",
            }}
          >
            <div className="flex items-center gap-4">
              <Link href="/">
                <Image
                  src={logo}
                  alt="لوگوی راهکارهای هوشمند فرداد سیستم مهام"
                  width={78}
                  height={60}
                  priority
                />
              </Link>
              <div className="flex flex-col font-Yekan-Medium">
                <span>راهکارهای هوشمند</span>
                <span>فرداد سیستم مهام</span>
              </div>
            </div>
            <ul className="flex items-center flex-1 gap-[50px]">
              {routes.map((route, index) => (
                <li key={index} className="font-Yekan-Regular">
                  <Link
                    href={route.url}
                    aria-current={route.url === "/" ? "page" : undefined}
                    className="hover:text-highlighter transition-colors border-b border-transparent hover:border-highlighter"
                  >
                    {route.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default HeaderMenu;
