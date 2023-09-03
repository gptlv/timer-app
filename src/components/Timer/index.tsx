import { Timer } from "../../types";
import { useEffect, useRef, useState } from "react";

type Props = { timer: Timer };

const Timer = ({ timer }: Props) => {
  const [gradientDegrees, setGradientDegrees] = useState(360);
  const initialSeconds = useRef(timer.totalSeconds);
  const { hours, minutes, seconds } = {
    hours: Math.floor(timer.totalSeconds / 3600),
    minutes: Math.floor((timer.totalSeconds % 3600) / 60),
    seconds: Math.floor(timer.totalSeconds % 60),
  };

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
        {hours > 0 ? <span>{`${formatNumber(hours)}:`}</span> : null}
        <span>{`${formatNumber(minutes)}:`}</span>
        <span>{formatNumber(seconds)}</span>
      </div>
    </div>
  );
};

export default Timer;
