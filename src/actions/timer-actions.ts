import {START_TIMER, STOP_TIMER, PAUSE_TIMER, TimerActionTypes} from '../action-types/timer-action-types';

export const startTimer = (): TimerActionTypes  => {
    return {
        type: START_TIMER
    }
}

export const pauseTimer = (): TimerActionTypes => {
    return {
        type: PAUSE_TIMER
    }
}

export const stopTimer = (): TimerActionTypes => {
    return {
        type: STOP_TIMER
    }
}