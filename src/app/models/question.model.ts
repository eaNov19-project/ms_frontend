
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
    title: string;
    body: string;
    created: Date;
    lastEdited: Date;
    upvotes: number;
    topComments: any;
    topAnswers: any;
    active: any;
}
