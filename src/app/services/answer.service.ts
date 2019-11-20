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

    addAnswer(answerObj: object, QID:any): Observable<{ token: string }> {
        return this.http.post<{ token: string }>(environment.baseUrl.API_GATEWAY + api.ANSWER.ADD + QID, answerObj);
    }
    upVoteAnswer(answerId: any):  Observable<{ token: string }> {
        return this.http.patch<{ token: string }>(environment.baseUrl.API_GATEWAY + "/answers/" + answerId + api.ANSWER.UPVOTE, {}).pipe(
            map(result => {
                return result;
            })
        );
    }

    downVoteAnswer(answerId: any):  Observable<{ token: string }> {
        return this.http.patch<{ token: string }>(environment.baseUrl.API_GATEWAY + "/answers/" + answerId + api.ANSWER.DOWNVOTE, {}).pipe(
            map(result => {
                return result;
            })
        );
    }


}
