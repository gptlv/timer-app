import Input from "./components/Input";
import Timer from "./components/Timer";
import ButtonSection from "./components/ButtonSection";
import useTimer from "./hooks/useTimer";
import { TimerState } from "./types";

const App = () => {
  const { timer, setTimer, startTimer, pauseTimer, resumeTimer, stopTimer } =
    useTimer();
  return (
    <div className="grid min-h-screen w-full bg-black px-1 sm:grid-cols-2 sm:grid-rows-2 md:grid-cols-[1fr_3fr_1fr]  md:grid-rows-1 md:gap-5 lg:grid-cols-[1fr_2fr_1fr] lg:gap-0">
      <div className="col-span-2 flex h-full w-full flex-col items-center justify-center md:col-auto md:col-start-2 md:row-start-1">
        <div className="flex w-full flex-col items-center justify-center">
          {timer.state === TimerState.Idle ? (
            <Input setTimer={setTimer} />
          ) : (
            <Timer timer={timer} />
          )}
        </div>
      </div>
      <ButtonSection
        timerState={timer.state}
        startTimer={startTimer}
        pauseTimer={pauseTimer}
        resumeTimer={resumeTimer}
        stopTimer={stopTimer}
      />
    </div>
  );
};

export default App;
