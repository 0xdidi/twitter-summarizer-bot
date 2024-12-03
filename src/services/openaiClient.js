import OpenAI from 'openai';
import { config } from '../config/environment.js';

const openai = new OpenAI({
  apiKey: config.openai.apiKey
});

export async function generateSummary(tweetContent) {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant that summarizes tweets concisely and accurately. Keep summaries brief and engaging."
      },
      {
        role: "user",
        content: `Please summarize this tweet/thread: ${tweetContent}`
      }
    ],
    max_tokens: 150
  });

  return response.choices[0].message.content;
}