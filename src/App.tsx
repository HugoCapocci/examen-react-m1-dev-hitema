import React from 'react';

import './App.css';
import Timer from './components/Timer';
import Controls from './components/Controls';
import Icon from './components/Icon';

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="container mt-5">
        <div className="d-flex flex-row align-items-center">
          <div className="col-md-4 mx-auto">
            <Icon />
          </div>
          <div className="col-md-4 mx-auto">
            <Timer />
          </div>
          <div className="col-md-4 mx-auto">
            <Controls />
          </div>
        </div>
    </div>
    </div>
  );
}

export default App;
