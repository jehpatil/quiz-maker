import { CommonService } from './../common/service/common.service';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-maker',
  templateUrl: './quiz-maker.component.html',
  styleUrls: ['./quiz-maker.component.css']
})
export class QuizMakerComponent implements OnInit {
	categories: any = [];
	difficultyLevels: any = [];
  selectedCategory: number = 0;
  selectedDifficultyLevel: string = ""
  quizList: any  = [];
  questionDisplayCount: number = 5
  selectedAnswersCounter: number = 0;
	constructor(private apiService: ApiService, private commonService: CommonService, private router: Router) { 
    this.questionDisplayCount = this.commonService.getQuestionDisplayCount();
    this.difficultyLevels = this.commonService.getDifficultiesLevel();
  }

  ngOnInit() {
    this.getCategoryList();
  }

  getCategoryList() {
    this.apiService.getCategories()
    .subscribe((response: any) => {
      this.categories = response.trivia_categories;
    });
  }

  resetQuiz() {
    this.quizList = [];
    this.selectedAnswersCounter = 0;
  }
  
  createQuiz() {
    this.apiService.getQuizList(this.selectedCategory, this.selectedDifficultyLevel, this.questionDisplayCount)
    .subscribe((response: any) => {
      this.quizList = response.results.map((item: object)=>{
        return this.createAnswerList(item);
      });
    });
  }
  
  createAnswerList(question: any) {
    let displayAnswers = question.incorrect_answers;
    let randomIndex = Math.floor(3 * Math.random()); // get random index to insert 
    displayAnswers.splice(randomIndex, 0, question.correct_answer); // inserted on radom index
    question.answerDisplayed = [];
    for(let i=0; i < displayAnswers.length; i++) {
      question.answerDisplayed.push({answer: displayAnswers[i], isSelected: false, isAnswerCorrect: false });
    }
    return question
  }
  
  selectAnswer(index: number, ans: any, item: any) {
    if(!ans.isSelected) {
      if(item.selectedAnswerIndex != undefined) { // reset previous selected flags
        item.answerDisplayed[item.selectedAnswerIndex].isSelected = false
      } else {
        if(this.selectedAnswersCounter < this.questionDisplayCount) {
          this.selectedAnswersCounter += 1
        }
      }
      ans.isAnswerCorrect = ans.answer === item.correct_answer ?  true : false;
      ans.isSelected = true;
      item.selectedAnswerIndex = index
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
