import { Link } from "react-router-dom";
import { useAtomValue } from "jotai";
import { isDarkAtom } from "../../utils/Store";

export const Hero = () => {
  const isDark = useAtomValue(isDarkAtom);
  return (
    <div
      className={`h-full w-full ${
        isDark ? "bg-heroDark text-white" : "bg-heroLight"
      } bg-cover bg-center bg-no-repeat font-Rubik transition-all flex-1 flex justify-center items-center`}
    >
      <div className="flex flex-col items-center text-center px-4 justify-center">
        <h1 className="font-bold text-4xl md:text-6xl md:w-[20ch] mb-6 md:mb-2">
          A Minimal To Do List & Accountability App
        </h1>
        <h3 className=" md:w-[40ch] text-[1.1em]">
          Step into a World of Organized Living. <br />
          <span className="font-bold">Task Pilot</span> Awaits Your Presence.
          Join Now to Uncover the Secret to a Harmonious and Stress-Free
          Lifestyle
        </h3>
        <Link to="/signup">
          <button
            className={`mt-12 ${
              isDark ? "bg-light text-dark" : "bg-dark text-white"
            } px-4 py-3 font-semibold transition-colors rounded-md`}
          >
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};
