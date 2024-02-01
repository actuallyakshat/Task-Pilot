import { Route, Routes } from "react-router-dom";
import { ListContainer } from "./List/ListContainer";
import { Sidebar } from "./Sidebar";
import { isDarkAtom } from "../utils/Store";
import { useAtomValue } from "jotai";
import { Timer } from "./PomodoroTimer/Timer";
import { useState } from "react";
import { Profile } from "./Account/Profile";

export const Dashboard = () => {
  const isDark = useAtomValue(isDarkAtom);
  const [currentPage, setCurrentPage] = useState("list"); // Default to the list page

  const handleSidebarItemClick = (page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "list":
        return <ListContainer />;
      case "pomodoro":
        return <Timer />;

      case "profile":
        return <Profile />;
      // Add more cases for additional pages

      default:
        return null; // Render nothing if the page doesn't match any case
    }
  };
  return (
    <div
      className={` ${
        isDark ? "text-white" : "text-black"
      } flex-1 mx-16 my-8 gap-8 flex items-center justify-between`}
    >
      <Sidebar onItemClick={handleSidebarItemClick} />
      {renderPage()}
      {/* <div className="w-full bg-green-400">
        <Routes>
          <Route index path="/" element={<ListContainer />} />
          <Route path="/pomodoro" element={<Timer />} />
        </Routes>
      </div> */}
    </div>
  );
};
