import OpenAI from 'openai';

const client = new OpenAI();

export async function improvePost(input: string): Promise<string> {
  const response = await client.responses.create({
    model: 'gpt-4.1',
    input: `Improve this post for X and Bluesky it must be less than 280 characters. Do not use hashtags or emojis. Make it more engaging and concise. ${input}`,
  });
  return response.output_text;
}
