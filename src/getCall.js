const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

export async function getCall({call_id}) {
  try {
    console.log('Retrieving call via backend:', call_id);
    
    const response = await fetch(`${BACKEND_URL}/api/calls/${call_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (result.success) {
      console.log('Call retrieved successfully:', result.data);
      return result.data;
    } else {
      throw new Error(result.error || 'Failed to retrieve call');
    }
  } catch (error) {
    console.error('Error getting phone call:', error);
    throw error;
  }
}