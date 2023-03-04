import React from "react";
import "./index.scss";

const questions = [
  {
    title: "React - это ... ?",
    variants: ["библиотека", "фреймворк", "приложение"],
    correct: 0,
  },
  {
    title: "Компонент - это ... ",
    variants: [
      "приложение",
      "часть приложения или страницы",
      "то, что я не знаю что такое",
    ],
    correct: 1,
  },
  {
    title: "Что такое JSX?",
    variants: [
      "Это простой HTML",
      "Это функция",
      "Это тот же HTML, но с возможностью выполнять JS-код",
    ],
    correct: 2,
  },
];

function Result({correct}) {
  return (
    <div className="result">
      <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" />
      <h2>Вы отгадали {correct} ответа из {questions.length}</h2>
      <a href="/"><button>Попробовать снова</button></a>
    </div>
  );
}

function Game({ currentQuestion, onClickVariant, step }) {
  const progresDiff = Math.round((step / questions.length) * 100);
  return (
    <>
      <div className="progress">
        <div style={{ width: `${progresDiff}%` }} className="progress__inner"></div>
      </div>
      <h1>{currentQuestion.title}</h1>
      <ul>
        {currentQuestion.variants.map((item, index) => (
          <li onClick={() => onClickVariant(index)} key={item}>
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

function App() {
  const [step, setStep] = React.useState(0);
  const [correct, setCorrect] = React.useState(0);
  const currentQuestion = questions[step];
  const onClickVariant = (idx) => {
    setStep(step + 1);
    if(currentQuestion.correct === idx){
      setCorrect(correct + 1)
    }
  };
  return (
    <div className="App">
      {step !== questions.length ? (
        <Game
          currentQuestion={currentQuestion}
          onClickVariant={onClickVariant}
          step={step}
        />
      ) : (
        <Result correct={correct} />
      )}
    </div>
  );
}

export default App;
