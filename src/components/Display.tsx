import React, { Component, FormEvent} from 'react';

import TimeService from '../services/time';
import { UnitOfTime } from './Timer';

const timeService = new TimeService();

interface DisplayProps {
  onFocus: (unitOfTime: UnitOfTime) => void;
  onBlur: (unitOfTime: UnitOfTime) => void;
  onInputChange: (unitOfTime: UnitOfTime) => (event: FormEvent<HTMLInputElement>) =>void;
  hours: string;
  minutes: string;
  seconds: string;
  timeInterval: number;
};

class Display extends Component<DisplayProps> {
  static defaultProps = {
    onFocus: (input: string) => console.log(input),
    hours: '00',
    minutes: '00',
    seconds: '00',
    timeInterval: null
  };

  render() {
    return (
      <div>
        { this.props.timeInterval && 
          <div className="display-countdown">
            <div>
              <label className="display-countdown-label">H</label>
              <label className="display-countdown-label">M</label>
              <label className="display-countdown-label">S</label>
              <label className="display-countdown-label">MS</label>
            </div>
            <div className="display-countdown-time">
              { timeService.getTime(this.props.timeInterval) }
            </div>
          </div>
        }
        { !this.props.timeInterval &&
          <div className="display">
            <div>
              <div>
                <label className="display-label">H</label>
                <label className="display-label">M</label>
                <label className="display-label">S</label>
              </div>

              <div className="input-group input-group-lg display-input-group">
                <input type="text"
                  className="form-control display-time display-hours"
                  maxLength={2}
                  placeholder="00"
                  onFocus={() => this.props.onFocus('hours')}
                  onBlur={() => this.props.onBlur('hours')}
                  value={this.props.hours}
                  onChange={this.props.onInputChange('hours')} />

                <span className="display-time display-separator">:</span>

                <input type="text"
                  className="form-control display-time display-minutes"
                  maxLength={2}
                  placeholder="00"
                  onFocus={() => this.props.onFocus('minutes')}
                  onBlur={() => this.props.onBlur('minutes')}
                  value={this.props.minutes}
                  onChange={this.props.onInputChange('minutes')} />

                <span className="display-time display-separator">:</span>

                <input type="text"
                  className="form-control display-time display-seconds"
                  maxLength={2}
                  placeholder="00"
                  onFocus={() => this.props.onFocus('seconds')}
                  onBlur={() => this.props.onBlur('seconds')}
                  value={this.props.seconds}
                  onChange={this.props.onInputChange('seconds')} />
              </div>
            </div>
          </div>
        }
      </div>
    );
  };
}

export default Display;
