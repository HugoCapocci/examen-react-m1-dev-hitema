import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { TimerActionTypes } from '../action-types/timer-action-types';
import { ReduxState } from '../store';
import { startTimer, pauseTimer, stopTimer } from '../actions/timer-actions';

export interface ControlsProps {
}

interface DispatchProps{
  ownStartTimer:() => void ;
  ownPauseTimer:() => void ;
  ownStopTimer:() => void ;
}
interface StateProps {
  canStart: boolean;
  status: 'stopped' | 'paused' | 'started';

}

class Controls extends Component<ControlsProps & StateProps & DispatchProps> {
  static defaultProps: ControlsProps & StateProps = {
    canStart: true,
    status: 'stopped'
  };

  onClicked() {

  }

  render() {
    return (
        <div>
          <div className="controls">
            {this.props.status === 'stopped' &&
            <button className="btn btn-success btn-lg btn-block"
                    disabled={!this.props.canStart} onClick={() => { this.props.ownStartTimer() }}>
              START
            </button>
            }
            {
              (this.props.status === 'paused' || this.props.status === 'started') &&
              <button className="btn btn-danger btn-lg" onClick={() => { this.props.ownPauseTimer() }} >
                STOP
              </button>
            }
            {
              this.props.status === 'started' &&
              <button className="btn btn-primary btn-lg" onClick={() => { this.props.ownPauseTimer() }}>
                PAUSE
              </button>
            }
            {
              this.props.status === 'paused' &&
              <button className="btn btn-success btn-lg" onClick={() => { this.props.ownStartTimer() }}>
                RESUME
              </button>
            }
          </div>
        </div>
    );
  }
}

const mapStateToProps = (state: ReduxState): StateProps => {
  return {
    status: state.status,
    canStart: true
  };
}

const mapDispatchToProps = (dispatch: Dispatch<TimerActionTypes>, ownProps: {}): DispatchProps => {
  return {
    ownStartTimer: () => {
      dispatch(startTimer())
    },
    ownPauseTimer: () => {
      dispatch(pauseTimer())
    },
    ownStopTimer: () => {
      dispatch(stopTimer())
    }
  };
}

export default connect<StateProps, DispatchProps, {}, ReduxState>(
    mapStateToProps,
    mapDispatchToProps
)(Controls);