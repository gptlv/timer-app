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
      className="h-[45vh] no-scrollbar overflow-y-scroll scroll-smooth snap-y snap-proximity flex flex-col relative py-[20vh]"
      onScroll={(e) => handleScroll(e, type)}
      ref={ulRef}
    >
      {options.map((option, index) => (
        <li className="snap-center" key={`${option.key}-${option.value}`}>
          <button
            className="w-1/3 py-1 cursor-pointer h-[5vh] flex"
            onClick={() => {
              console.log(option.value);
              scrollTo(option.value);
            }}
          >
            <span
              className={
                (index === inputIndex
                  ? "text-white font-bold "
                  : "text-gray-600 ") + "inline-block text-right w-full"
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
