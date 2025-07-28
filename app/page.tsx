import BiSectionContainer from "./components/landing-sections/bi-sec/biSecContainer";
import IntroSecContainer from "./components/landing-sections/intro-sec/introSecContainer";

export default function Home() {
  return (
    <div className="w-full">
      <IntroSecContainer />
      <BiSectionContainer />
    </div>
  );
}
