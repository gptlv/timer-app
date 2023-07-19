// import { useCallback } from "react";
import { Time } from "../shared/types";

type Props = {
  isInputDisabled: boolean;
  inputTime: Time;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "hours" | "minutes" | "seconds"
  ) => void;
};

const Input = ({ inputTime, handleInputChange }: Props) => {
  return (
    <div>
      <input
        // {...(isInputDisabled ? { disabled: true } : {})}
        min="0"
        max="59"
        type="number"
        value={inputTime.hours}
        onChange={(e) => handleInputChange(e, "hours")}
      />
      <input
        // {...(isInputDisabled ? { disabled: true } : {})}
        min="0"
        max="59"
        type="number"
        value={inputTime.minutes}
        onChange={(e) => handleInputChange(e, "minutes")}
      />
      <input
        // {...(isInputDisabled ? { disabled: true } : {})}
        min="0"
        max="59"
        type="number"
        value={inputTime.seconds}
        onChange={(e) => handleInputChange(e, "seconds")}
      />
    </div>
  );
};

export default Input;
