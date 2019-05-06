import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ReduxState } from '../store';

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
            {
              this.props.status === 'stopped' &&
              <button className="btn btn-success btn-lg btn-block"
                      disabled={!this.props.canStart}
                      onClick={() => { this.props.ownStartTimer() }}
              >
                START
              </button>
            }
            {
              this.props.status === 'paused' &&
              <div className="controls">
                <button className="btn btn-danger btn-lg"
                        onClick={() => { this.props.ownStopTimer() }}
                >
                  STOP
                </button>
                <button className="btn btn-success btn-lg"
                        onClick={() => { this.props.ownStartTimer() }}
                >
                  RESUME
                </button>
              </div>
            }
            {
              this.props.status === 'started' &&
              <div className="controls">
                <button className="btn btn-danger btn-lg"
                        onClick={() => { this.props.ownStopTimer() }}
                >
                  STOP
                </button>
                <button className="btn btn-primary btn-lg"
                        onClick={() => { this.props.ownPauseTimer() }}
                >
                  PAUSE
                </button>
              </div>
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

const mapStateToProps = (state: ReduxState): StateProps => {
  return {
    status: state.status,
    canStart: state.status!="started"?true:false
  };
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

export default connect<{}, ControlsProps, StateProps, ReduxState>(
  mapStateToProps,
  mapDispatchToProps
)(Controls);