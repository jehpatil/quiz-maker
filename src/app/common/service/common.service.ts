import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  questionDisplayCount: number = 5
  quizData: any = [];

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

  saveQuizData(quiz: any) {
    this.quizData = quiz;
  }

  getQuizData() {
    return this.quizData
  }

  getQuestionDisplayCount() {
    return this.questionDisplayCount
  }

}
