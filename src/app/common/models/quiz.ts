export interface QuizResponse {
  response_code: number;
  results: QuizResult[];
}

export interface QuizResult {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  answerDisplayed?: QuizAnswer[];
  selectedAnswerIndex?: number;
}

export interface QuizAnswer {
  answer: string;
  isSelected: boolean;
  isAnswerCorrect: boolean;
}
