import React from 'react'
import styled from 'styled-components'

const PanelTimer = styled.div`
  margin: 30px 0;
  font-size: 32pt;
  text-align: center;
  line-height: 18pt;
`

function useInterval(callback, delay) {
  const savedCallback = React.useRef();

  // Remember the latest callback.
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  React.useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function Timer(props) {
  const [count, setCount] = React.useState(props.duration * 60) // convert to milliseconds
  const [running, setRunning] = React.useState(false)

  const clockformat = (time) => {
    let seconds = time % 60 // get seconds by modulo the duration with 60
    let minutes = Math.floor(time / 60) // get minutes by divide duration with 60 then remove decimal
    minutes = minutes.toString().length === 1 ? "0" + minutes : minutes // add initial 0 if one digit
    seconds = seconds.toString().length === 1 ? "0" + seconds : seconds
    return (
      <div>
        {minutes + ':' + seconds}
      </div>
    ) 
  }

  useInterval(() => {
    setCount(count - 1)
  }, running ? 1000 : null)

  const handleStart = () => {
    setRunning(true)
  }

  const handlePause = () => {
    setRunning(false)
  }

  const handleStop = () => {
    setRunning(false)
    setCount(props.duration * 60) // reset duration
  }

  return (
    <PanelTimer>
      {clockformat(count)}
      <button onClick={handleStart}>Start</button>
      <button onClick={handlePause}>Pause</button>
      <button onClick={handleStop}>Stop</button>
    </PanelTimer>
  )
}

export default Timer