const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      $ENV: {
        ENVIRONMENT: JSON.stringify(process.env.ENVIRONMENT),
        MS_AUTH: JSON.stringify(process.env.MS_AUTH),
        MS_USER: JSON.stringify(process.env.MS_USER),
        MS_QUESTIONS: JSON.stringify(process.env.MS_QUESTIONS),
        MS_ANSWERS: JSON.stringify(process.env.MS_ANSWERS),
        MS_COMMENTS: JSON.stringify(process.env.MS_COMMENTS)
      }
    })
  ]
};