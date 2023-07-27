type Props = {
  isStartButtonVisible: boolean;
  isCancelButtonDisabled: boolean;
  handleCancelButtonClick: () => void;
  handleStartButtonClick: () => void;
  handlePauseResumeButtonClick: () => void;
  isPauseButtonPressed: boolean;
};

const Buttons = ({
  isStartButtonVisible,
  isCancelButtonDisabled,
  handleCancelButtonClick,
  handleStartButtonClick,
  handlePauseResumeButtonClick,
  isPauseButtonPressed,
}: Props) => {
  return (
    <div className="w-full h-full flex justify-between items-center text-[2.5vh]">
      <button
        {...(isCancelButtonDisabled ? { disabled: true } : {})}
        onClick={handleCancelButtonClick}
        className="rounded-full w-[15vh] h-[15vh] bg-gray-900 text-white"
      >
        Cancel
      </button>
      {!isStartButtonVisible ? (
        <button
          onClick={handleStartButtonClick}
          className="rounded-full w-[15vh] h-[15vh] bg-green-950 text-green-400"
        >
          Start
        </button>
      ) : null}
      {isStartButtonVisible ? (
        <button
          onClick={handlePauseResumeButtonClick}
          className="rounded-full w-[15vh] h-[15vh] bg-orange-900 text-orange-500"
        >
          {isPauseButtonPressed ? "Resume" : "Pause"}
        </button>
      ) : null}
    </div>
  );
};

export default Buttons;
