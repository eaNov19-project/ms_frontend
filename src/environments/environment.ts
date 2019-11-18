// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  environment: 'development',
  baseUrl: {
      MS_AUTH: 'http://104.197.96.11:8080',
      MS_USER: 'http://35.192.125.62:8080',
      MS_QUESTIONS: 'http://104.154.33.123:8080',
      MS_ANSWERS: 'http://104.154.33.123:8080',
      MS_COMMENTS: 'http://104.154.33.123:8080'
  }
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
