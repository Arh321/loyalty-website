import { Suspense } from "react";
import BiSectionContainer from "./components/landing-sections/bi-sec/biSecContainer";
import IntroSecContainer from "./components/landing-sections/intro-sec/introSecContainer";
import LoadingApp from "./components/shared/loading/loading";
import TodayBusinessSec from "./components/landing-sections/today-business-sec/todayBusinessSec";
import JumpingBallContainer from "./components/landing-sections/jumping-ball-sec/jumpingBallContainer";

export default function Home() {
  return (
    <Suspense fallback={<LoadingApp />}>
      <div className="w-full">
        <IntroSecContainer />
        <BiSectionContainer />
        <TodayBusinessSec />
        <JumpingBallContainer />
      </div>
    </Suspense>
  );
}
