import React from 'react';
import './index.scss';

function App() {
  const[count, setCount] = React.useState(0);
  const onClickPlusButton = function(){
    setCount(count + 1)
  }
  const onClickMinusButton = function(){
    setCount(count - 1)
  }
  return (
    <div className="App">
      <div>
        <h2>Счетчик:</h2>
        <h1>{count}</h1>
        <button onClick={onClickMinusButton} className="minus">- Минус</button>
        <button onClick={onClickPlusButton} className="plus">Плюс +</button>
      </div>
    </div>
  );
}

export default App;
