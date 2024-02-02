import { useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FaPlay, FaPause, FaGear } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-hot-toast";
import { useAtom, useAtomValue } from "jotai";
import { isDarkAtom } from "../../utils/Store";
import useSound from "use-sound";
import timerpause from "../../assets/sounds/timerpause.mp3";
import timerplay from "../../assets/sounds/timerplay.mp3";
import timercomplete from "../../assets/sounds/timercomplete.mp3";
import {
  initialMinutesAtom,
  initialSecondsAtom,
  minutesAtom,
  secondsAtom,
} from "../../utils/clockStore";
import { useStartTimer } from "../../custom hooks/useTimer";
import { useStopTimer } from "../../custom hooks/useTimer";

export const Timer = () => {
  const isDark = useAtomValue(isDarkAtom);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [timerPause] = useSound(timerpause, { volume: 0.7 });
  const [timerPlay] = useSound(timerplay, { volume: 0.7 });
  const [timerComplete] = useSound(timercomplete, { volume: 0.7 });

  //timer logic
  const [minutes, setMinutes] = useAtom(minutesAtom);
  const [seconds, setSeconds] = useAtom(secondsAtom);
  const [initialSeconds, setInitialSeconds] = useAtom(initialSecondsAtom);
  const [initialMinutes, setInitialMinutes] = useAtom(initialMinutesAtom);
  const { startTimer } = useStartTimer();
  const { stopTimer } = useStopTimer();
  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

  const totalTime = initialMinutes * 60 + initialSeconds;
  const currentTimeRemaining = minutes * 60 + seconds;
  const percentageRemaining = (currentTimeRemaining / totalTime) * 100;

  const setTimerHandler = (e) => {
    if (e.target.value == 0) {
      return;
    }
    if (e.target.value > 120) {
      toast.error(
        "Hey slow down buddy!\n The time must not exceed 120 minutes"
      );
      return;
    }
    setInitialMinutes(e.target.value);
    setInitialSeconds(0);
    setMinutes(e.target.value);
    setSeconds(0);
    setIsPlaying(false);
    setIsSettingsOpen(false);
  };

  const pauseHandler = () => {
    {
      isPlaying ? stopTimer() : startTimer();
    }
    // if (minutes == 0 && seconds == 0) {
    //   setInitialMinutes(50);
    //   setMinutes(50);
    // }
    setIsPlaying(!isPlaying);
  };

  // useEffect(() => {
  //   if (isPlaying) {
  //     let interval = setInterval(() => {
  //       if (seconds === 0) {
  //         if (minutes !== 0) {
  //           setSeconds(59);
  //           setMinutes(minutes - 1);
  //         } else {
  //           timerComplete();
  //           setIsPlaying(false);
  //           clearInterval(interval);
  //         }
  //       } else {
  //         setSeconds(seconds - 1);
  //       }
  //     }, 1000);

  //     return () => clearInterval(interval);
  //   }
  // }, [seconds, isPlaying, minutes, timerComplete]);

  return (
    <div className={`${isDark ? "text-white" : ""} px-8 flex-1 font-Rubik`}>
      <div className=" h-full flex flex-col gap-8 justify-center items-center">
        <div className=" w-full lg:w-[30%] md:w-[40%] sm:w-[60%] p-4">
          <CircularProgressbar
            text={`${timerMinutes}:${timerSeconds}`}
            styles={buildStyles({
              strokeLinecap: "butt",

              // Text size
              textSize: "16px",

              // How long animation takes to go from one percentage to another, in seconds
              pathTransitionDuration: 0.5,

              // Can specify path transition in more detail, or remove it entirely
              // pathTransition: 'none',

              // Colors
              pathColor: isDark ? "#15803d" : "#9333ea",
              textColor: isDark ? "#15803d" : "#9333ea",
              trailColor: "#d6d6d6",
              backgroundColor: "#3e98c7",
            })}
            value={percentageRemaining}
          />
        </div>
        <div className="flex gap-4 items-center">
          {isSettingsOpen ? (
            <div>
              <input
                type="number"
                onBlur={setTimerHandler}
                placeholder="Set time in minutes"
                className="text-black bg-gray-200 px-4 rounded-lg font-semibold text-xl py-2"
              />
            </div>
          ) : (
            <div className="flex text-[3.5em]">
              {isPlaying ? (
                <FaPause className="cursor-pointer" onClick={pauseHandler} />
              ) : (
                <FaPlay className="cursor-pointer" onClick={pauseHandler} />
              )}
            </div>
          )}
          {isSettingsOpen ? (
            <>
              <IoMdClose
                className="text-[3em] cursor-pointer"
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              />
            </>
          ) : (
            <FaGear
              className="cursor-pointer text-[3em]"
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            />
          )}
        </div>
      </div>
    </div>
  );
};
