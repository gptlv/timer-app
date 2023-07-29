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
      <div className="relative grid w-full grid-cols-[1fr_2fr_1fr] grid-rows-1 bg-black text-lg leading-[3.5vh] text-white backdrop-blur-lg md:text-xl">
        <div className="z-[15]">
          <ScrollPicker
            handleScroll={handleScroll}
            options={hourOptions}
            inputIndex={inputIndexes.hours}
            type="hours"
            optionItemHeight={optionItemHeight}
          />
        </div>
        <div className="z-[15]">
          <ScrollPicker
            handleScroll={handleScroll}
            options={minuteSecondOptions}
            inputIndex={inputIndexes.minutes}
            type="minutes"
            optionItemHeight={optionItemHeight}
          />
        </div>
        <div className="z-[15]">
          <ScrollPicker
            handleScroll={handleScroll}
            options={minuteSecondOptions}
            inputIndex={inputIndexes.seconds}
            type="seconds"
            optionItemHeight={optionItemHeight}
          />
        </div>
        <div className="absolute top-[20vh]  z-[-1] flex h-[5vh] w-full items-center  border-slate-950  bg-gray-900 bg-[50%]  text-white">
          <div className="basis-1/3 text-right">
            <span className="">hours</span>
          </div>
          <div className="basis-1/3 text-center">
            <span>min</span>
          </div>
          <div className="basis-1/3 text-right">
            <span>sec</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Input;
