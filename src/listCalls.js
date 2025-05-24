const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

export async function listCalls() {
  try {
    console.log('Listing all calls via backend');
    
    const response = await fetch(`${BACKEND_URL}/api/calls`, {
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
      console.log('Calls listed successfully:', result.data);
      return result.data;
    } else {
      throw new Error(result.error || 'Failed to list calls');
    }
  } catch (error) {
    console.error('Error listing calls:', error);
    throw error;
  }
}