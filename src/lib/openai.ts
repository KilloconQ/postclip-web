import OpenAI from 'openai';
const client = new OpenAI();

const response = await client.responses.create({
  model: 'gpt-4.1',
  input:
    'Improve this post for X and Bluesky it must be less than 280 characters. Do not use hashtags or emojis. Make it more engaging and concise. ',
});

console.log(response.output_text);
