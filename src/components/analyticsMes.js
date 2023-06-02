import axios from "axios";

export async function StoreMesAnalytics(message) {
  try {
    await axios.post("https://localhost:7280/DadosMesMessages/PostDadosMesMessages", {
      ...message,
    });
    console.log(...message);
  } catch (error) {
    console.error(error);
  }
}
