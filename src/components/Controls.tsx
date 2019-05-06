import React, { Component } from 'react';

export interface ControlsProps {
}

interface StateProps {
  canStart: boolean;
  status: 'stopped' | 'paused' | 'started';
}

class Controls extends Component<ControlsProps & StateProps> {
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
              disabled={!this.props.canStart}>
              START
            </button>
          }
          { this.props.status !== 'stopped' &&
            <div className="controls">
              {(this.props.status === 'started' || this.props.status === 'paused') &&
                <button className="btn btn-danger btn-lg">
                  STOP
                </button>
              }
              {this.props.status === 'paused' &&
                <button className="btn btn-success btn-lg">
                  RESUME
                </button>
              }
              {this.props.status === 'started' &&
                <button className="btn btn-primary btn-lg">
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

export default Controls;
