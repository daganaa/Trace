import { client } from './retellClient.js';

export async function makeCall() {
  try {
    const phoneCallResponse = await client.call.createPhoneCall({
        from_number: "+16502755869", 
        to_number: "+14083860151",
        agent_id: "agent_db42b05afc6baff4d47e83ee30" // This is required!
    });

    console.log('Call created successfully:', phoneCallResponse);
    return phoneCallResponse;
  } catch (error) {
    console.error('Error creating phone call:', error);
    throw error;
  }
}

