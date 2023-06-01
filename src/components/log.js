import axios from 'axios';

export async function logAndStore(message) {
  try {
    await axios.post('https://localhost:7280/LogMessages/PostLogMessages', { message });

    console.log(message);
  } catch (error) {
    console.error(error);
  }
}
