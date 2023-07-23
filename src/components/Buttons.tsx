type Props = {
  isStartButtonVisible: boolean;
  isCancelButtonDisabled: boolean;
  handleCancelButtonClick: () => void;
  handleStartButtonClick: () => void;
  handlePauseButtonClick: () => void;
  isPauseButtonPressed: boolean;
};

const Buttons = ({
  isStartButtonVisible,
  isCancelButtonDisabled,
  handleCancelButtonClick,
  handleStartButtonClick,
  handlePauseButtonClick,
  isPauseButtonPressed,
}: Props) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <button
        {...(isCancelButtonDisabled ? { disabled: true } : {})}
        onClick={handleCancelButtonClick}
      >
        Cancel
      </button>
      {!isStartButtonVisible ? (
        <button onClick={handleStartButtonClick}>Start</button>
      ) : null}
      {isStartButtonVisible ? (
        <button onClick={handlePauseButtonClick}>
          {isPauseButtonPressed ? "Resume" : "Pause"}
        </button>
      ) : null}
    </div>
  );
};

export default Buttons;
