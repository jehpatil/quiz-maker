import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TriviaCategoryResponse } from './common/models/trivia-category';
import { QuizResponse } from './common/models/quiz';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private SERVER_URL: string = "https://opentdb.com";

  constructor(private httpClient: HttpClient) { }

  getCategories(): Observable<TriviaCategoryResponse>  {
		return this.httpClient.get<TriviaCategoryResponse>(this.SERVER_URL + '/api_category.php')
  }
 
  getQuizList(category: number, difficulty: string, amount: number = 5, type: string = 'multiple'): Observable<QuizResponse> {
    let url  = `/api.php?amount=${amount}&type=${type}&category=${category}&difficulty=${difficulty}`
		return this.httpClient.get<QuizResponse>(this.SERVER_URL + url)
  }

}
