import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizMakerComponent } from './components/quiz-maker/quiz-maker.component';
import { QuizResultComponent } from './components/quiz-result/quiz-result.component';

const routes: Routes = [
  { path: 'create', component: QuizMakerComponent },
  { path: 'result', component: QuizResultComponent },
  { path: '', redirectTo: 'create', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
