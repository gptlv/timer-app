import { Option, InputType, InputIndexes } from "../../types";
import ScrollPicker from "../../shared/ScrollPicker";

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
            optionItemHeight={optionItemHeight}
          />
        </div>
        <div className="w-1/3 z-[15]">
          <ScrollPicker
            handleScroll={handleScroll}
            options={minuteSecondOptions}
            inputIndex={inputIndexes.seconds}
            type="seconds"
            optionItemHeight={optionItemHeight}
          />
        </div>
        <div className="absolute top-[20vh] text-[2.5vh] font-bold leading-[5vh] flex border-slate-950  w-full h-[5vh] justify-around  z-[-1]  text-white bg-gray-900  bg-[50%]">
          <div className="ml-2">hours</div>
          <div className="">min</div>
          <div className="">sec</div>
        </div>
      </div>
    </>
  );
};

export default Input;
