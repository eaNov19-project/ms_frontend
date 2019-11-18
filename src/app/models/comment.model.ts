
export interface CommentsAnswerResult {
    success: string;
    message: string;
    data: {
        comments: Array<CommentAnswer>
    };
}

export interface CommentAnswerResult {
    success: string;
    message: string;
    data: {
        comment: CommentAnswer
    };
}

export interface CommentAnswer {
    id: string;
    body: string;
    created: Date;
    userId: string;
    userName: string;
    answerId: string;
    questionId: string;
    active: number;
}

export interface CommentsQuestionResult {
    success: string;
    message: string;
    data: {
        comments: Array<CommentQuestion>
    };
}

export interface CommentQuestionResult {
    success: string;
    message: string;
    data: {
        comment: CommentQuestion
    };
}

export interface CommentQuestion {
    id: string;
    body: string;
    created: Date;
    userId: string;
    userName: string;
    answerId: string;
    questionId: string;
    active: number;
}
