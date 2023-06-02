import axios from "axios";

export async function StoreDiaAnalytics(message) {
  try {
    await axios.post("https://localhost:7280/DadosDiaMessages/PostDadosDiaMessages", {
      ...message,
    });
    console.log(...message);
  } catch (error) {
    console.error(error);
  }
}
