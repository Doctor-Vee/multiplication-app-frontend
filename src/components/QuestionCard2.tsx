import React from "react";
// Types
import { AnswerObject } from "../App";
// Styles
import { Wrapper } from "./QuestionCard.styles";

type Props = {
  question: string;
  answers: number[];
  callback: (e: number) => void;
  userAnswer: AnswerObject | undefined;
  questionNr: number;
  totalQuestions: number;
};

const QuestionCard2: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNr,
  totalQuestions,
}) => {
  const [value, setValue] = React.useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!value) return;
    callback(parseInt(value));
    setValue("");
  };

  return (
    <Wrapper>
      <p className="number">
        Question: {questionNr} / {totalQuestions}
      </p>
      <p dangerouslySetInnerHTML={{ __html: question }} />
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </form>
        {userAnswer?.correctAnswer &&
          userAnswer?.correctAnswer === userAnswer?.answer && (
            <>
              <span role="img" aria-labelledby="jsx-a11y/accessible-emoji">
                ✅
              </span>
              <span className="correct"> Correct !</span>
            </>
          )}
        {userAnswer?.correctAnswer &&
          userAnswer?.correctAnswer !== userAnswer?.answer && (
            <>
              <span role="img" aria-labelledby="jsx-a11y/accessible-emoji">
                ❌
              </span>
              <span className="wrong"> Wrong !</span>
            </>
          )}
      </div>
    </Wrapper>
  );
};

export default QuestionCard2;
