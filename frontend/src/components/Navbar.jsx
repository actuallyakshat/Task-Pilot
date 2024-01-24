import { Link } from "react-router-dom";
import { isDarkAtom } from "../utils/Store";
import { useAtom } from "jotai";
import { FaRegSun, FaRegMoon } from "react-icons/fa";
import useSound from "use-sound";
import switchsound from "../assets/sounds/switch.mp3";

export const Navbar = () => {
  const [isDark, setIsDark] = useAtom(isDarkAtom);
  const [switchSound] = useSound(switchsound, {volume:0.8});
  const themeHandler = () => {
    switchSound();
    setIsDark(!isDark);
  };
  return (
    <nav
      className={`${
        isDark ? "bg-gray-900 text-white border-white" : ""
      } flex h-[70px] justify-center items-center border-b shadow-sm text-black/80`}
    >
      <div className="w-[70%] h-full flex items-center justify-between">
        <Link to="/">
          <h1 className="font-Poppins uppercase text-xl font-[700]">
            task pilot
          </h1>
        </Link>
        <div className="flex gap-6">
          <button onClick={themeHandler}>
            {isDark ? <FaRegMoon /> : <FaRegSun />}
          </button>

          <Link to="/login">
            <button>login</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
