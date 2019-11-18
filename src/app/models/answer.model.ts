
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
    date: Date;
    upvotes: number;
    topComments: any;
    questionId: string;
    userId: string;
    userName: string;
    active: number;
}
