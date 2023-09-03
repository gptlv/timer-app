import { Timer, TimerState } from "../types";
import { useState, useRef } from "react";

const useTimer = () => {
  const [timer, setTimer] = useState<Timer>({
    totalSeconds: 0,
    state: TimerState.Idle,
  });

  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(
    undefined,
  );

  const startTimer = () => {
    if (timer.totalSeconds === 0 || timer.state === TimerState.Running) return;

    setTimer(() => ({
      ...timer,
      state: TimerState.Running,
    }));

    intervalRef.current = setInterval(() => {
      decrementTimer();
    }, 1000);
  };

  const pauseTimer = () => {
    setTimer(() => ({
      ...timer,
      state: TimerState.Paused,
    }));

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  };

  const resumeTimer = () => {
    setTimer(() => ({
      ...timer,
      state: TimerState.Running,
    }));

    if (intervalRef.current === undefined) {
      startTimer();
    }
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
    setTimer(() => ({
      totalSeconds: 0,
      state: TimerState.Idle,
    }));
  };

  const decrementTimer = () => {
    setTimer((currentTimerState) => {
      const newTotalSeconds =
        currentTimerState.totalSeconds > 0
          ? currentTimerState.totalSeconds - 1
          : 0;

      if (newTotalSeconds === 0) {
        console.log("Timer is done"); //TODO: add sound
        stopTimer();
      }

      console.log(`Current timer state: ${TimerState[timer.state]}`);

      return {
        ...currentTimerState,
        totalSeconds: newTotalSeconds,
      };
    });
  };

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
