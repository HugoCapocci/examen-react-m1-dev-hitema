import React, { Component, FormEvent } from 'react';
import { connect } from 'react-redux';
import Display from './Display';
import { ReduxState } from '../store';
import { Dispatch } from 'redux';
import { TimerActionTypes } from '../action-types/timer-action-types';
import { stopTimer } from '../actions/timer-actions';

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
      minutes: '01',
      seconds: '00',
      timeInterval: null,
      status: 'stopped'
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
          this.props.onStop();
        }
        return;
      }
      this.setState((prevState) => {
        return { timeInterval: prevState.timeInterval - 10 };
      });
      if (this.state.timeInterval === 0) {
        console.log('countdown is over');
        this.props.onStop();
      }
    }, 10);
  }

  onInputChange = (unitOfTime: UnitOfTime) => (event: FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;

    switch (unitOfTime) {
      case "hours":
        if (!isNaN(parseInt(value)) && parseInt(value) < 100) {
          this.setState({ hours: value });
        }
        break;
      case "minutes":
        if (!isNaN(parseInt(value)) && parseInt(value) < 60) {
          this.setState({ minutes: value });
        }
        break;
      case "seconds":
        if (!isNaN(parseInt(value)) && parseInt(value) < 60) {
          this.setState({ seconds: value });
        }
        break;
      default:
        break;
    }
  }

  onBlur = (unitOfTime: UnitOfTime) => {
    switch (unitOfTime) {
      case "hours":
        this.setState({ hours: this.formatTime(parseInt(this.state.hours)) })
        break;
      case "minutes":
        this.setState({ minutes: this.formatTime(parseInt(this.state.minutes)) })
        break;
      case "seconds":
        this.setState({ seconds: this.formatTime(parseInt(this.state.seconds)) })
        break;
      default:
        break;
    }
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: TimeState): TimeState {
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
        minutes: '01',
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
    status: state.status
  };
}

const mapDispatchToProps = (dispatch: Dispatch<TimerActionTypes>, ownProps: {}): DispatchProps => {
  return {
    onStop: () => {
      dispatch(stopTimer())
    },
  };
}



export default connect<StateProps, DispatchProps, {}, ReduxState>(mapStateToProps, mapDispatchToProps)(Timer);