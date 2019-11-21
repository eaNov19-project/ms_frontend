export let api = {
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/add-auth'
    },
    USER: {
        GET_BY_EMAIL: '/api/users/get',
        REGISTER: '/api/users/add',
        SAVE: '/api/users/edit',
        GET_BY_EMAIL_V2: '/users/get',
        REGISTER_V2: '/users/add',
        SAVE_V2: '/users/edit'
    },
    QUESTION: {
        BASE: '/questions/',
        LIST: '/questions/',
        LIST_BY_USER: '/questions/users/',
        ADD: '/questions/',
        BYID: '/questions/',
        SEARCH: '/search/',
        UPVOTE: '/upvote',
        DOWNVOTE: '/downvote',
        FOLLOW: '/follow',
        CHECK_FOLLOW: '/checkfollowing',
        QUESTION_COMMENTS: '/comments/questions/',
        ELASTIC_SEARCH: '/elastic-search/search/'
    },
    ANSWER: {
        LISTBYQID: '/answers/question/',
        LIST_BY_USER: '/answers/users/',
        BYID: '/answers/',
        UPVOTE: '/upvote',
        DOWNVOTE: '/downvote',
        ADD: '/answers/',
        ANSWER_COMMENTS: '/comments/answers/'
    },
    COMMENT: {
        LISTBYQID: '/comments/questions/',
        LISTBYAID: '/comments/answers/',
        QUESTIONADD: '/comments/questions/',
        ANSWERADD: '/comments/answers/'
    },
  };
