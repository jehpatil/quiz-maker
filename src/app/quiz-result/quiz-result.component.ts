import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonService } from '../common/services/common.service';
import { QuizResult } from '../common/models/quiz';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.css']
})
export class QuizResultComponent implements OnInit {
  quizList: QuizResult[]  = [];
  scored: number = 0
  questionDisplayCount: number = 5

  constructor(private apiService: ApiService, private commonService: CommonService, private router: Router) {
    this.questionDisplayCount = this.commonService.getQuestionDisplayCount();
    this.quizList = this.commonService.getQuizData();
   }

  ngOnInit() {
    if(this.quizList.length) {
      this.calculateScore();
    } else {
      this.router.navigate(['/quiz-maker']);
    }
  }

  calculateScore() {
    for(let i=0; i< this.quizList.length; i++) {
      const question = this.quizList[i];
      if(question.answerDisplayed) {
        for(let j=0; j < question.answerDisplayed.length; j++) {
          const answer = question.answerDisplayed[j];
          if(answer.isAnswerCorrect) {
            this.scored += 1
          }
        }
      }
    }
  }

  setScoredColor() {
    if(this.scored <= 1) {
      return "red"
    } else if(this.scored >= 4){
      return "green"
    } else {
      return "yellow"
    }
  }

  trackByIndex(index: number) {
    return index;
  }
}
