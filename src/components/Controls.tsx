import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { TimerActionTypes } from '../action-types/timer-action-types';
import { startTimer,pauseTimer,stopTimer } from '../actions/timer-actions';

export interface ControlsProps {
  ownStartTimer: () => void;
  ownPauseTimer: () => void;
  ownStopTimer: () => void;
}

interface StateProps {
  canStart: boolean;
  status: 'stopped' | 'paused' | 'started';
}

class Controls extends Component<ControlsProps & StateProps> {
  static defaultProps: StateProps = {
    canStart: true,
    status: 'stopped'
  };

  render() {
    return (
      <div>
        <div className="controls">
          { this.props.status === 'stopped' &&
            <button className="btn btn-success btn-lg btn-block"
              disabled={!this.props.canStart}
              onClick={() => { this.props.ownStartTimer() }}
              >
              START
            </button>
          }
          { this.props.status === 'paused' &&
            <button className="btn btn-danger btn-lg">
               STOP
            </button> &&
            <button className="btn btn-success btn-lg">
               RESUME
            </button>
          }
          { this.props.status === 'started' &&
            <button className="btn btn-danger btn-lg">
              STOP
            </button> &&
            <button className="btn btn-primary btn-lg">
              PAUSE
            </button>
          }
          { this.props.status !== 'stopped' &&
            <div className="controls">
              {/*
                <button className="btn btn-danger btn-lg">
                   STOP
                </button>
                <button className="btn btn-success btn-lg">
                   RESUME
                </button>
                <button className="btn btn-primary btn-lg">
                  PAUSE
                </button>
              */}
            </div>
          }
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<TimerActionTypes>, ownProps: StateProps): ControlsProps => {
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
  }
}

export default connect<{}, ControlsProps, StateProps>(
  null,
  mapDispatchToProps
)(Controls);