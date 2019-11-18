import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { QuestionConf } from '../config/baseUrl.constant';
import { api } from '../config/api.constant';

@Injectable({
    providedIn: 'root'
})

export class QuestionService {

    constructor(private http: HttpClient) {
    }

    getAllQuestions(): Observable<any> {
        return this.http.get(QuestionConf.BASE_URL + api.QUESTION.LIST).pipe(
            map(result => {
                return result;
            })
        );
    }

    getQuestionById(id: any): Observable<any> {
        return this.http.get(QuestionConf.BASE_URL + api.QUESTION.BYID + id ).pipe(
            map(result => {
                return result;
            })
        );
    }

}
