import Airtable from 'airtable';
import dotenv from 'dotenv';

dotenv.config();



if (process.env.AIRTABLE_BASE_ID == null){
    throw Error("Airtable Base name not provided!")
}

if (process.env.AIRTABLE_API_KEY == null){
    throw Error("Airtable API Key not provided")
}

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);
const TRIP_TABLE_NAME = "trip"

interface TravelRequest {
  id: string;
  Destination: string;
  Duration: number;
  'Start Airport Code': string;
  'End Airport Code': string;
  Itinerary?: string;
}

export const getTravelRequests = async (): Promise<TravelRequest[]> => {
  const records = await base(TRIP_TABLE_NAME).select().all();
  return records.map(record => ({
    id: record.id,
    ...record.fields,
  } as TravelRequest));
};

export const updateItinerary = async (recordId: string, itinerary: string): Promise<void> => {
  await base(TRIP_TABLE_NAME).update(recordId, { Itinerary: itinerary });
};
