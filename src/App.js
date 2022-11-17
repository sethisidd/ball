import { useState, useEffect, useRef } from 'react'
import logo from './logo.svg';
import './App.css';
import _ from 'lodash';

const reorder = (balls) => {
  return _.orderBy(balls, ['index'], ['asc']);
}

function App() {
  const [randomColor] = useState(_.sampleSize(['red', 'blue', 'green', 'yellow', 'orange'], 5));
  const [ballToMove, setBallToMove] = useState(null);
  const balls = useRef(randomColor.map((color, index) => ({
    index: index + 1,
    color
  })));
  const box = useRef([]);
  const [update, setUpdate] = useState(false)

  /**
   * Remove selected ball from Box
   * @param {*} selectBall 
   */
  const moveBallBack = selectBall => {
    box.current = box.current.filter(ball => ball.index != selectBall.index);
    balls.current = reorder([...balls.current, { ...selectBall }]);
    // Update the page to render updated ball state
    setUpdate(!update);
  }

  /**
   * Move selected ball to box
   * @param {*} index 
   */
  const moveBallToBox = index => {
    box.current = [...box.current, balls.current.filter((ball, ind) => (ind + 1) == index)[0]];
    balls.current = balls.current.filter((ball, ind) => (ind + 1) != index);
    // Update the page to render updated ball state
    setUpdate(!update);
  };

  return (
    <div className="App">
      <div className='left'>
        <div className='box'>
          {box.current.map((ball, index) => <div className='ball' style={{ backgroundColor: ball.color, cursor: 'pointer' }} onClick={() => moveBallBack(ball)}></div>)}
        </div>
      </div>
      <div className='right'>
        <div className='balls'>
          {balls.current.map((ball, index) => <div className='ball' style={{ backgroundColor: ball.color }}></div>)}
        </div>
        <div className={'inputs ' + (balls.current.length == 0 && 'disabled')}>
          <input className='shootInput' type='number' onChange={(e) => (setBallToMove(e.target.value))}></input>
          <button className='shootButton' disabled={((!ballToMove || ballToMove <= 0 || ballToMove > balls.current.length) ? true : false )} onClick={() => moveBallToBox(ballToMove)}>Shoot</button>
        </div>
      </div>
    </div>
  );
}

export default App;
