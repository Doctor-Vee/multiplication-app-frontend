import { shuffleArray } from './utils';

export type Question = {
  category: string;
  correctAnswer: number;
  difficulty: string;
  incorrectAnswers: number[];
  question: string;
  type: string;
};

export type QuestionsState = Question & { answers: number[] };

export const fetchQuizQuestions = async (amount: number, difficulty: string, noOfOptions: number): Promise<QuestionsState[]> => {
  // const endpoint = `http://localhost:7600/multiplication/questions?difficulty=${difficulty}&noOfQuestions=${amount}&noOfAnswers=${noOfOptions}`;
  const endpoint = `http://vee-multiplication-app.us-east-1.elasticbeanstalk.com/multiplication/questions?difficulty=${difficulty}&noOfQuestions=${amount}&noOfAnswers=${noOfOptions}`;
  console.log(endpoint);
  const data = await (await fetch(endpoint)).json();
  console.log(data)
  return data.results.map((question: Question) => ({
    ...question,
    answers: shuffleArray([...question.incorrectAnswers, question.correctAnswer])
  }))
};


