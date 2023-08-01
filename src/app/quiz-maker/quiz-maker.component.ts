import { CommonService } from './../common/service/common.service';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { DifficultyLevels, TriviaCategoryResponse, TriviaCategory } from '../common/interface/trivia-category';
import { QuizAnswer, QuizResponse, QuizResult } from '../common/interface/quiz';

@Component({
  selector: 'app-quiz-maker',
  templateUrl: './quiz-maker.component.html',
  styleUrls: ['./quiz-maker.component.css']
})
export class QuizMakerComponent {
	categories: TriviaCategory[] = []
	difficultyLevels: DifficultyLevels[] = [];
  selectedCategory: number = 0;
  selectedDifficultyLevel: string = ""
  quizList: QuizResult[]  = [];
  questionDisplayCount: number = 5
  selectedAnswersCounter: number = 0;
	constructor(private apiService: ApiService, private commonService: CommonService, private router: Router) { 
    this.questionDisplayCount = this.commonService.getQuestionDisplayCount();
    this.difficultyLevels = this.commonService.getDifficultiesLevel();
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
    const randomIndex = Math.floor(3 * Math.random()); // get random index to insert 
    displayAnswers.splice(randomIndex, 0, question.correct_answer); // inserted on radom index
    question.answerDisplayed = [];
    for(let i=0; i < displayAnswers.length; i++) {
      question.answerDisplayed.push({answer: displayAnswers[i], isSelected: false, isAnswerCorrect: false });
    }
    return question
  }
  
  selectAnswer(index: number, option: QuizAnswer, question: QuizResult) {
    if(!option.isSelected) {
      if(question.selectedAnswerIndex != undefined && question.answerDisplayed) { // reset previous selected flags
        question.answerDisplayed[question.selectedAnswerIndex].isSelected = false
      } else {
        if(this.selectedAnswersCounter < this.questionDisplayCount) {
          this.selectedAnswersCounter += 1
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

  trackByIndex(index: number) {
    return index;
  }
}
