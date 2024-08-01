import React from 'react';
import ReactDOM from 'react-dom';
import PomodoroTimer from './PomodoroTimer';

const App = () => (
  <div>
    <PomodoroTimer />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
