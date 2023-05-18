export function StoreAnoAnalytics(message) {
    let storedDadosAnoMessages = JSON.parse(localStorage.getItem('dadosAnoMessages')) || [];
  
    storedDadosAnoMessages.push(...message);
  
    localStorage.setItem('dadosAnoMessages', JSON.stringify(storedDadosAnoMessages));
}