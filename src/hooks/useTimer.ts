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
    if (timer.state === TimerState.Running) return;
    elapsedTimeRef.current = 0;

    setTimer((prevState) => {
      console.log(prevState);
      return { ...prevState, state: TimerState.Running };
    });

    intervalRef.current = setTimeout(function tick() {
      decrementTimerValues();
      intervalRef.current = setTimeout(tick, 1000);
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
  }, [timer]);

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
