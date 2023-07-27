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
    <div className="h-screen w-full flex flex-col items-center justify-center bg-black">
      <div className="w-4/5 text-[3.5vh] leading-[3.5vh] flex flex-col items-center justify-center">
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
          handlePauseResumeButtonClick={handlePauseResumeButtonClick}
          isPauseButtonPressed={isPauseButtonPressed}
        />
      </div>
    </div>
  );
};

export default App;
