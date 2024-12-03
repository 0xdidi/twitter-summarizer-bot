import { generateSummary } from '../services/openaiClient.js';
import { getTweetThread } from '../utils/tweetUtils.js';
import { config } from '../config/environment.js';

export async function handleMention(tweet, client) {
  try {
    // Check if the mention includes the summarize keyword
    const tweetText = tweet.text.toLowerCase();
    if (!tweetText.includes('summarize')) {
      return;
    }

    // Get the tweet being replied to
    const referencedTweet = tweet.referenced_tweets?.[0];
    if (!referencedTweet) {
      await client.v2.reply(
        'Please mention me in a reply to the tweet you want to summarize!',
        tweet.id
      );
      return;
    }

    // Get the full thread content
    const threadContent = await getTweetThread(client, referencedTweet.id);
    
    // Generate summary using OpenAI
    const summary = await generateSummary(threadContent);

    // Reply with the summary
    await client.v2.reply(summary, tweet.id);
  } catch (error) {
    console.error('Error handling mention:', error);
    await client.v2.reply(
      'Sorry, I encountered an error while generating the summary.',
      tweet.id
    );
  }
}