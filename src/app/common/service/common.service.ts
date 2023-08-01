import { Injectable } from '@angular/core';
import { QuizResult } from '../interface/quiz';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  questionDisplayCount: number = 5
  quizData: QuizResult[] = [];

  constructor() { }

  getDifficultiesLevel() {
    return [
      {
        name: "Easy",
        value: "easy"
      },
      {
        name: "Medium",
        value: "medium"
      },
      {
        name: "Hard",
        value: "hard"
      }
    ];
  }

  saveQuizData(quiz: QuizResult[]) {
    this.quizData = quiz;
  }

  getQuizData() {
    return this.quizData
  }

  getQuestionDisplayCount() {
    return this.questionDisplayCount
  }

}
