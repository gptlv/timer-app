import { Option, InputType } from "../types";
import { useEffect, useRef } from "react";

type Props = {
  handleScroll: (e: React.UIEvent<HTMLUListElement>, type: InputType) => void;
  options: Option[];
  inputIndex: number;
  type: InputType;
  optionItemHeight: number;
};

const ScrollPicker = ({
  handleScroll,
  options,
  inputIndex,
  type,
  optionItemHeight,
}: Props) => {
  const ulRef = useRef<HTMLUListElement>(null);

  const scrollTo = (itemIndex: number | null) => {
    if (itemIndex === null) return;
    ulRef.current!.scrollTop = itemIndex * optionItemHeight; // adjust scrollTop for padding
  };

  useEffect(() => {
    scrollTo(options[inputIndex].value);
  }, []);

  return (
    <ul
      className="no-scrollbar relative flex h-[45vh] w-full snap-y snap-proximity flex-col overflow-y-scroll scroll-smooth py-[20vh]"
      onScroll={(e) => handleScroll(e, type)}
      ref={ulRef}
    >
      {options.map((option, index) => (
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
              console.log(option.value);
              scrollTo(option.value);
            }}
          >
            <span
              className={
                index === inputIndex ? "font-bold text-white" : "text-gray-600 "
              }
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
