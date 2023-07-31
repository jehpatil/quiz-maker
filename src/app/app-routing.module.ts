import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizMakerComponent } from './quiz-maker/quiz-maker.component';
import { QuizResultComponent } from './quiz-result/quiz-result.component';

const routes: Routes = [
  { path: 'quiz-maker', component: QuizMakerComponent },
  { path: 'quiz-result', component: QuizResultComponent },
  { path: '', redirectTo: 'quiz-maker', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
