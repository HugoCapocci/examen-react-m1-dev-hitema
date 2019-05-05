import { createStore } from 'redux';
import {  TimerActionTypes, START_TIMER, STOP_TIMER, PAUSE_TIMER } from './action-types/timer-action-types';

export interface ReduxState {
  status: 'stopped' | 'paused' | 'started';
}

const defaultState: ReduxState = {
  status: 'stopped'
}

function reducer(state = defaultState, action: TimerActionTypes): ReduxState{
  switch(action.type) {
    case START_TIMER:
      return {
        ...state,
        status: 'started'
      };
    case STOP_TIMER:
      return {
        ...state,
        status: 'stopped'
      };
    case PAUSE_TIMER:
      return {
        ...state,
        status: 'paused'
      };
    default: 
      return state;
  }
}

const store = createStore(
  reducer,
  // @ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
