import { isDarkAtom } from "../utils/Store";
import { useAtom } from "jotai";
import { LuClipboardCheck } from "react-icons/lu";
import { FaUser } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { LuUsers } from "react-icons/lu";
import { Logout } from "./Account/Logout";
import PropTypes from "prop-types";
import useSound from "use-sound";
import switchsound from "../assets/sounds/switch.mp3";
import { FaRegSun, FaRegMoon } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Sidebar = ({ onItemClick }) => {
  const [isDark, setIsDark] = useAtom(isDarkAtom);
  const [switchSound] = useSound(switchsound, { volume: 0.4 });
  const themeHandler = () => {
    switchSound();
    setIsDark(!isDark);
  };
  return (
    <div
      className={`${
        isDark ? "bg-gray-400/20" : "bg-white/20"
      } min-h-[80%] h-full max-h-[80%] min-w-[20%] rounded-lg p-10 shadow-lg`}
    >
      <div className="flex w-full h-full font-Rubik flex-col items-start justify-between">
        <div className="flex w-full flex-col">
          <Link to="/">
            <h1 className="text-4xl font-[800] text-center ">
              Task{" "}
              <span
                className={`${isDark ? "text-green-600" : "text-purple-600"}`}
              >
                Pilot
              </span>
            </h1>
          </Link>
          <ul className="mt-8 flex flex-col gap-2">
            <li
              className={`w-full cursor-pointer transition-colors ${
                isDark ? "hover:bg-white/20" : "hover:bg-black/10"
              } rounded-md`}
              onClick={() => onItemClick("list")}
            >
              <div className="flex p-2 gap-2 items-center">
                <LuClipboardCheck />
                <button className="rounded-md font-semibold">To Do List</button>
              </div>
            </li>
            <li
              className={`w-full cursor-pointer transition-colors ${
                isDark ? "hover:bg-white/20" : "hover:bg-black/10"
              } rounded-md`}
              onClick={() => onItemClick("pomodoro")}
            >
              <div className="p-2 flex items-center gap-2">
                <FaRegClock />
                <button className="text-left rounded-md font-semibold">
                  Pomodoro Timer
                </button>
              </div>
            </li>
            <li
              className={`w-full cursor-pointer transition-colors ${
                isDark ? "hover:bg-white/20" : "hover:bg-black/10"
              } rounded-md`}
            >
              <div className="flex items-center gap-2 p-2">
                <LuUsers />
                <button className="rounded-md font-semibold">Friends</button>
              </div>
            </li>
          </ul>
        </div>
        <div className="w-full">
          <ul>
            <li
              onClick={themeHandler}
              className={`w-full cursor-pointer transition-colors ${
                isDark ? "hover:bg-white/20" : "hover:bg-black/10"
              } rounded-md`}
            >
              <button
                className={`${
                  isDark ? "text-white" : ""
                } transition-colors font-semibold order-last md:order-first`}
              >
                {isDark ? (
                  <div className="flex gap-2 p-2 items-center">
                    <FaRegMoon /> <p>Dark</p>
                  </div>
                ) : (
                  <div className="flex gap-2 p-2 items-center">
                    <FaRegSun /> <p>Light</p>
                  </div>
                )}
              </button>
            </li>
            <li
              className={`w-full cursor-pointer transition-colors ${
                isDark ? "hover:bg-white/20" : "hover:bg-black/10"
              } rounded-md`}
            >
              <div className="flex gap-2 p-2 items-center">
                <FaUser />
                <button
                  className="rounded-md font-semibold"
                  onClick={() => onItemClick("profile")}
                >
                  Profile
                </button>
              </div>
            </li>

            <div>
              <Logout />
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  onItemClick: PropTypes.func,
};
