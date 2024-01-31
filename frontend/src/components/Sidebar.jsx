import { isDarkAtom } from "../utils/Store";
import { useAtomValue } from "jotai";
import { LuClipboardCheck } from "react-icons/lu";
import { FaUser } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { LuUsers } from "react-icons/lu";
import { MdLogout } from "react-icons/md";

export const Sidebar = () => {
  const isDark = useAtomValue(isDarkAtom);
  return (
    <div className={`${isDark ? "bg-gray-400/20" : "bg-white/20"} min-h-[80%] h-full min-w-[20%] rounded-lg p-10 shadow-lg`}>
      <div className="flex w-full h-full font-Rubik flex-col items-start justify-between">
        <div className="flex w-full flex-col">
          <h1 className="text-3xl font-[600]">Features</h1>
          <ul className="mt-8 flex flex-col gap-2">
            <li
              className={`w-full cursor-pointer transition-colors ${
                isDark ? "hover:bg-white/20" : "hover:bg-black/10"
              } rounded-md`}
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
              className={`w-full cursor-pointer transition-colors ${
                isDark ? "hover:bg-white/20" : "hover:bg-black/10"
              } rounded-md`}
            >
              <div className="flex gap-2 p-2 items-center">
                <FaUser />
                <button className="rounded-md font-semibold">
                  Profile
                </button>
              </div>
            </li>
            <li
              className={`w-full cursor-pointer transition-colors ${
                isDark ? "hover:bg-white/20" : "hover:bg-black/10"
              } rounded-md`}
            >
              <div className="flex p-2 gap-2 items-center">
                <MdLogout />
                <button className=" rounded-md font-semibold">Logout</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
