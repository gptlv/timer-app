import { Time } from "../shared/types";

type Props = { timer: Time };

const Timer = ({ timer }: Props) => {
  const formatNumber = (num: number) => {
    return num.toString().padStart(2, "0");
  };

  return (
    <div>
      {timer.hours > 0 ? <span>{`${formatNumber(timer.hours)}:`}</span> : null}
      <span>{`${formatNumber(timer.minutes)}:`}</span>
      <span>{formatNumber(timer.seconds)}</span>
    </div>
  );
};

export default Timer;
