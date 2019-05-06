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

  onClicked() { 
  }

  render() {
    return (
      <div>
        <div className="controls">
          {
            this.props.status === 'stopped' &&
            <button className="btn btn-success btn-lg btn-block"
              disabled={!this.props.canStart} onClick={this.onClicked}>
              START
            </button>
          }
          {
            (this.props.status === 'paused' || this.props.status === 'started') &&
            <button className="btn btn-danger btn-lg">
              STOP
            </button>
          }
          {
            this.props.status === 'started' &&
            <button className="btn btn-primary btn-lg">
              PAUSE
            </button>
          }
          {
            this.props.status === 'paused' &&
            <button className="btn btn-success btn-lg">
              RESUME
            </button>
          }
        </div>
      </div>
    );
  }
}

export default Controls;
