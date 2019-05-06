import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { TimerActionTypes } from '../action-types/timer-action-types';
import { ReduxState } from '../store';
import { startTimer, pauseTimer, stopTimer } from '../actions/timer-actions';


export interface ControlsProps {
}

interface DispatchProps{
  onStart: () => void;
  onStop: () => void;
  onPause: () => void;
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
  render() {
    return (
        <div>
          <div className="controls">
            {this.props.status === 'stopped' &&
            <button className="btn btn-success btn-lg btn-block"
                    disabled={!this.props.canStart} onClick={this.props.onStart}>
              START
            </button>
            }
            {
              (this.props.status === 'paused' || this.props.status === 'started') &&
              <button className="btn btn-danger btn-lg" onClick={this.props.onStop}>
                STOP
              </button>
            }
            {
              this.props.status === 'started' &&
              <button className="btn btn-primary btn-lg" onClick={this.props.onPause}>
                PAUSE
              </button>
            }
            {
              this.props.status === 'paused' &&
              <button className="btn btn-success btn-lg" onClick={this.props.onStart}>
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
};

const mapDispatchToProps = (dispatch: Dispatch<TimerActionTypes>, ownProps: {}): DispatchProps => {
  return {
    onStart: () => {
      dispatch(startTimer())
    },
    onPause: () => {
      dispatch(pauseTimer())
    },
    onStop: () => {
      dispatch(stopTimer())
    }
  };
};

export default connect<StateProps, DispatchProps, {}, ReduxState>(
    mapStateToProps,
    mapDispatchToProps
)(Controls);
