import { useEffect, useState } from "react";
import useSound from "use-sound";
import timercomplete from "../assets/sounds/timercomplete.mp3";
import { useAtom } from "jotai";
import timerpause from "../assets/sounds/timerpause.mp3";

import {
  //   initialMinutesAtom,
  //   initialSecondsAtom,
  minutesAtom,
  secondsAtom,
} from "../utils/clockStore";
export const useStartTimer = (callback) => {
  const [minutes, setMinutes] = useAtom(minutesAtom);
  const [seconds, setSeconds] = useAtom(secondsAtom);
  //   const [initialSeconds, setInitialSeconds] = useAtom(initialSecondsAtom);
  //   const [initialMinutes, setInitialMinutes] = useAtom(initialMinutesAtom);

  const [isPlaying, setIsPlaying] = useState(false);
  const [timerComplete] = useSound(timercomplete, { volume: 0.7 });

  const startTimer = () => {
    setIsPlaying(true);
  };

  useEffect(() => {
    if (isPlaying) {
      let interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes !== 0) {
            setSeconds(59);
            setMinutes(minutes - 1);
          } else {
            timerComplete();
            setIsPlaying(false);
            clearInterval(interval);
            callback();
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [
    seconds,
    isPlaying,
    minutes,
    timerComplete,
    callback,
    setMinutes,
    setSeconds,
  ]);

  return { startTimer };
};

export const useStopTimer = () => {
  const [timerPause] = useSound(timerpause, { volume: 0.7 });

  const [isPlaying, setIsPlaying] = useState(false);

  const stopTimer = () => {
    if (isPlaying) {
      timerPause();
      setIsPlaying(false);
    }
  };

  return { stopTimer };
};
