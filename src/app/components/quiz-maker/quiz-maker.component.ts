import { CommonService } from '../../services/common.service';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { TriviaCategoryResponse, TriviaCategory } from '../../models/trivia-category';
import { QuizAnswer, QuizResponse, QuizResult } from '../../models/quiz';
import { Difficulty } from '../../models/difficulty-level';

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
  questionDisplayCount: number = 5;
  disabledQuizCreateBtn: boolean = true;

	constructor(private apiService: ApiService, private commonService: CommonService, private router: Router) { 
    this.questionDisplayCount = this.commonService.getQuestionDisplayCount();
    this.categories = this.commonService.getCategories();
  }
  
  ngOnInit(): void {
    if(!this.categories.length) {
      this.getCategoryList();
    }
  }

  getCategoryList() {
    this.apiService.getCategories()
    .subscribe((response: TriviaCategoryResponse) => {
      this.categories = response.trivia_categories;
      this.commonService.setCategories(this.categories);
    });
  }

  dropdownUpdated() {
    if (this.selectedCategory && this.selectedDifficultyLevel) {
      this.disabledQuizCreateBtn = false;
    }
    this.resetQuiz();
  }

  resetQuiz() {
    this.quizList = [];
    this.selectedAnswersCounter = 0;
  }
  
  createQuiz() {
    this.disabledQuizCreateBtn = true;
    this.apiService.getQuizList(this.selectedCategory, this.selectedDifficultyLevel, this.questionDisplayCount)
    .subscribe((response: QuizResponse) => {
      this.quizList = response.results.map((question: QuizResult)=>{
        return this.createAnswerList(question);
      });
    });
  }
  
  createAnswerList(question: QuizResult) {
    let displayAnswers = question.incorrect_answers; 
    displayAnswers.splice(this.generateRandomIndex(4), 0, question.correct_answer); // inserted on random index
    question.answerDisplayed = [];
    for(let i=0; i < displayAnswers.length; i++) {
      question.answerDisplayed.push({answer: displayAnswers[i], isSelected: false, isAnswerCorrect: false });
    }
    return question
  }

  generateRandomIndex(lessThanIndex: number) {
    return Math.floor(lessThanIndex * Math.random()); // get random index (less Than 4) to insert
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
      option.isSelected = true;
      question.selectedAnswerIndex = index;
    }
  }
  
  submitQuiz() {
    this.commonService.saveQuizData(this.quizList);
    this.router.navigate(['/result']);
  }

  trackByIndex(index: number, question: QuizResult) {
    return index;
  }

  returnZero() {
    return 0; // to keep same order as in Enum 
  } 
}
