import { useEffect, useState } from "react";
import useSound from "use-sound";
import timercomplete from "../assets/sounds/timercomplete.mp3";
import { useAtom } from "jotai";
import timerpause from "../assets/sounds/timerpause.mp3";
import timerplay from "../assets/sounds/timerplay.mp3";

import {
  isPlayingAtom,
  initialMinutesAtom,
  //   initialSecondsAtom,
  minutesAtom,
  secondsAtom,
} from "../utils/clockStore";
export const useStartTimer = (callback) => {
  const [minutes, setMinutes] = useAtom(minutesAtom);
  const [seconds, setSeconds] = useAtom(secondsAtom);
  //   const [initialSeconds, setInitialSeconds] = useAtom(initialSecondsAtom);
  const [initialMinutes, setInitialMinutes] = useAtom(initialMinutesAtom);

  const [isPlaying, setIsPlaying] = useAtom(isPlayingAtom);
  const [timerComplete] = useSound(timercomplete, { volume: 0.7 });
  const [timerPlay] = useSound(timerplay, { volume: 0.7 });

  const startTimer = () => {
    if (minutes == 0 && seconds == 0) {
      setMinutes(50);
      setInitialMinutes(50);
    }
    timerPlay();
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
    setIsPlaying,
  ]);

  return { startTimer };
};

export const useStopTimer = () => {
  const [timerPause] = useSound(timerpause, { volume: 0.7 });
  const [isPlaying, setIsPlaying] = useAtom(isPlayingAtom);

  const stopTimer = () => {
    timerPause();
    setIsPlaying(false);
  };

  return { stopTimer };
};
