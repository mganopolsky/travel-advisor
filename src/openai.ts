import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const generateItinerary = async (destination: string, duration: number, startAirport: string, endAirport: string): Promise<string> => {
  const prompt = `Create a 2-week travel itinerary for a trip to ${destination}. Start at ${startAirport} and end at ${endAirport}.`;

  const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
    prompt,
    max_tokens: 150,
  }, {
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    },
  });

  return response.data.choices[0].text.trim();
};
