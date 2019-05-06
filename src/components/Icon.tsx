import React, { Component } from 'react';
import { ReduxState } from '../store';
import { connect } from 'react-redux';

interface StateProps {
  status: 'stopped' | 'paused' | 'started';
}

export class Icon extends Component<StateProps> {
  getClassFromStatus = () => {
    switch(this.props.status) {
      case 'started':
        return 'fas fa-play-circle';
      case 'paused': 
        return 'far fa-pause-circle';
      case 'stopped':
      default: 
        return 'fas fa-stop-circle';
    }
  }

  render() {
    return <i className={this.getClassFromStatus() + ' fa-10x'}></i>;
  }
 
}

const mapStateToProps = (state: ReduxState): StateProps => {
  return {
    status: state.status
  };
}

export default connect<StateProps, {}, {}, ReduxState>(
  mapStateToProps
)(Icon)
