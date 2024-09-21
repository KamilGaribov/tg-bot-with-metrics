import React, { useEffect, useState } from 'react';
import './App.css';


function App() {
  const [motionData, setMotionData] = useState({
    acceleration: { x: 0, y: 0, z: 0 },
    rotationRate: { alpha: 0, beta: 0, gamma: 0 },
  });

  let lastUpdate = 0;
  const debouncedSetMotionData = (motionData) => {
    const debounce = 500
    const now = Date.now();
    if (now - lastUpdate >= debounce) {
      setMotionData(motionData);
      lastUpdate = now;
    }
  }

  const eventListener = (event) => {
    let acceleration = event.acceleration;
    let accelerationWithGravity = event.accelerationIncludingGravity;

    const motionData = {
      acceleration: {
        x: acceleration?.x || 0,
        y: acceleration?.y || 0,
        z: acceleration?.z || 0,
      },
      rotationRate: {
        alpha: accelerationWithGravity?.x || 0,
        beta: accelerationWithGravity?.y || 0,
        gamma: accelerationWithGravity?.z || 0,
      }
    };
    
    debouncedSetMotionData(motionData);
  }

  const addMotion = async () => {
    // OS requires permission
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
      try {
        const permissionState = await DeviceMotionEvent.requestPermission();
        if (permissionState === 'granted') {
          window.addEventListener('devicemotion', eventListener);
        }
      } catch (error) {
        console.error('An error occured', error);
      }
    } else {
      // OS not requires permission
      window.addEventListener('devicemotion', eventListener);
    }
  };

  useEffect(() => {
    return () => window.removeEventListener("devicemotion", eventListener);
  }, [])


  return (
    <div className="App">
      <div className="container">
      <h3>Welcome to accelerometer/gyroscope metrics</h3>
      <div><button onClick={addMotion}>Click to start</button></div>
        <h4>Acceleration:</h4>
        <p>X: {motionData.acceleration.x.toFixed(2)}</p>
        <p>Y: {motionData.acceleration.y.toFixed(2)}</p>
        <p>Z: {motionData.acceleration.z.toFixed(2)}</p>

        <h4>Rotation Rate:</h4>
        <p>Alpha: {motionData.rotationRate.alpha.toFixed(2)}</p>
        <p>Beta: {motionData.rotationRate.beta.toFixed(2)}</p>
        <p>Gamma: {motionData.rotationRate.gamma.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default App;
