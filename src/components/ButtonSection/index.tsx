import { TimerState, ButtonType } from "../../types";
import Button from "../Button";

type Props = {
  timerState: TimerState;
  startTimer: () => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  stopTimer: () => void;
};

const ButtonSection = ({
  timerState,
  startTimer,
  pauseTimer,
  resumeTimer,
  stopTimer,
}: Props) => {
  const buttonConfig = [
    {
      type: ButtonType.Start,
      action: startTimer,
      text: "Start",
      visible: timerState === TimerState.Idle,
    },
    {
      type: ButtonType.Pause,
      action: pauseTimer,
      text: "Pause",
      visible: timerState === TimerState.Running,
    },
    {
      type: ButtonType.Resume,
      action: resumeTimer,
      text: "Resume",
      visible: timerState === TimerState.Paused,
    },
  ];

  return (
    <>
      <div className="row-start-2 flex items-center justify-center md:row-start-1">
        <Button
          type={ButtonType.Cancel}
          action={stopTimer}
          timerState={timerState}
          visible={true}
        >
          Cancel
        </Button>
      </div>
      <div className="row-start-2 flex items-center justify-center md:row-start-1">
        {buttonConfig.map((button) => (
          <Button
            key={button.type}
            type={button.type}
            action={button.action}
            timerState={timerState}
            visible={button.visible}
          >
            {button.text}
          </Button>
        ))}
      </div>
    </>
  );
};

export default ButtonSection;
