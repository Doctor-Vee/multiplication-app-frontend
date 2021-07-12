import React, { useState } from "react";
import { fetchQuizQuestions } from "./API";
// Components
import QuestionCard2 from "./components/QuestionCard2";
// types
import { QuestionsState } from "./API";
// Styles
import { GlobalStyle, Wrapper } from "./App.styles";

export type AnswerObject = {
  question: string;
  answer: number;
  correct: boolean;
  correctAnswer: number;
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [noOfQuestions, setNoOfQuestions] = useState(10);
  const [difficulty, setDifficulty] = useState("easy");
  const [noOfOptions] = useState(4);
  const [counter, setCounter] = useState(0);
  const [timer, setTimer] = useState(60);
  const [noOfQuestionsToLoad, setNoOfQuestionsToLoad] = useState(10);

  React.useEffect(() => {
    counter > 0 && setTimeout(() => checkAndSetCounter(counter - 1), 1000);
  }, [counter]);

  const checkAndSetCounter = (counter: number) => {
    if (counter === 0) {
      setGameOver(true);
    }
    setCounter(counter);
  };

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    setNoOfQuestions(noOfQuestionsToLoad);
    const newQuestions = await fetchQuizQuestions(
      noOfQuestions,
      difficulty,
      noOfOptions
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
    setCounter(timer);
  };

  const checkAnswer = (e: number) => {
    if (!gameOver && number === userAnswers.length) {
      // User's answer
      const answer = e;
      // Check answer against correct answer
      const correct = questions[number].correctAnswer === answer;
      // Add score if answer is correct
      if (correct) setScore((prev) => prev + 1);
      // Save the answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correctAnswer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    // Move on to the next question if not the last question
    const nextQ = number + 1;

    if (nextQ === noOfQuestions) {
      setGameOver(true);
    } else {
      setNumber(nextQ);
    }
  };

  const onDifficultyChange = (e: any) => {
    setDifficulty(e.target.value);
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>MULTIPLICATION APP</h1>
        {gameOver || userAnswers.length === noOfQuestions ? (
          <>
            <label>Timer (in Seconds): </label>
            <input
              type="number"
              className="input"
              value={timer}
              onChange={(e) => setTimer(parseInt(e.target.value))}
            />
            <br />
            <label>Number of Questions: </label>
            <input
              type="number"
              className="input"
              value={noOfQuestionsToLoad}
              onChange={(e) => setNoOfQuestionsToLoad(parseInt(e.target.value))}
            />
            <br />
            <label>Difficulty: </label>
            <div onChange={onDifficultyChange}>
              <input type="radio" value="easy" name="difficulty" />
              <label>Easy </label>
              <input type="radio" value="medium" name="difficulty" />
              <label>Medium </label>
              <input type="radio" value="hard" name="difficulty" />
              <label>Hard</label>
            </div>
            <button className="start" onClick={startTrivia}>
              Start
            </button>
          </>
        ) : null}
        <p className="score">
          Score: {score} / {noOfQuestions}{" "}
        </p>
        {loading ? <p>Loading Questions...</p> : null}
        {!loading && !gameOver && (
          <>
            <div className="score">
              <p>Countdown: {counter}</p>
            </div>
            <QuestionCard2
              questionNr={number + 1}
              totalQuestions={noOfQuestions}
              question={questions[number].question}
              answers={questions[number].answers}
              userAnswer={userAnswers ? userAnswers[number] : undefined}
              callback={checkAnswer}
            />
          </>
        )}
        {!gameOver &&
        !loading &&
        userAnswers.length === number + 1 &&
        number !== noOfQuestions - 1 ? (
          <button className="next" onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}
      </Wrapper>
    </>
  );
};

export default App;
