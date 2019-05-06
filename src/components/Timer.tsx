import React, { Component, FormEvent } from 'react';
import { ReduxState } from '../store';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { TimerActionTypes } from '../action-types/timer-action-types';
import { stopTimer } from '../actions/timer-actions';
import Display from './Display';

export type UnitOfTime = 'hours' | 'minutes' | 'seconds';

export interface TimerProps {

}

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

class Timer extends Component<Props, TimeState, TimerProps> {
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
        if (this.state.status === 'started') {
          console.log('cannot start but start called');
        }
        return;
      }
      this.setState((prevState) => {
        return { timeInterval: prevState.timeInterval - 10 };
      });
      if (this.state.timeInterval === 0) {
        console.log('countdown is over');
      }
    }, 10);
  }

  onInputChange = (unitOfTime: UnitOfTime) => (event: FormEvent<HTMLInputElement>) => {

    let eventValue = event.currentTarget.value;

    switch (unitOfTime) {
      case "hours":
        console.log(eventValue);
        if (!isNaN(parseInt(eventValue)) && parseInt(eventValue) < 100) {
          this.setState({ hours: eventValue });
        }
        break;
      case "minutes":
        console.log(eventValue);
        if (!isNaN(parseInt(eventValue)) && parseInt(eventValue) < 60) {
          this.setState({ minutes: eventValue });
        }
        break;
      case "seconds":
        console.log(eventValue);
        if (!isNaN(parseInt(eventValue)) && parseInt(eventValue) < 60) {
          this.setState({ seconds: eventValue });
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
    onStop: () => {
      dispatch(stopTimer())
    }
  };
}

export default connect<StateProps, DispatchProps, {}, ReduxState>(
    mapStateToProps,
    mapDispatchToProps
)(Timer);
