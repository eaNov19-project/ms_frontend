import { CommentAnswer } from './comment.model';

export interface AnswersResult {
    success: string;
    message: string;
    data: {
        answers: Array<Answer>
    };
}

export interface AnswerResult {
    success: string;
    message: string;
    data: {
        answer: Answer
    };
}

export interface Answer {
    id: string;
    body: string;
    created: Date;
    votes: number;
    topComments: Array<CommentAnswer>;
    questionId: string;
    userId: string;
    userName: string;
    active: number;
}
