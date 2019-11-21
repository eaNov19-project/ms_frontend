import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { api } from '../config/api.constant';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class CommentService {

    constructor(private http: HttpClient) {
    }

    getAllCommentsByQuestionId(Qid: any): Observable<any> {
        return this.http.get(environment.baseUrl.MS_COMMENTS + api.COMMENT.LISTBYQID + Qid).pipe(
            map(result => {
                return result;
            })
        );
    }

    getAllCommentsByAnswerId(Aid: any): Observable<any> {
        return this.http.get(environment.baseUrl.MS_COMMENTS + api.COMMENT.LISTBYQID + Aid).pipe(
            map(result => {
                return result;
            })
        );
    }

    addQuestionComment(questionCommentObj: object, subjectId: string): Observable<any> {
        return this.http.post<{ token: string }>(environment.baseUrl.API_GATEWAY + api.COMMENT.QUESTIONADD + subjectId, questionCommentObj);
    }
    addAnswerComment(answerCommentObj: object, subjectId: string): Observable<any> {
        return this.http.post<{ token: string }>(environment.baseUrl.API_GATEWAY + api.COMMENT.ANSWERADD + subjectId, answerCommentObj);
    }

}
