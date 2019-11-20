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
        LIST: '/questions/',
        ADD: '/questions',
        BYID: '/questions/',
        SEARCH: '/search/'
    },
    ANSWER: {
        LISTBYQID: '/answers',
        BYID: '/answers/',
        UPVOTE: '/answers/',
        DOWNVOTE: '/answers/',
        ADD: '/answers/'
    },
    COMMENT: {
        LISTBYQID: '/comments/questions/',
        LISTBYAID: '/comments/answers/',
        QUESTIONADD: '/comments/questions/',
        ANSWERADD: '/comments/answers/'
    },
  };
