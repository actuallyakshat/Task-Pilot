import { useState, useEffect } from "react";

export const Time = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const formattedTime = () => {
    const hours = currentTime.getHours().toString().padStart(2, "0");
    const minutes = currentTime.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };
  return (
    <div>
      <h3 className="font-Poppins font-[700] text-[2.5rem]">
        {formattedTime()}
      </h3>
    </div>
  );
};
