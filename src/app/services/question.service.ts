import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { api } from '../config/api.constant';
import { environment } from 'src/environments/environment';
import { Token } from '@angular/compiler/src/ml_parser/lexer';

@Injectable({
    providedIn: 'root'
})

export class QuestionService {

    constructor(private http: HttpClient) {
    }

    getAllQuestions(): Observable<any> {
        return this.http.get(environment.baseUrl.API_GATEWAY + api.QUESTION.LIST).pipe(
            map(result => {
                return result;
            })
        );
    }
    getQuestionsByUser(userId): Observable<any> {
        return this.http.get(environment.baseUrl.API_GATEWAY + api.QUESTION.LIST_BY_USER + userId).pipe(
            map(result => {
                return result;
            })
        );
    }

    getQuestionById(id: any): Observable<any> {
        return this.http.get(environment.baseUrl.API_GATEWAY + api.QUESTION.BYID + id).pipe(
            map(result => {
                return result;
            })
        );
    }

    addQuestion(questionObj: object): Observable<{ token: string }> {
        return this.http.post<{ token: string }>(environment.baseUrl.API_GATEWAY + api.QUESTION.ADD, questionObj);
    }

    searchQuestion(query: any): Observable<any> {
        return this.http.get(environment.baseUrl.API_GATEWAY + api.QUESTION.SEARCH + query).pipe(
            map(result => {
                return result;
            })
        );
    }

}
