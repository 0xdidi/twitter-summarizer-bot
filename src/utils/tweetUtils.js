export async function getTweetThread(client, tweetId) {
  const tweet = await client.v2.get(`tweets/${tweetId}`, {
    expansions: ['referenced_tweets.id'],
    'tweet.fields': ['conversation_id', 'text']
  });

  if (!tweet.data) {
    return '';
  }

  // If it's part of a thread, get the conversation
  if (tweet.data.conversation_id) {
    const conversation = await client.v2.search({
      query: `conversation_id:${tweet.data.conversation_id}`,
      'tweet.fields': ['conversation_id', 'text']
    });

    return conversation.tweets.map(t => t.text).join('\n\n');
  }

  return tweet.data.text;
}