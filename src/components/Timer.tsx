import React, { Component, FormEvent } from 'react';
import Display from './Display';

import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { TimerActionTypes } from '../action-types/timer-action-types';
import { ReduxState } from '../store';


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
  //onStop: () => void; Obligé de commenter la ligne sur Linux, le stop marche bien sur windows
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

  setHours(hours: number) {
    
    if (hours < 0) {
      this.setState(() => ({ hours: '00' }));
    } else {
      this.setState((prevState) => {
        hours = parseInt(this.formatTime(parseInt(prevState.hours) + hours));
        if (hours > 99) {
          hours = parseInt(prevState.hours);
        }
        return { hours: this.formatTime(hours) };
      });
    }
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
          //this.props.onStop(); Fonctionne sur Widows mais pas Linux
        }
        return;
      }
      this.setState((prevState) => {
        return { timeInterval: prevState.timeInterval - 10 };
      });
      if (this.state.timeInterval === 0) {
        console.log('countdown is over');
        //this.props.onStop(); Fonctionne sur Widows mais pas Linux
      }
    }, 10);
  }

  onInputChange = (unitOfTime: UnitOfTime) => (event: FormEvent<HTMLInputElement>) => {
    let value = event.currentTarget.value;
    if(parseInt(value) > 0)
    {
      if(unitOfTime === "hours")
      {
        this.setState({hours: value});
      }else if(unitOfTime === "minutes"){
        this.setState({minutes: value});
      }else{
        this.setState({seconds: value});
      }
    }
    
  }

  onBlur = (unitOfTime: UnitOfTime) => {

    switch (unitOfTime) {
      case "hours":
        this.setState({ hours: this.formatTime(parseInt(this.state.hours))})
        break;
      case "minutes":
        if(parseInt(this.state.minutes) < 59)
        {
          this.setState({ minutes: this.formatTime(parseInt(this.state.minutes))})
        }else{
          this.setState({minutes: '59'});
        }
        break;
      case "seconds":
        if(parseInt(this.state.seconds) < 59)
        {
          this.setState({ seconds: this.formatTime(parseInt(this.state.seconds))})
        }else{
          this.setState({seconds: '59'});
        }
        break;
      default:
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
export default connect<StateProps, DispatchProps, {}, ReduxState>(
  mapStateToProps,
)(Timer);