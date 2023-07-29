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
    <div className="grid min-h-screen w-full gap-0 sm:grid-cols-2 sm:grid-rows-2 md:grid-cols-[1fr_3fr_1fr] md:grid-rows-1">
      <div className="col-span-2 flex h-full w-full flex-col items-center justify-center md:col-auto md:col-start-2 md:row-start-1">
        <div className="flex w-4/5 flex-col items-center justify-center">
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

      {/* <div className="h-1/2 w-4/5 flex-col items-center justify-between"> */}
      {/* <div className="w-full h-full flex justify-between items-center text-[2.5vh]"> */}
      <Buttons
        isStartButtonVisible={isStartButtonVisible}
        isCancelButtonDisabled={isCancelButtonDisabled}
        handleStartButtonClick={handleStartButtonClick}
        handleCancelButtonClick={handleCancelButtonClick}
        handlePauseResumeButtonClick={handlePauseResumeButtonClick}
        isPauseButtonPressed={isPauseButtonPressed}
      />
      {/* </div> */}
      {/* </div> */}
    </div>
  );
};

export default App;
