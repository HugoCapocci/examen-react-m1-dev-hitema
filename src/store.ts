import { createStore } from 'redux';
import {  TimerActionTypes  } from './action-types/timer-action-types';

export interface ReduxState {
  status: 'stopped' | 'paused' | 'started';
}

const defaultState: ReduxState = {
  status: 'stopped'
}

function reducer(state = defaultState, action: TimerActionTypes): ReduxState {
  switch(action.type) {
    default: 
      return state;
  }
}

const store = createStore(
  reducer
  
);

export default store;
