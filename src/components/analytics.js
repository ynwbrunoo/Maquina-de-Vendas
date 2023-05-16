export function StoreAnalytics(message) {
    let storedAnalyticMessages = JSON.parse(localStorage.getItem('analyticMessages')) || [];
  
    storedAnalyticMessages.push(message);
  
    localStorage.setItem('analyticMessages', JSON.stringify(storedAnalyticMessages));
}