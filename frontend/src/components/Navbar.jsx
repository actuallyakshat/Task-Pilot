import { Link } from "react-router-dom";
import { isDarkAtom, isLoggedInAtom, loadingAtom } from "../utils/Store";
import { useAtom, useAtomValue } from "jotai";
import { FaRegSun, FaRegMoon } from "react-icons/fa";
import useSound from "use-sound";
import switchsound from "../assets/sounds/switch.mp3";
import { Logout } from "./Authentication/Logout";

export const Navbar = () => {
  const [isDark, setIsDark] = useAtom(isDarkAtom);
  const loading = useAtomValue(loadingAtom);
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const [switchSound] = useSound(switchsound, { volume: 0.4 });
  const themeHandler = () => {
    switchSound();
    setIsDark(!isDark);
  };

  return (
    <nav
      className={`${
        isDark ? "bg-dark text-white" : "bg-light"
      } flex h-[70px] justify-center items-center text-black/90 transition-colors`}
    >
      <div className="w-full px-5 md:w-[70%] h-full flex items-center justify-between">
        <Link to="/">
          <h1 className="font-Poppins uppercase text-xl font-[700]">
            task pilot
          </h1>
        </Link>
        {loading ? (
          <></>
        ) : (
          <div className="flex gap-4 md:gap-4 items-center justify-center">
            <button
              onClick={themeHandler}
              className={`${
                isDark ? "text-white" : ""
              } transition-colors scale-125 mr-2 order-last md:order-first`}
            >
              {isDark ? <FaRegMoon /> : <FaRegSun />}
            </button>
            {!isLoggedIn && (
              <div>
                <Link to="/login">
                  <button
                    className={`hover:border-b ${
                      isDark ? "border-white" : "border-black"
                    } px-2 py-2 transition-colors font-[500]`}
                  >
                    Login
                  </button>
                </Link>
                <Link to="/signup" className="sm:hidden md:inline">
                  <button
                    className={`hover:border-b ${
                      isDark ? "border-white" : "border-black"
                    } px-2 py-2 transition-colors font-[500]`}
                  >
                    Signup
                  </button>
                </Link>
              </div>
            )}
            {isLoggedIn && (
              <>
                <Link to="/list">
                  <button
                    className={`hover:border-b ${
                      isDark ? "border-white" : "border-black"
                    } px-2 py-2 transition-colors font-[500]`}
                  >
                    To Do List
                  </button>
                </Link>
                <Link to="/login">
                  <Logout />
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
