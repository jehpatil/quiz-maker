import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private SERVER_URL: string = "https://opentdb.com";

  constructor(private httpClient: HttpClient) { }

  getCategories() {
		return this.httpClient.get(this.SERVER_URL + '/api_category.php')
  }
 
  getQuizList(category: number, difficulty: string, amount: number = 5, type: string = 'multiple') {
    let url  = `/api.php?amount=${amount}&type=${type}&category=${category}&difficulty=${difficulty}`
		return this.httpClient.get(this.SERVER_URL + url)
  }

}
