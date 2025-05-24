const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

export async function makeCall() {
  try {
    console.log('Creating call via backend');
    
    const response = await fetch(`${BACKEND_URL}/api/calls/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from_number: "+16502755869", 
        to_number: "+14083860151",
        agent_id: "agent_db42b05afc6baff4d47e83ee30"
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (result.success) {
      console.log('Call created successfully:', result.data);
      return result.data;
    } else {
      throw new Error(result.error || 'Failed to create call');
    }
  } catch (error) {
    console.error('Error creating phone call:', error);
    throw error;
  }
}

