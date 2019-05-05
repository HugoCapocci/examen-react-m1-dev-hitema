import React, { Component, FormEvent, Dispatch } from 'react';
import { connect } from 'react-redux';

import Display from './Display';
import { stopTimer } from '../actions/timer-actions';
import { ReduxState } from '../store';
import { TimerActionTypes } from '../action-types/timer-action-types';

export type UnitOfTime = 'hours' | 'minutes' | 'seconds';

export interface TimeState {
  hours: string;
  minutes: string;
  seconds: string;
  timeInterval?: any;
  unitOfTime?: UnitOfTime;
  status: 'stopped' | 'paused' | 'started';
}

interface DispatchProps {
  onStop: () => void;
}

interface StateProps {
  status: 'stopped' | 'paused' | 'started';
}

type Props = DispatchProps & StateProps;

class Timer extends Component<Props, TimeState> {
  interval: any;
  constructor(props: any) {
    super(props);
    this.state = {
      hours: '00',
      minutes: '00',
      seconds: '00',
      timeInterval: null,
      status: 'stopped',
    };
  }

  static getTotalMilliseconds = (state: TimeState) => {
    return (parseInt(state.hours) * 60 * 60
      + parseInt(state.minutes) * 60
      + parseInt(state.seconds)
    ) * 1000;
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  canStart() {
    return this.state.status === 'started' && this.state.timeInterval > 0;
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (!this.canStart()) {
        if (this.state.status === 'started') this.props.onStop();
        return;
      }
      this.setState((prevState) => {
        return { timeInterval: prevState.timeInterval - 10 };
      });
      if (this.state.timeInterval === 0) this.props.onStop();
    }, 10);
  }

  onInputChange = (unitOfTime: UnitOfTime) => (event: FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    if (isNaN(parseInt(value))) return;
    this.setState(prevState => {
      const state = {...prevState};
      state[unitOfTime] = parseInt(value).toString();
      return state;
    });
  }

  onBlur = (unitOfTime: UnitOfTime) => {
    this.setState((prevState) => {
      const state = { ...prevState };
      const previousValue = prevState[unitOfTime];
      if (['minutes', 'seconds'].includes(unitOfTime) && parseInt(previousValue) > 59) {
        state[unitOfTime] = '59';
      } else if (parseInt(previousValue) > 99) {
        state[unitOfTime] = '99';
      } else if (previousValue.length <2) {
        state[unitOfTime] = `0${previousValue}`;
      }
      return state;
    });
  }

  onFocus = (unitOfTime: UnitOfTime) => {
    this.setState({ unitOfTime });
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: TimeState) : TimeState {
    if (nextProps.status === prevState.status) return prevState;

    if (nextProps.status === 'started' && prevState.status !== 'paused') {
      const timeInterval = Timer.getTotalMilliseconds(prevState);
      return {
        ...prevState,
        timeInterval: timeInterval > 0 ? timeInterval : null,
        status: nextProps.status,
      }
    }
    
    if (nextProps.status === 'stopped') {
      return {
        hours: '00',
        minutes: '00',
        seconds: '00',
        timeInterval: null,
        status: nextProps.status,
      };
    }

    return {
      ...prevState,
      status: nextProps.status,
    };
  }

  render() {
    return (
      <div className="timer">
        <Display
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onInputChange={this.onInputChange}
          hours={this.state.hours}
          minutes={this.state.minutes}
          seconds={this.state.seconds}
          timeInterval={this.state.timeInterval} />
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState): StateProps => {
  return {
    status: state.status
  };
}

const mapDispatchToProps = (dispatch: Dispatch<TimerActionTypes>, ownProps: {}): DispatchProps => {
  return {
    onStop: () => {
      dispatch(stopTimer())
    }
  }
}

export default connect<StateProps, DispatchProps, {}, ReduxState>(
  mapStateToProps,
  mapDispatchToProps
)(Timer);
