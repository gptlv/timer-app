import { Timer, TimerState } from "../types";
import { useState, useCallback, useRef } from "react";

const useTimer = () => {
  const elapsedTimeRef = useRef<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [timer, setTimer] = useState<Timer>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalSeconds: 0,
    state: TimerState.Idle,
  });

  const startTimer = useCallback(() => {
    console.log(timer);
    if (timer.totalSeconds === 0) return;
    elapsedTimeRef.current = 0;

    intervalRef.current = setInterval(() => {
      decrementTimerValues();

      setTimer((prevState) => {
        console.log(prevState);
        return { ...prevState, state: TimerState.Running };
      });
    }, 1000);
  }, [timer]);

  const resumeTimer = useCallback(() => {
    setTimer((currentTimerState) => {
      return { ...currentTimerState, state: TimerState.Running };
    });

    if (intervalRef.current === null) {
      startTimer();
    }
  }, [timer, startTimer]);

  const pauseTimer = useCallback(() => {
    setTimer((currentTimerState) => {
      return { ...currentTimerState, state: TimerState.Paused };
    });

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setTimer((currentTimerState) => {
      return {
        ...currentTimerState,
        hours: 0,
        minutes: 0,
        seconds: 0,
        totalSeconds: 0,
        state: TimerState.Idle,
      };
    });

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const decrementTimerValues = useCallback(() => {
    setTimer((currentTimerState) => {
      const newTotalSeconds =
        currentTimerState.totalSeconds > 1
          ? currentTimerState.totalSeconds - 1
          : 0;

      if (newTotalSeconds === 0) {
        stopTimer();
      }

      return {
        ...currentTimerState,
        hours: Math.floor(newTotalSeconds / 3600),
        minutes: Math.floor((newTotalSeconds % 3600) / 60),
        seconds: Math.floor(newTotalSeconds % 60),
        totalSeconds: newTotalSeconds,
      };
    });

    elapsedTimeRef.current += 1;
  }, [timer, stopTimer]);

  return {
    timer,
    setTimer,
    startTimer,
    pauseTimer,
    resumeTimer,
    stopTimer,
  };
};

export default useTimer;
