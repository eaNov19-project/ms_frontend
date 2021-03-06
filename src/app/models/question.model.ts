import { CommentQuestion } from './comment.model';
import { Answer } from './answer.model';

export interface QuestionsResult {
    success: string;
    message: string;
    data: {
        questions: Array<Question>
    };
}

export interface QuestionResult {
    success: string;
    message: string;
    data: {
        question: Question
    };
}

export interface Question {
    id: string;
    userId: number;
    userEmail: string;
    title: string;
    body: string;
    created: Date;
    lastEdited: Date;
    upvotes: number;
    topComments: Array<CommentQuestion>;
    topAnswers: Array<Answer>;
    active: number;
}
