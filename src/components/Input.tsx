import { Option, InputType, InputIndexes } from "../shared/types";
import ScrollPicker from "./ScrollPicker";

type Props = {
  handleScroll: (e: React.UIEvent<HTMLUListElement>, type: InputType) => void;
  inputIndexes: InputIndexes;
  optionItemHeight: number;
};

const hourOptions: Option[] = [...Array(24).keys()].map((i) => ({
  key: i.toString(),
  value: i,
}));

const minuteSecondOptions: Option[] = [...Array(60).keys()].map((i) => ({
  key: i.toString(),
  value: i,
}));

const Input = ({ handleScroll, inputIndexes, optionItemHeight }: Props) => {
  return (
    <>
      <div className="flex w-full flex-row relative bg-black text-white backdrop-blur-lg ">
        <div className="w-1/3 z-[15]">
          <ScrollPicker
            handleScroll={handleScroll}
            options={hourOptions}
            inputIndex={inputIndexes.hours}
            type="hours"
            optionItemHeight={optionItemHeight}
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
        <div className="absolute top-[0%] text-[2.5vh] font-bold leading-[5vh] flex border-slate-950  w-full h-[5vh] justify-around  z-[-1]  text-white bg-slate-400  bg-[50%]">
          <div className="ml-2">hours</div>
          <div className="">min</div>
          <div className="">sec</div>
        </div>
      </div>
    </>
  );
};

export default Input;
