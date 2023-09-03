import { Timer, Option, InputType } from "../types";
import { useState, useEffect, useRef } from "react";

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
  const optionItemHeight = window.innerHeight * 0.05;
  const containerRef = useRef<HTMLUListElement>(null);
  const [centerItem, setCenterItem] = useState<number | null>(null);

  useEffect(() => {
    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const item = entry.target.textContent;
          setCenterItem(Number(item));
        }
      });
    };

    const options: IntersectionObserverInit = {
      root: containerRef.current,
      threshold: 0.5, // Adjust the threshold as needed
    };

    const observer = new IntersectionObserver(callback, options);

    const items = containerRef.current?.querySelectorAll("li");
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  const handleScroll = (
    e: React.UIEvent<HTMLUListElement>,
    type: InputType,
  ) => {
    e.preventDefault();
    setTimer((currentTimerState) => {
      const { hours, minutes, seconds } = {
        hours: Math.floor(currentTimerState.totalSeconds / 3600),
        minutes: Math.floor((currentTimerState.totalSeconds % 3600) / 60),
        seconds: Math.floor(currentTimerState.totalSeconds % 60),
      };
      let newTotalSeconds = 0;

      if (type === "hours") {
        newTotalSeconds = (centerItem || 0) * 3600 + minutes * 60 + seconds;
      } else if (type === "minutes") {
        newTotalSeconds = hours * 3600 + (centerItem || 0) * 60 + seconds;
      } else if (type === "seconds") {
        newTotalSeconds = hours * 3600 + minutes * 60 + (centerItem || 0);
      }

      const newValues = {
        ...currentTimerState,
        totalSeconds: newTotalSeconds,
      };

      console.log(centerItem, newValues);

      return newValues;
    });
  };

  const options = type === "hours" ? hourOptions : minuteSecondOptions;

  const scrollTo = (itemIndex: number | null) => {
    if (itemIndex === null) return;
    containerRef.current!.scrollTop = itemIndex * optionItemHeight;
  };

  return (
    <ul
      className="no-scrollbar relative flex h-[45vh] w-full snap-y snap-proximity flex-col overflow-y-scroll scroll-smooth py-[20vh]"
      onScroll={(e) => handleScroll(e, type)}
      ref={containerRef}
    >
      {options.map((option) => (
        <li
          className="flex snap-center items-center justify-center"
          key={`${option.key}-${option.value}`}
        >
          <button
            className="h-[5vh] w-full cursor-pointer py-1 text-center"
            onClick={() => {
              scrollTo(option.value);
            }}
          >
            <span>{option.value}</span>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ScrollPicker;
