import React, { useState, useEffect } from 'react';

const PomodoroTimer = () => {
  const [workTime, setWorkTime] = useState(25 * 60); // 25 minutes in seconds
  const [breakTime, setBreakTime] = useState(5 * 60); // 5 minutes in seconds
  const [time, setTime] = useState(workTime);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isBreak, setIsBreak] = useState(false); // Track if currently on break

  useEffect(() => {
    let interval = null;

    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setTime(prevTime => {
          if (prevTime <= 1) {
            clearInterval(interval);
            if (!isBreak) {
              alert("Work time's up! Take a break.");
              setIsBreak(true);
              return breakTime; // Set to break time
            } else {
              alert("Break time's up! Get back to work.");
              setIsBreak(false);
              return workTime; // Reset to work time
            }
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (!isActive) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, isPaused, isBreak, workTime, breakTime]);

  const toggleTimer = () => {
    if (isActive && !isPaused) {
      setIsPaused(true); // Pause the timer
    } else if (isActive && isPaused) {
      setIsPaused(false); // Resume the timer
    } else {
      setIsActive(true); // Start the timer
      setIsPaused(false); // Ensure it's not paused
    }
  };

  const forwardTimer = () => {
    if (isActive) {
      setTime(0); // Set time to zero
    }
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsPaused(false);
    setIsBreak(false);
    setTime(workTime); // Reset to the current work time
  };

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  // Adjust work and break time functions
  const increaseWorkTime = () => setWorkTime(prev => Math.min(prev + 60, 60 * 60)); // Max 60 minutes
  const decreaseWorkTime = () => setWorkTime(prev => Math.max(prev - 60, 60)); // Min 1 minute

  const increaseBreakTime = () => setBreakTime(prev => Math.min(prev + 60, 15 * 60)); // Max 15 minutes
  const decreaseBreakTime = () => setBreakTime(prev => Math.max(prev - 60, 60)); // Min 1 minute

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>{isBreak ? 'Break Timer' : 'Pomodoro Timer'}</h1>
      <div style={{ fontSize: '48px', margin: '20px' }}>
        {formatTime(time)}
      </div>
      <button onClick={toggleTimer}>
        {isActive ? (isPaused ? 'Resume' : 'Pause') : 'Start'}
      </button>
      <button onClick={forwardTimer} style={{ marginLeft: '10px' }} disabled={!isActive}>
        Forward
      </button>
      <button onClick={resetTimer} style={{ marginLeft: '10px' }}>
        Reset
      </button>
      <div>
        <h2>Work Time: {Math.floor(workTime / 60)} minutes</h2>
        <button onClick={increaseWorkTime}>+</button>
        <button onClick={decreaseWorkTime}>-</button>
      </div>
      <div>
        <h2>Break Time: {Math.floor(breakTime / 60)} minutes</h2>
        <button onClick={increaseBreakTime}>+</button>
        <button onClick={decreaseBreakTime}>-</button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
