export function logAndStore(message) {
    let storedLogMessages = JSON.parse(localStorage.getItem('logMessages')) || [];
    let logMessages = [];
    localStorage.setItem('logMessages', JSON.stringify(logMessages));
  
    storedLogMessages.push(message);
  
    localStorage.setItem('logMessages', JSON.stringify(storedLogMessages));
  
    console.log(message);
  }