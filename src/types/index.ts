export type Timer = {
  totalSeconds: number;
  state: TimerState;
};

export type Option = {
  key: string;
  value: number | null;
};

export type InputType = "hours" | "minutes" | "seconds";

export type InputIndexes = {
  hours: number;
  minutes: number;
  seconds: number;
};

export enum ButtonType {
  Cancel,
  Start,
  Pause,
  Resume,
}

export enum TimerState {
  Idle,
  Running,
  Paused,
}
