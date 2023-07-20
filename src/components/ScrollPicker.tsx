import { Option, InputType } from "../shared/types";
type Props = {
  handleScroll: (e: React.UIEvent<HTMLUListElement>, type: InputType) => void;
  options: Option[];
  inputIndex: number;
  type: InputType;
};

const ScrollPicker = ({ handleScroll, options, inputIndex, type }: Props) => {
  return (
    <ul
      className="bg-transparent max-h-[252px] no-scrollbar overflow-y-scroll snap-y snap-proximity  flex-col relative"
      onScroll={(e) => handleScroll(e, type)}
    >
      {options.map((option, index) => (
        <li className="snap-center" key={`${option.key}-${option.value}`}>
          <button
            className="text-left text-sm w-full px-2 py-1 cursor-pointer"
            onClick={() => console.log(option.value)}
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
