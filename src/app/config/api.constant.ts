export let api = {
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/add-auth'
    },
    USER: {
        GET_BY_EMAIL: '/api/users/get',
        REGISTER: '/api/users/add',
        SAVE: '/api/users/edit'
    },
    QUESTION: {
        LIST: '/questions/',
        BYID: '/questions/'
    },
    ANSWER: {
        LISTBYQID: '/answers',
        BYID: '/answers/',
        UPVOTE: '/answers/',
        DOWNVOTE: '/answers/'
    },
    COMMENT: {
        LISTBYQID: '/comments/questions/',
        LISTBYAID: 'comments/answers/',
    },
  };
