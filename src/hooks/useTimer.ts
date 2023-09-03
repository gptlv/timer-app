import { Timer, TimerState } from "../types";
import { useState, useRef } from "react";

const clearIntervalRef = (
  intervalRef: React.MutableRefObject<
    ReturnType<typeof setInterval> | undefined
  >,
) => {
  if (intervalRef.current) {
    clearInterval(intervalRef.current);
    intervalRef.current = undefined;
  }
};

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

    setTimer({
      ...timer,
      state: TimerState.Running,
    });

    intervalRef.current = setInterval(() => {
      decrementTimer();
    }, 1000);
  };

  const pauseTimer = () => {
    if (timer.state !== TimerState.Running) return;
    clearIntervalRef(intervalRef);

    setTimer({
      ...timer,
      state: TimerState.Paused,
    });
  };

  const resumeTimer = () => {
    if (timer.state !== TimerState.Paused) return;
    setTimer({ ...timer, state: TimerState.Running });

    if (!intervalRef.current) {
      startTimer();
    }
  };

  const stopTimer = () => {
    clearIntervalRef(intervalRef);

    setTimer({
      totalSeconds: 0,
      state: TimerState.Idle,
    });
  };

  const decrementTimer = () => {
    setTimer((currentTimer) => {
      const newTotalSeconds = Math.max(0, currentTimer.totalSeconds - 1);

      if (newTotalSeconds === 0) {
        clearIntervalRef(intervalRef);
        return { state: TimerState.Idle, totalSeconds: 0 };
      }

      return { ...currentTimer, totalSeconds: newTotalSeconds };
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
