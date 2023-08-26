import { Timer, TimerState } from "../types";
import { useState, useCallback, useRef } from "react";

const useTimer = () => {
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const [timer, setTimer] = useState<Timer>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalSeconds: 0,
    state: TimerState.Idle,
  });

  const startTimer = useCallback(() => {
    if (timer.totalSeconds === 0 || timer.state === TimerState.Running) return;

    setTimer((currentTimerState) => ({
      ...currentTimerState,
      state: TimerState.Running,
    }));

    intervalRef.current = setInterval(() => {
      decrementTimerValues();
    }, 1000);
  }, [timer]);

  const resumeTimer = useCallback(() => {
    setTimer((currentTimerState) => {
      return { ...currentTimerState, state: TimerState.Running };
    });

    if (intervalRef.current === undefined) {
      startTimer();
    }
  }, [timer]);

  const pauseTimer = useCallback(() => {
    setTimer((currentTimerState) => {
      return { ...currentTimerState, state: TimerState.Paused };
    });

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  }, [timer]);

  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
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
  }, [timer]);

  const decrementTimerValues = useCallback(() => {
    setTimer((currentTimerState) => {
      const newTotalSeconds =
        currentTimerState.totalSeconds > 0
          ? currentTimerState.totalSeconds - 1
          : 0;

      if (newTotalSeconds === 0) {
        console.log("Timer is done"); //TODO: add sound
        stopTimer();
      }

      console.log(timer.state);

      return {
        ...currentTimerState,
        hours: Math.floor(newTotalSeconds / 3600),
        minutes: Math.floor((newTotalSeconds % 3600) / 60),
        seconds: Math.floor(newTotalSeconds % 60),
        totalSeconds: newTotalSeconds,
      };
    });
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
