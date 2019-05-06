import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { TimerActionTypes } from '../action-types/timer-action-types';
import { startTimer, stopTimer, pauseTimer } from '../actions/timer-actions';
import { ReduxState } from '../store';

export interface ControlsProps {
}

interface DispatchProps {
  onStart: () => void;
  onStop: () => void;
  onPause: () => void;
}

interface StateProps {
  canStart: boolean;
  status: 'stopped' | 'paused' | 'started';
}

class Controls extends Component<ControlsProps & DispatchProps & StateProps> {
  static defaultProps: ControlsProps & StateProps = {
    canStart: true,
    status: 'stopped'
  };

  render() {
    return (
      <div>
        <div className="controls">
          { this.props.status === 'stopped' &&
            <button className="btn btn-success btn-lg btn-block"
              onClick={this.props.onStart}
              disabled={!this.props.canStart}>
              START
            </button>
          }
          { ['started', 'paused'].includes(this.props.status) &&
            <div className="controls">
              <button className="btn btn-danger btn-lg" onClick={this.props.onStop}>
                STOP
              </button>
              { this.props.status === 'paused' &&
                <button className="btn btn-success btn-lg" onClick={this.props.onStart}>
                  RESUME
                </button>
              }
              { this.props.status === 'started' &&
                <button className="btn btn-primary btn-lg" onClick={this.props.onPause}>
                  PAUSE
                </button>
              }
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
    canStart: ['stopped', 'paused'].includes(state.status)
  };
}

const mapDispatchToProps = (dispatch: Dispatch<TimerActionTypes>, ownProps: ControlsProps): DispatchProps => {
  return {
    onStart: () => {
      dispatch(startTimer())
    },
    onStop: () => {
      dispatch(stopTimer())
    },
    onPause: () => {
      dispatch(pauseTimer());
    }
  }
}

export default connect<StateProps, DispatchProps, ControlsProps, ReduxState>(
  mapStateToProps,
  mapDispatchToProps
)(Controls);
