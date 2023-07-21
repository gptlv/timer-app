import { Option, InputType, InputIndexes } from "../shared/types";
import ScrollPicker from "./ScrollPicker";

type Props = {
  handleScroll: (e: React.UIEvent<HTMLUListElement>, type: InputType) => void;
  inputIndexes: InputIndexes;
};

const hourOptions: Option[] = [...Array(24).keys()].map((i) => ({
  key: i.toString(),
  value: i,
}));

const minuteSecondOptions: Option[] = [...Array(60).keys()].map((i) => ({
  key: i.toString(),
  value: i,
}));

const Input = ({ handleScroll, inputIndexes }: Props) => {
  return (
    <>
      <div className="flex flex-row relative bg-black text-white backdrop-blur-lg ">
        <div className="w-1/3 z-[15]">
          <ScrollPicker
            handleScroll={handleScroll}
            options={hourOptions}
            inputIndex={inputIndexes.hours}
            type="hours"
          />
        </div>
        <div className="w-1/3 z-[15]">
          <ScrollPicker
            handleScroll={handleScroll}
            options={minuteSecondOptions}
            inputIndex={inputIndexes.minutes}
            type="minutes"
          />
        </div>
        <div className="w-1/3 z-[15]">
          <ScrollPicker
            handleScroll={handleScroll}
            options={minuteSecondOptions}
            inputIndex={inputIndexes.seconds}
            type="seconds"
          />
        </div>
        <div className="absolute top-[112px] flex border-slate-950 border w-full h-[28px] justify-around  z-[-1] rounded-l  text-white bg-slate-400  bg-[50%]">
          <div>hours</div>
          <div>min</div>
          <div>sec</div>
        </div>
      </div>
    </>
  );
};

export default Input;
