import express from 'express';
import bodyParser from 'body-parser';
import { updateItinerary } from './airtable';
import { generateItinerary } from './openai';

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Webhook endpoint
app.post('/api/webhook', async (req, res) => {
  const { recordId, destination, duration, startAirport, endAirport } = req.body;

  try {
    // Generate itinerary using OpenAI
    const itinerary = await generateItinerary(destination, duration, startAirport, endAirport);

    // Update Airtable record with generated itinerary
    await updateItinerary(recordId, itinerary);

    res.status(200).send('Itinerary generated and saved successfully.');
  } catch (error) {
    console.error('Error generating itinerary:', error);
    res.status(500).send('Error generating itinerary.');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
