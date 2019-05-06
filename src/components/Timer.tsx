import React, { Component, FormEvent } from 'react';
import { ReduxState } from '../store';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import Display from './Display';
import {TimerActionTypes} from "../action-types/timer-action-types";
import { stopTimer} from "../actions/timer-actions";
import {ControlsProps} from "./Controls";

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
  //onStop: () => void;
  ownStopTimer: () => void;
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

  setMinutes(minutes: number) {
    if (minutes < 0) {
      this.setState(() => ({ minutes: '00' }));
    } else {
      this.setState((prevState) => {
        minutes = parseInt(this.formatTime(parseInt(prevState.minutes) + minutes));
        if (minutes < 60) {
          if (parseInt(minutes.toString()[0]) > 5) {
            minutes = 59;
          }
        } else if (minutes > 59) {
          minutes = parseInt(minutes.toString().slice(minutes.toString().length - 1));
        }
        return { minutes: this.formatTime(minutes) };
      });
    }
  }

  setSeconds(seconds: number) {
    if (seconds < 0) {
      this.setState(() => ({ seconds: '00' }));
    } else {
      this.setState((prevState) => {
        seconds = parseInt(this.formatTime(parseInt(prevState.seconds) + seconds));

        if (seconds < 60) {
          if (parseInt(seconds.toString()[0]) > 5) {
            seconds = 59;
          }
        } else if (seconds > 59) {
          seconds = parseInt(seconds.toString().slice(seconds.toString().length - 1));
        }

        return { seconds: this.formatTime(seconds) };
      });
    }
  }

  setSix(s:number):string{
    if (s<0){ return '00';}
    if (s<10){return '0'+s;}
    if (s<60) {return s.toString()}
    return '59';
  }

  setNine(n:number):string{
    if (n<0){ return '00';}
    if (n<10){return '0'+n;}
    if (n<100) {return n.toString()}
    return '99';
  }

  formatTime(time: number) {
    return time < 10 ? '0' + time : time.toString().slice(time.toString().length - 2);
  }

  canStart() {
    return this.state.status === 'started' && this.state.timeInterval > 0;
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (!this.canStart()) {
        if (this.state.status === 'started') {
          console.log('cannot start but start called');
          this.props.ownStopTimer();
        }
        return;
      }
      this.setState((prevState) => {
        return { timeInterval: prevState.timeInterval - 10 };
      });
      if (this.state.timeInterval === 0) {
        console.log('countdown is over');
        this.props.ownStopTimer();
      }
    }, 10);
  }

  onInputChange = (unitOfTime: UnitOfTime) => (event: FormEvent<HTMLInputElement>) => {
    if (!isNaN(parseInt(event.currentTarget.value)))
    {
      switch (unitOfTime) {
        case 'hours':
           let hours = event.currentTarget.value;
          this.setState(() => ({ hours: hours }));
          break;
        case 'minutes':
          let minutes = event.currentTarget.value;
          this.setState(() => ({ minutes: minutes}));
          break;
        case 'seconds':
          let seconds = event.currentTarget.value;
          this.setState(() => ({ seconds: seconds }));
          break;
      }
    }
  }

  onBlur = (unitOfTime: UnitOfTime) => {
    switch (unitOfTime) {
      case 'hours':
        let hours = this.setNine(parseInt(this.state.hours));
        this.setState(() => ({ hours: hours }));
        break;
      case 'minutes':
        let minutes = this.setSix(parseInt(this.state.minutes));
        this.setState(() => ({ minutes: minutes}));
        break;

      case 'seconds':
        let seconds = this.setSix(parseInt(this.state.seconds));
        this.setState(() => ({ seconds: seconds }));
        break;
    }
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
    status: state.status,
  };
}

const mapDispatchToProps = (dispatch: Dispatch<TimerActionTypes>, ownProps: {}): DispatchProps => {
  return {
    ownStopTimer: () => {
      dispatch(stopTimer())
    }
  }
}

export default connect<StateProps, DispatchProps , {}, ReduxState>(
  mapStateToProps,
  mapDispatchToProps
)(Timer);
//export default Timer;
