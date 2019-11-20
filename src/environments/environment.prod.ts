export const environment = {
  production: true,
  environment: $ENV.ENVIRONMENT,
  baseUrl: {
      API_GATEWAY: $ENV.API_GATEWAY,
      MS_AUTH: $ENV.MS_AUTH,
      MS_USER: $ENV.MS_USER,
      MS_QUESTIONS: $ENV.MS_QUESTIONS,
      MS_ANSWERS: $ENV.MS_ANSWERS,
      MS_COMMENTS: $ENV.MS_COMMENTS
  }
};