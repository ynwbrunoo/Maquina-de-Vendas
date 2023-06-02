import axios from "axios";

export async function StoreAnoAnalytics(message) {
  try {
    await axios.post("https://localhost:7280/DadosAnoMessages/PostDadosAnoMessages", {
      ...message,
    });
    console.log(...message);
  } catch (error) {
    console.error(error);
  }
}
