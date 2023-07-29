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
    <>
      <div className="row-start-2 flex items-center justify-center md:row-start-1">
        <button
          {...(isCancelButtonDisabled ? { disabled: true } : {})}
          onClick={handleCancelButtonClick}
          className="h-[15vmax] w-[15vmax] rounded-full bg-gray-900 text-white "
        >
          Cancel
        </button>
      </div>
      <div className="row-start-2 flex items-center justify-center md:row-start-1">
        {!isStartButtonVisible ? (
          <button
            onClick={handleStartButtonClick}
            className="row-start-2 h-[15vmax] w-[15vmax] rounded-full bg-green-950 text-green-400 md:col-start-1 md:row-start-1"
          >
            Start
          </button>
        ) : null}

        {isStartButtonVisible ? (
          <button
            onClick={handlePauseResumeButtonClick}
            className="row-start-2 h-[15vmax] w-[15vmax] rounded-full bg-orange-900 text-orange-500 md:col-start-3 md:row-start-1"
          >
            {isPauseButtonPressed ? "Resume" : "Pause"}
          </button>
        ) : null}
      </div>
    </>
  );
};

export default Buttons;
