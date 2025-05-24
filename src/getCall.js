import { client } from './retellClient.js';

export async function getCall({call_id}) {
  try {
    const callResponse = await client.call.retrieve({call_id})
    console.log('Call retrieved successfully:', callResponse);
    return callResponse;
  }
  catch(error) {
    console.error('Error getting phone call:', error);
    throw error;
  }
}