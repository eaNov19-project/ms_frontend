import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { api } from '../config/api.constant';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class AnswerService {

    constructor(private http: HttpClient) {
    }

    getAnswersByQuestionId(Qid: any): Observable<any> {
        return this.http.get(environment.baseUrl.MS_ANSWERS + api.ANSWER.LISTBYQID + Qid).pipe(
            map(result => {
                return result;
            })
        );
    }

    getAnswerById(id: any): Observable<any> {
        return this.http.get(environment.baseUrl.MS_ANSWERS + api.ANSWER.BYID + id).pipe(
            map(result => {
                return result;
            })
        );
    }

    upvoteAnswer(id: any): Observable<any> {
        return this.http.get(environment.baseUrl.MS_ANSWERS + api.ANSWER.UPVOTE + id).pipe(
            map(result => {
                return result;
            })
        );
    }

    downvoteAnswer(id: any): Observable<any> {
        return this.http.get(environment.baseUrl.MS_ANSWERS + api.ANSWER.DOWNVOTE + id).pipe(
            map(result => {
                return result;
            })
        );
    }

}
