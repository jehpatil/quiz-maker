import { CommonService } from './../common/services/common.service';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { TriviaCategoryResponse, TriviaCategory } from '../common/models/trivia-category';
import { QuizAnswer, QuizResponse, QuizResult } from '../common/models/quiz';
import { Difficulty } from '../common/models/difficulty-level';

@Component({
  selector: 'app-quiz-maker',
  templateUrl: './quiz-maker.component.html',
  styleUrls: ['./quiz-maker.component.css']
})
export class QuizMakerComponent implements OnInit {
	categories: TriviaCategory[] = []
	difficultyLevels = Difficulty;
  quizList: QuizResult[]  = [];
  selectedDifficultyLevel: string = ""
  selectedCategory: number = 0;
  selectedAnswersCounter: number = 0;
  questionDisplayCount: number = 5

	constructor(private apiService: ApiService, private commonService: CommonService, private router: Router) { 
    this.questionDisplayCount = this.commonService.getQuestionDisplayCount();
  }
  
  ngOnInit(): void {
    this.getCategoryList();
  }

  getCategoryList() {
    this.apiService.getCategories()
    .subscribe((response: TriviaCategoryResponse) => {
      this.categories = response.trivia_categories;
    });
  }

  resetQuiz() {
    this.quizList = [];
    this.selectedAnswersCounter = 0;
  }
  
  createQuiz() {
    this.apiService.getQuizList(this.selectedCategory, this.selectedDifficultyLevel, this.questionDisplayCount)
    .subscribe((response: QuizResponse) => {
      this.quizList = response.results.map((question: QuizResult)=>{
        return this.createAnswerList(question);
      });
    });
  }
  
  createAnswerList(question: QuizResult) {
    let displayAnswers = question.incorrect_answers; 
    displayAnswers.splice(this.generateRandomIndex(), 0, question.correct_answer); // inserted on radom index
    question.answerDisplayed = [];
    for(let i=0; i < displayAnswers.length; i++) {
      question.answerDisplayed.push({answer: displayAnswers[i], isSelected: false, isAnswerCorrect: false });
    }
    return question
  }

  generateRandomIndex() {
    return Math.floor(3 * Math.random()); // get random index to insert
  }
  
  selectAnswer(index: number, option: QuizAnswer, question: QuizResult) {
    if(!option.isSelected) {
      if(question.selectedAnswerIndex != undefined && question.answerDisplayed) { // reset previous selected answer flag
        question.answerDisplayed[question.selectedAnswerIndex].isSelected = false
      } else {
        if(this.selectedAnswersCounter < this.questionDisplayCount) {
          this.selectedAnswersCounter += 1; // Maintaining counter to show/hide Submit button
        }
      }
      option.isAnswerCorrect = option.answer === question.correct_answer ?  true : false;
      option.isSelected = true;
      question.selectedAnswerIndex = index;
    }
  }
  
  submitQuiz() {
    this.commonService.saveQuizData(this.quizList);
    this.router.navigate(['/quiz-result']);
  }

  trackByIndex(index: number, question: QuizResult) {
    return index;
  }

  returnZero() {
    return 0; // to keep same order as in Enum 
  } 
}
