import { useState, useEffect, useCallback, useRef } from "react";
import Input from "./components/Input";
import Timer from "./components/Timer";
import Buttons from "./components/Buttons";
import { Time, InputType, InputIndexes } from "./shared/types";

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

  const [inputIndexes, setInputIndexes] = useState<InputIndexes>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [scrollPositions, setScrollPositions] = useState<InputIndexes>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  }); //?

  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(false);
  const [isStartButtonVisible, setIsStartButtonVisible] =
    useState<boolean>(false);
  const [isCancelButtonDisabled, setIsCancelButtonDisabled] =
    useState<boolean>(false);
  const [isPauseButtonPressed, setIsPauseButtonPressed] =
    useState<boolean>(false);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [optionItemHeight, setOptionItemHeight] = useState<number>(0);
  const elapsedTimeRef = useRef<number>(0);

  const handleScroll = (
    e: React.UIEvent<HTMLUListElement>,
    type: InputType
  ) => {
    e.preventDefault();
    const container = e.currentTarget;
    const containerHeight = container.offsetHeight;
    const items = container.querySelectorAll("li");
    const itemHeight = items[0].offsetHeight;
    setOptionItemHeight(itemHeight);
    const scrollPosition = container.scrollTop - 4 * itemHeight; //4 elements gap before and after options
    setScrollPositions((prevState) => {
      return {
        ...prevState,
        [type]: scrollPosition,
      };
    });
    const centerIndex = Math.floor(
      (scrollPosition + containerHeight / 2) / itemHeight
    );
    setInputIndexes((prevState) => {
      return {
        ...prevState,
        [type]: centerIndex,
      };
    });
    const centerItem = Number(items[centerIndex].textContent ?? 0);
    setInputTime((prevState) => {
      return {
        ...prevState,
        [type]: centerItem,
        totalSeconds:
          prevState.hours * 3600 + prevState.minutes * 60 + prevState.seconds,
      };
    });
  };

  const handleStartButtonClick = useCallback(() => {
    const { hours, minutes, seconds } = inputTime;
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    const newTimer = { hours, minutes, seconds, totalSeconds };

    setIsStartButtonVisible(true);
    setIsCancelButtonDisabled(false);
    setIsTimerRunning(true);
    setIsInputDisabled(true);
    elapsedTimeRef.current = 0;

    setTimer(newTimer);
  }, [inputTime]);

  const handleCancelButtonClick = useCallback(() => {
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
  }, []);

  const resumeTimer = useCallback(() => {
    setIsTimerRunning(true);
  }, []);

  const pauseTimer = useCallback(() => {
    setIsTimerRunning(false);
  }, []);

  const handlePauseButtonClick = useCallback(() => {
    if (isPauseButtonPressed) {
      setIsPauseButtonPressed(false);
      resumeTimer();
    } else {
      setIsPauseButtonPressed(true);
      pauseTimer();
    }
  }, [isPauseButtonPressed, pauseTimer, resumeTimer]);

  const handleTimerFinish = useCallback(() => {
    setIsTimerRunning(false);
    handleCancelButtonClick();
  }, [handleCancelButtonClick]);

  const decrementTimerValues = useCallback(() => {
    setTimer((currentTimerValue) => {
      const newTotalSeconds =
        currentTimerValue.totalSeconds > 1
          ? currentTimerValue.totalSeconds - 1
          : 0;

      if (newTotalSeconds === 0) {
        handleTimerFinish();
      }

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
      }, 1000);

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
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <div className="w-4/5 text-[3.5vh] leading-[3.5vh]">
        {!isInputDisabled ? (
          <Input
            handleScroll={handleScroll}
            inputIndexes={inputIndexes}
            optionItemHeight={optionItemHeight}
          />
        ) : (
          ""
        )}

        {isInputDisabled ? <Timer timer={timer} /> : ""}
      </div>

      <div className="h-1/2 w-4/5 flex-col items-center justify-between">
        <Buttons
          isStartButtonVisible={isStartButtonVisible}
          isCancelButtonDisabled={isCancelButtonDisabled}
          handleStartButtonClick={handleStartButtonClick}
          handleCancelButtonClick={handleCancelButtonClick}
          handlePauseButtonClick={handlePauseButtonClick}
          isPauseButtonPressed={isPauseButtonPressed}
        />
      </div>
    </div>
  );
};

export default App;
