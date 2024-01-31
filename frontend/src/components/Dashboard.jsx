import { Route, Routes } from "react-router-dom";
import { ListContainer } from "./List/ListContainer";
import { Sidebar } from "./Sidebar";
import { isDarkAtom } from "../utils/Store";
import { useAtomValue } from "jotai";

export const Dashboard = () => {
  const isDark = useAtomValue(isDarkAtom);
  return (
    <div
      className={` ${
        isDark ? "text-white" : "text-black"
      } flex-1 mx-16 my-8 flex items-center justify-between`}
    >
      <Sidebar />
      <div className="w-full bg-red-100">
        <Routes>
          <Route index path="/" element={<ListContainer />} />
          <Route path="/pomodoro" element={<Sidebar />} />
        </Routes>
      </div>
    </div>
  );
};
