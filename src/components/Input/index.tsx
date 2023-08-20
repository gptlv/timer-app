import ScrollPicker from "../../shared/ScrollPicker";
import { Timer } from "../../types";

type Props = {
  setTimer: React.Dispatch<React.SetStateAction<Timer>>;
};

const Input = ({ setTimer }: Props) => {
  return (
    <>
      <div className="relative grid w-full grid-cols-[1fr_1fr_1fr] grid-rows-1 bg-black text-base leading-[3.5vh] text-white backdrop-blur-lg md:text-xl">
        <div className="z-[15]">
          <ScrollPicker setTimer={setTimer} type="hours" />
        </div>
        <div className="z-[15]">
          <ScrollPicker setTimer={setTimer} type="minutes" />
        </div>
        <div className="z-[15]">
          <ScrollPicker setTimer={setTimer} type="seconds" />
        </div>
        {/* move to a new component */}
        <div className="absolute top-[20vh]  z-[-1] flex h-[5vh] w-full items-center  border-slate-950  bg-gray-900 bg-[50%]  text-white">
          <div className="basis-1/3 text-right">
            <span className="md:pr-1">hours</span>
          </div>
          <div className="basis-1/3 text-center">
            <span className="pl-14 md:pl-16">min</span>
          </div>
          <div className="basis-1/3 text-right">
            <span className="pr-3 md:pr-6">sec</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Input;
