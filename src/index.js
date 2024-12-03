import { twitterClient } from './services/twitterClient.js';
import { handleMention } from './handlers/mentionHandler.js';
import { config } from './config/environment.js';

async function startBot() {
  try {
    console.log('🤖 Starting VebaBot...');

    // Set up rules for filtered stream
    const rules = await twitterClient.v2.streamRules();
    if (rules.data?.length) {
      await twitterClient.v2.updateStreamRules({
        delete: { ids: rules.data.map(rule => rule.id) }
      });
    }

    // Add rule to track mentions of the bot
    await twitterClient.v2.updateStreamRules({
      add: [{ value: `@${config.twitter.botUsername}` }]
    });

    // Start streaming mentions
    const stream = await twitterClient.v2.searchStream({
      'tweet.fields': ['referenced_tweets', 'conversation_id'],
      expansions: ['referenced_tweets.id']
    });

    stream.on('data', async tweet => {
      await handleMention(tweet.data, twitterClient);
    });

    stream.on('error', error => {
      console.error('Stream error:', error);
    });

    console.log('🎉 Bot is running and listening for mentions!');
  } catch (error) {
    console.error('Failed to start bot:', error);
    process.exit(1);
  }
}

startBot();