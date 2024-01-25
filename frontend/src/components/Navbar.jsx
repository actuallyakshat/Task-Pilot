import { Link } from "react-router-dom";
import { isDarkAtom, isLoggedInAtom } from "../utils/Store";
import { useAtom } from "jotai";
import { FaRegSun, FaRegMoon } from "react-icons/fa";
import useSound from "use-sound";
import switchsound from "../assets/sounds/switch.mp3";

export const Navbar = () => {
  const [isDark, setIsDark] = useAtom(isDarkAtom);
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [switchSound] = useSound(switchsound, { volume: 0.4 });
  const themeHandler = () => {
    switchSound();
    setIsDark(!isDark);
  };
  return (
    <nav
      className={`${
        isDark ? "bg-dark text-white" : ""
      } flex h-[70px] justify-center items-center text-black/80 transition-colors`}
    >
      <div className="w-[70%] h-full flex items-center justify-between">
        <Link to="/">
          <h1 className="font-Poppins uppercase text-xl font-[700]">
            task pilot
          </h1>
        </Link>
        <div className="flex gap-4 items-center justify-center">
          <button
            onClick={themeHandler}
            className={`${
              isDark ? "text-white" : ""
            } transition-colors scale-125 mr-2`}
          >
            {isDark ? <FaRegMoon /> : <FaRegSun />}
          </button>

          <Link to="/login">
            <button className="hover:bg-green-600 px-2 py-2 transition-colors rounded-md">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="hover:bg-green-600 px-2 py-2 transition-colors rounded-md">
              Signup
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
