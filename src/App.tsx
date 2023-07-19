import { useState, useEffect, useCallback, useRef } from "react";
import Input from "./components/Input";
import Timer from "./components/Timer";
import Buttons from "./components/Buttons";
import { Time } from "./shared/types";

type Props = {};

const App = ({}: Props) => {
  const [timer, setTimer] = useState<Time>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalSeconds: 0,
  });

  const [inputTime, setInputTime] = useState<Time>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalSeconds: 0,
  });

  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(false);
  const [isStartButtonVisible, setIsStartButtonVisible] =
    useState<boolean>(false);
  const [isCancelButtonDisabled, setIsCancelButtonDisabled] =
    useState<boolean>(false);
  const [isPauseButtonPressed, setIsPauseButtonPressed] =
    useState<boolean>(false);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const elapsedTimeRef = useRef<number>(0);

  const handleInputChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement>,
      type: "hours" | "minutes" | "seconds"
    ) => {
      const currentValue = parseInt(e.target.value) || 0;
      if (isNaN(currentValue)) return;

      setInputTime((prevState) => {
        return {
          ...prevState,
          [type]: currentValue,
          totalSeconds:
            prevState.hours * 3600 + prevState.minutes * 60 + prevState.seconds,
        };
      });
    },
    []
  );

  const handleStartButtonClick = () => {
    const { hours, minutes, seconds } = inputTime;
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    const newTimer = { hours, minutes, seconds, totalSeconds };

    setIsStartButtonVisible(true);
    setIsCancelButtonDisabled(false);
    setIsTimerRunning(true);
    setIsInputDisabled(true);
    elapsedTimeRef.current = 0;

    setTimer(newTimer);
  };

  const handleCancelButtonClick = () => {
    setIsCancelButtonDisabled(true);
    setIsInputDisabled(false);
    setIsStartButtonVisible(false);
    setIsTimerRunning(false);
    setIsPauseButtonPressed(false);
    setTimer({
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalSeconds: 0,
    });
  };

  const resumeTimer = () => {
    // setIsInputDisabled(true);
    setIsTimerRunning(true);
    // setTimer((prevState) => {
    //   const currentTotalSeconds =
    //     prevState.totalSeconds + elapsedTimeRef.current;
    //   return {
    //     ...prevState,
    //     hours: Math.floor(currentTotalSeconds / 3600),
    //     minutes: Math.floor((currentTotalSeconds % 3600) / 60),
    //     seconds: Math.floor(currentTotalSeconds % 60),
    //     totalSeconds: currentTotalSeconds,
    //   };
    // });
  };

  const pauseTimer = () => {
    // setIsCancelButtonDisabled(false);
    // setIsInputDisabled(false);
    setIsTimerRunning(false);
  };

  const handlePauseButtonClick = () => {
    if (isPauseButtonPressed) {
      setIsPauseButtonPressed(false);
      resumeTimer();
    } else {
      setIsPauseButtonPressed(true);
      pauseTimer();
    }
  };
  const decrementTimerValues = useCallback(() => {
    setTimer((currentTimerValue) => {
      const newTotalSeconds =
        currentTimerValue.totalSeconds > 1
          ? currentTimerValue.totalSeconds - 1
          : 0;

      return {
        hours: Math.floor(newTotalSeconds / 3600),
        minutes: Math.floor((newTotalSeconds % 3600) / 60),
        seconds: Math.floor(newTotalSeconds % 60),
        totalSeconds: newTotalSeconds,
      };
    });

    elapsedTimeRef.current += 1;
  }, []);

  useEffect(() => {
    if (isTimerRunning) {
      const id = setInterval(() => {
        decrementTimerValues();
        setTimer((prevState) => {
          console.log(prevState);
          return { ...prevState };
        });
      }, 100);

      return () => clearInterval(id);
    }
  }, [isTimerRunning, decrementTimerValues]);

  useEffect(() => {
    if (isTimerRunning && isPauseButtonPressed) {
      setTimer((prevState) => {
        const currentTotalSeconds =
          prevState.hours * 3600 +
          prevState.minutes * 60 +
          prevState.seconds -
          elapsedTimeRef.current;

        return {
          ...prevState,
          hours: Math.floor(currentTotalSeconds / 3600),
          minutes: Math.floor((currentTotalSeconds % 3600) / 60),
          seconds: Math.floor(currentTotalSeconds % 60),
          totalSeconds: currentTotalSeconds,
        };
      });
    }
  }, [isTimerRunning]);

  return (
    <div>
      {!isInputDisabled ? (
        <Input
          isInputDisabled={isInputDisabled}
          inputTime={inputTime}
          handleInputChange={handleInputChange}
        />
      ) : (
        ""
      )}

      {isInputDisabled ? <Timer timer={timer} /> : ""}

      <Buttons
        isStartButtonVisible={isStartButtonVisible}
        isCancelButtonDisabled={isCancelButtonDisabled}
        handleStartButtonClick={handleStartButtonClick}
        handleCancelButtonClick={handleCancelButtonClick}
        handlePauseButtonClick={handlePauseButtonClick}
        isPauseButtonPressed={isPauseButtonPressed}
      />
    </div>
  );
};

export default App;
