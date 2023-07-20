export type Time = {
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
};

export type Option = {
  key: string;
  value: number | null;
};

export type InputType = "hours" | "minutes" | "seconds";
