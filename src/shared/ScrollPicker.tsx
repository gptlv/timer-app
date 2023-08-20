import { Timer, Option, InputType } from "../types";
import { useState, useRef } from "react";

type Props = {
  setTimer: React.Dispatch<React.SetStateAction<Timer>>;
  type: InputType;
};

const hourOptions: Option[] = [...Array(24).keys()].map((i) => ({
  key: i.toString(),
  value: i,
}));

const minuteSecondOptions: Option[] = [...Array(60).keys()].map((i) => ({
  key: i.toString(),
  value: i,
}));

const ScrollPicker = ({ setTimer, type }: Props) => {
  const [optionItemHeight, setOptionItemHeight] = useState<number>(
    window.innerHeight * 0.05,
  );
  const handleScroll = (
    e: React.UIEvent<HTMLUListElement>,
    type: InputType,
  ) => {
    e.preventDefault();
    const container = e.currentTarget;
    const items = container.querySelectorAll("li");
    const itemHeight = items[0].offsetHeight;
    setOptionItemHeight(itemHeight);
    const centerIndex = Math.trunc(
      container.scrollTop / Math.floor(items[0].getBoundingClientRect().height),
    );
    if (centerIndex < 0 || centerIndex >= items.length) return;

    const centerItem = Number(items[centerIndex].textContent ?? 0);

    setTimer((currentTimerState) => {
      const newValues = {
        ...currentTimerState,
        [type]: centerItem,
        totalSeconds:
          currentTimerState.hours * 3600 +
          currentTimerState.minutes * 60 +
          currentTimerState.seconds,
      };
      console.log(newValues);
      return {
        ...currentTimerState,
        [type]: centerItem,
        totalSeconds:
          currentTimerState.hours * 3600 +
          currentTimerState.minutes * 60 +
          currentTimerState.seconds,
      };
    });
  };

  const options = type === "hours" ? hourOptions : minuteSecondOptions;
  const ulRef = useRef<HTMLUListElement>(null);
  const scrollTo = (itemIndex: number | null) => {
    if (itemIndex === null) return;
    ulRef.current!.scrollTop = itemIndex * optionItemHeight; // adjust scrollTop for padding
  };

  // useEffect(() => {
  //   scrollTo(options[inputIndex].value);
  // }, []);

  return (
    <ul
      className="no-scrollbar relative flex h-[45vh] w-full snap-y snap-proximity flex-col overflow-y-scroll scroll-smooth py-[20vh]"
      onScroll={(e) => handleScroll(e, type)}
      ref={ulRef}
    >
      {options.map((option) => (
        <li
          className="flex snap-center items-center justify-center"
          key={`${option.key}-${option.value}`}
        >
          <button
            className={
              "h-[5vh] w-full cursor-pointer py-1 text-center"
              // + (type === "minutes" ? "text-center" : "text-center")
            }
            onClick={() => {
              scrollTo(option.value);
            }}
          >
            <span
            // className={
            //   index === inputIndex ? "font-bold text-white" : "text-gray-600 "
            // }
            >
              {option.value}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ScrollPicker;
