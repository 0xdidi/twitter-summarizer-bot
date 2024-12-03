import dotenv from 'dotenv';
dotenv.config();

export const config = {
  twitter: {
    apiKey: process.env.TWITTER_API_KEY,
    apiKeySecret: process.env.TWITTER_API_KEY_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    botUsername: process.env.TWITTER_BOT_USERNAME || 'VebaBot'
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY
  }
};