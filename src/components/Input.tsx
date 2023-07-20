import { useState } from "react";
import { Time, Option, InputType } from "../shared/types";
import ScrollPicker from "./ScrollPicker";

type Props = {
  isInputDisabled: boolean;
  inputTime: Time;
  handleScroll: (e: React.UIEvent<HTMLUListElement>, type: InputType) => void;
};

const placeholderOptions: Option[] = [Array(8).keys()].map((i) => ({
  key: `placeholder-${i}`,
  value: null,
}));

const hourOptions: Option[] = [...Array(24).keys()].map((i) => ({
  key: i.toString(),
  value: i,
}));
const minuteSecondOptions: Option[] = [...Array(60).keys()].map((i) => ({
  key: i.toString(),
  value: i,
}));

const Input = ({ handleScroll }: Props) => {
  const [hourInputIndex, setHourInputIndex] = useState(4);
  const [minuteInputIndex, setMinuteInputIndex] = useState(4);
  const [secondInputIndex, setSecondInputIndex] = useState(4);

  // const handleScroll = (
  //   e: React.UIEvent<HTMLUListElement>,
  //   type: InputType
  // ) => {
  //   e.preventDefault();
  //   const container = e.currentTarget;
  //   const containerHeight = container.offsetHeight;
  //   const scrollPosition = container.scrollTop;
  //   const items = container.querySelectorAll("li");
  //   const itemHeight = items[0].offsetHeight;
  //   const centerIndex = Math.floor(
  //     (scrollPosition + containerHeight / 2) / itemHeight
  //   );
  //   const centerItem = items[centerIndex].textContent;
  //   setInputTime((prevState) => {
  //     return {
  //       ...prevState,
  //       [type]: currentValue,
  //       totalSeconds:
  //         prevState.hours * 3600 + prevState.minutes * 60 + prevState.seconds,
  //     };
  //   });
  // };

  return (
    <>
      {/* <input
        // {...(isInputDisabled ? { disabled: true } : {})}
        min="0"
        max="59"
        type="number"
        value={inputTime.hours}
        onChange={(e) => handleInputChange(e, "hours")}
      /> */}
      <div className="flex flex-row relative bg-black text-white backdrop-blur-lg drop-shadow-lg">
        <div className="w-1/3 z-[15]">
          <ScrollPicker
            handleScroll={handleScroll}
            options={hourOptions}
            inputIndex={hourInputIndex}
            type="hours"
          />
        </div>
        <div className="w-1/3 z-[15]">
          <ScrollPicker
            handleScroll={handleScroll}
            options={minuteSecondOptions}
            inputIndex={minuteInputIndex}
            type="minutes"
          />
        </div>
        <div className="w-1/3 z-[15]">
          <ScrollPicker
            handleScroll={handleScroll}
            options={minuteSecondOptions}
            inputIndex={secondInputIndex}
            type="seconds"
          />
        </div>
        <div className="absolute top-[112px] flex border-slate-950 border w-full h-[28px] justify-around  z-[-1] rounded-l  text-white bg-slate-400  bg-[50%]">
          <div>hours</div>
          <div>min</div>
          <div>sec</div>
        </div>
      </div>
      {/* <input
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
      /> */}
    </>
  );
};

export default Input;
