import { asset } from "fresh/runtime";

export default () => {
  return (
    <header
      style={`background-image: url(${asset("/images/congress.jpg")});`}
      class="border-gray-200 dark:border-gray-700 sticky h-[110px] top-0 z-20 bg-[center_top_12.5rem] 2xl:bg-[center_top_28rem] 3xl:bg-[center_top_51rem] bg-cover"
    >
      <div class="flex flex-col items-center justify-center max-w-screen h-[110px] p-4 bg-linear-to-r from-[#B31942]/50 via-[#1C00ff00] to-[#0A3161]/50 bg-blend-overlay">
        <a href="/">
          <span class="md:text-2xl text-xl font-semibold whitespace-nowrap dark:text-white text-shadow-lg text-shadow-[#355262]">
            WTF Is Congress Doing Now?
          </span>
        </a>

        <span class="md:text-lg font-semibold whitespace-nowrap dark:text-white text-shadow-lg text-shadow-[#355262]">
          Now With{" "}
          <a class="text-amber-400 hover:underline" href="/executive-orders">
            Executive Orders!
          </a>
        </span>
      </div>
    </header>
  );
};
