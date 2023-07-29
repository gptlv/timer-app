import { Time } from "../../types";

type Props = { timer: Time };

const Timer = ({ timer }: Props) => {
  const formatNumber = (num: number) => {
    return num.toString().padStart(2, "0");
  };

  return (
    <div
      className="flex h-[45vmax] w-[45vmax] items-center justify-center rounded-full bg-gray-900 text-[10vmax] text-white"
      // style={{
      //   background: `conic-gradient(#ffa500_${(100).toFixed(
      //     2
      //   )}deg,#ededed_360deg)}`,
      // }}
    >
      <div>
        {timer.hours > 0 ? (
          <span>{`${formatNumber(timer.hours)}:`}</span>
        ) : null}
        <span>{`${formatNumber(timer.minutes)}:`}</span>
        <span>{formatNumber(timer.seconds)}</span>
      </div>
    </div>
  );
};

export default Timer;
