import { Time } from "../../types";
import { useEffect, useRef, useState } from "react";

type Props = { timer: Time };

const Timer = ({ timer }: Props) => {
  const [gradientDegrees, setGradientDegrees] = useState(360);
  const initialSeconds = useRef(timer.totalSeconds);

  useEffect(() => {
    setGradientDegrees(
      Math.round((timer.totalSeconds / initialSeconds.current) * 360),
    );
  }, [timer.totalSeconds]);

  const formatNumber = (num: number) => {
    return num.toString().padStart(2, "0");
  };

  //TODO: add transition on background change

  return (
    <div
      className="flex h-[35vmax] w-[35vmax] items-center justify-center rounded-full bg-gradient-to-tr from-orange-500 to-orange-100 text-[8vmax] text-white"
      style={{
        background: `conic-gradient(orange ${gradientDegrees}deg, rgb(17 24 39) 0deg)`,
        transition: "all 0.5s ease-in-out",
      }}
    >
      <div className="flex h-[34vmax] w-[34vmax] items-center justify-center rounded-full bg-black">
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
