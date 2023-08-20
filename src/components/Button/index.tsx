import { TimerState, ButtonType } from "../../types";

type Props = {
  type: ButtonType;
  action: () => void;
  timerState: TimerState;
  visible: boolean;
  children: React.ReactNode;
};

const DEFAULT_BUTTON_STYLE = "h-[15vmax] w-[15vmax] rounded-full ";
const BUTTON_STYLES = {
  [ButtonType.Start]: "bg-green-500 text-white",
  [ButtonType.Pause]: "bg-yellow-500 text-white",
  [ButtonType.Resume]: "bg-green-500 text-white",
  [ButtonType.Cancel]: "bg-gray-900 text-white",
};

const Button = ({ type, action, timerState, visible, children }: Props) => {
  if (!visible) {
    return null;
  }

  const buttonStyle = DEFAULT_BUTTON_STYLE + BUTTON_STYLES[type];

  return (
    <button
      onClick={action}
      className={buttonStyle}
      disabled={type === ButtonType.Cancel && timerState === TimerState.Idle}
    >
      {children}
    </button>
  );
};

export default Button;
