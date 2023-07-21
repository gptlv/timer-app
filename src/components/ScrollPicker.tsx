import { Option, InputType } from "../shared/types";
import { useEffect, useRef } from "react";
type Props = {
  handleScroll: (e: React.UIEvent<HTMLUListElement>, type: InputType) => void;
  options: Option[];
  inputIndex: number;
  type: InputType;
};

const ScrollPicker = ({ handleScroll, options, inputIndex, type }: Props) => {
  const ulRef = useRef<HTMLUListElement>(null);

  const scrollTo = (itemIndex: number | null) => {
    if (itemIndex === null) return;
    ulRef.current!.scrollTop = itemIndex * 28;
  };

  useEffect(() => {
    scrollTo(options[inputIndex].value);
  }, []);

  return (
    <ul
      className="bg-transparent max-h-[252px] no-scrollbar overflow-y-scroll scroll-smooth snap-y snap-proximity flex-col relative py-[112px]"
      onScroll={(e) => handleScroll(e, type)}
      ref={ulRef}
    >
      {options.map((option, index) => (
        <li
          className="snap-center h-[28px]"
          key={`${option.key}-${option.value}`}
        >
          <button
            className="text-left text-sm w-full px-2 py-1 cursor-pointer"
            onClick={() => {
              console.log(option.value);
              scrollTo(option.value);
            }}
          >
            <span className={index === inputIndex ? "font-bold" : ""}>
              {option.value}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ScrollPicker;
