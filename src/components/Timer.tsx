import React, { Component, FormEvent } from 'react';

import Display from './Display';

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

class Timer extends Component<{}, TimeState> {
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
    if(isNaN(Number(event.currentTarget.value)) === false && event.currentTarget.value !== '' ){
      if(unitOfTime === 'hours')
          this.setState({hours: event.currentTarget.value})
      if(unitOfTime === 'minutes')
          this.setState({minutes: event.currentTarget.value})
      if(unitOfTime === 'seconds')
          this.setState({seconds: event.currentTarget.value})
    }
    else {
        if (unitOfTime === 'hours')
            this.setState({hours: '0'})
        if (unitOfTime === 'minutes')
            this.setState({minutes: '0'})
        if (unitOfTime === 'seconds')
            this.setState({seconds: '0'})
    }

    console.log('event.currentTarget.value')
  }

  onBlur = (unitOfTime: UnitOfTime) => {
      if(unitOfTime === 'hours' ){
          if(parseInt(this.state.hours) < 10)
              this.setState({hours: '0' + parseInt(this.state.hours)})
      }
      if(unitOfTime === 'minutes'){
          if(parseInt(this.state.minutes) > 59)
              this.setState({minutes: '59'})
          if(parseInt(this.state.minutes) < 10)
              this.setState({minutes: '0' + parseInt(this.state.minutes)})
      }
      if(unitOfTime === 'seconds'){
          if(parseInt(this.state.seconds) > 59)
              this.setState({seconds: '59'})
          if(parseInt(this.state.seconds) < 10)
              this.setState({seconds: '0' + parseInt(this.state.seconds)})
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

export default Timer;
