import { Injectable } from '@angular/core';
import { QuizResult } from '../models/quiz';
import { TriviaCategory } from '../models/trivia-category';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  questionDisplayCount: number = 5
  quizData: QuizResult[] = [];
	allCategories: TriviaCategory[] = [];

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

  setCategories(categories: TriviaCategory[]) {
    this.allCategories = categories
  }

  getCategories() {
    return this.allCategories;
  }

}
