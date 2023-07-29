import Input from "./components/Input";
import Timer from "./components/Timer";
import Buttons from "./components/Buttons";
import useTimer from "./hooks/useTimer";

type Props = {};

const App = ({}: Props) => {
  const {
    timer,
    isInputDisabled,
    isStartButtonVisible,
    isCancelButtonDisabled,
    isPauseButtonPressed,
    handleStartButtonClick,
    handleCancelButtonClick,
    handlePauseResumeButtonClick,
    handleScroll,
    inputIndexes,
    optionItemHeight,
  } = useTimer();
  return (
    <div className="grid min-h-screen w-full bg-black px-1 sm:grid-cols-2 sm:grid-rows-2 md:grid-cols-[1fr_3fr_1fr]  md:grid-rows-1 md:gap-5 lg:grid-cols-[1fr_2fr_1fr] lg:gap-0">
      <div className="col-span-2 flex h-full w-full flex-col items-center justify-center md:col-auto md:col-start-2 md:row-start-1">
        <div className="flex w-full flex-col items-center justify-center">
          {!isInputDisabled ? (
            <Input
              handleScroll={handleScroll}
              inputIndexes={inputIndexes}
              optionItemHeight={optionItemHeight}
            />
          ) : null}
          {isInputDisabled ? <Timer timer={timer} /> : null}
        </div>
      </div>
      <Buttons
        isStartButtonVisible={isStartButtonVisible}
        isCancelButtonDisabled={isCancelButtonDisabled}
        handleStartButtonClick={handleStartButtonClick}
        handleCancelButtonClick={handleCancelButtonClick}
        handlePauseResumeButtonClick={handlePauseResumeButtonClick}
        isPauseButtonPressed={isPauseButtonPressed}
      />
    </div>
  );
};

export default App;
