import React from "react";
// Types
import { AnswerObject } from "../App";
// Styles
import { Wrapper, ButtonWrapper } from "./QuestionCard.styles";

const goodEmojis = ["😎", "😍", "👌", "🤑", "🤩", "🥳", "👍🏼", "✌🏼", "👏🏼", "💪🏼"];
const badEmojis = ["👎🏼", "😡", "🤥", "🥴", "👺", "🙄", "🤒", "😠", "😒", "😏"];

type Props = {
  question: string;
  answers: number[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNr: number;
  totalQuestions: number;
};

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNr,
  totalQuestions,
}) => (
  <Wrapper>
    <p className="number">
      Question: {questionNr} / {totalQuestions}
    </p>
    <p dangerouslySetInnerHTML={{ __html: question }} />
    <div>
      {answers.map((answer) => (
        <ButtonWrapper
          key={answer}
          correct={userAnswer?.correctAnswer === answer}
          userClicked={userAnswer?.answer.toString() === answer.toString()}
        >
          <button
            disabled={userAnswer ? true : false}
            value={answer}
            onClick={callback}
          >
            <span>{answer}</span>
          </button>
        </ButtonWrapper>
      ))}
      {userAnswer?.correctAnswer && (
        <>
          {userAnswer?.correctAnswer.toString() === userAnswer?.answer.toString() && (
            <>
              <span role="img" aria-labelledby="jsx-a11y/accessible-emoji">
                ✅
              </span>
              <span className="correct"> Correct! </span>
              <span role="img" aria-labelledby="jsx-a11y/accessible-emoji">
                {goodEmojis[Math.floor(Math.random() * 10)]}
              </span>
            </>
          )}
          {userAnswer?.correctAnswer.toString() !== userAnswer?.answer.toString() && (
            <>
              <span role="img" aria-labelledby="jsx-a11y/accessible-emoji">
                ❌
              </span>
              <span className="wrong"> Wrong! </span>
              <span role="img" aria-labelledby="jsx-a11y/accessible-emoji">
                {badEmojis[Math.floor(Math.random() * 10)]}
              </span>
            </>
          )}
        </>
      )}
    </div>
  </Wrapper>
);

export default QuestionCard;
