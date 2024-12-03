import { TwitterApi } from 'twitter-api-v2';
import { config } from '../config/environment.js';

const client = new TwitterApi({
  appKey: config.twitter.apiKey,
  appSecret: config.twitter.apiKeySecret,
  accessToken: config.twitter.accessToken,
  accessSecret: config.twitter.accessTokenSecret,
});

export const twitterClient = client.readWrite;