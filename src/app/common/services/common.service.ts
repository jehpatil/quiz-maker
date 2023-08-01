import { Injectable } from '@angular/core';
import { QuizResult } from '../models/quiz';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  questionDisplayCount: number = 5
  quizData: QuizResult[] = [];

  constructor() { }

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
