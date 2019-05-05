export const START_TIMER = 'START_TIMER';
export const PAUSE_TIMER = 'PAUSE_TIMER';
export const STOP_TIMER = 'STOP_TIMER';

interface StartTimerAction {
  type: typeof START_TIMER;
}

interface PauseTimerAction {
  type: typeof PAUSE_TIMER;
}

interface StopTimerAction {
  type: typeof STOP_TIMER;
}

export type TimerActionTypes = 
  StartTimerAction |
  PauseTimerAction |
  StopTimerAction;
