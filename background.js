const API_URL = 'https://api.exchangerate-api.com/v4/latest/USD';
const UPDATE_INTERVAL = 24 * 60 * 60 * 1000;

chrome.runtime.onInstalled.addListener(async () => {
  const { targetCurrency } = await chrome.storage.local.get('targetCurrency');
  
  if (!targetCurrency) {
    const lang = chrome.i18n.getUILanguage();
    let defaultCurrency = 'USD';
    
    if (lang.startsWith('tr')) defaultCurrency = 'TRY';
    else if (lang.startsWith('en-GB')) defaultCurrency = 'GBP';
    else if (lang.startsWith('de') || lang.startsWith('fr') || lang.startsWith('it') || lang.startsWith('es')) defaultCurrency = 'EUR';
    else if (lang.startsWith('jp')) defaultCurrency = 'JPY';
    
    await chrome.storage.local.set({ 
      targetCurrency: defaultCurrency,
      theme: 'system',
      enabled: true
    });
  }

  updateRates();
});

chrome.alarms.create('updateRates', { periodInMinutes: 1440 });

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'updateRates') {
    updateRates();
  }
});

/**
 * Fetches the latest exchange rates from the API and stores them in local storage.
 * Updates the last update timestamp.
 */
async function updateRates() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('API yanıt vermedi');
    
    const data = await response.json();
    const rates = data.rates;
    const lastUpdate = Date.now();
    
    await chrome.storage.local.set({ rates, lastUpdate });
    console.log('Döviz kurları güncellendi:', lastUpdate);
  } catch (error) {
    console.error('Döviz kuru güncellenemedi:', error);
  }
}

// Listener for messages from content scripts or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'getRates') {
    chrome.storage.local.get(['rates', 'lastUpdate'], (result) => {
      // Check if rates need a refresh (missing or older than interval)
      if (!result.rates || (Date.now() - result.lastUpdate > UPDATE_INTERVAL)) {
        updateRates().then(() => {
          chrome.storage.local.get(['rates'], (newResult) => {
            sendResponse({ rates: newResult.rates });
          });
        });
        return true; // Keep channel open for async response
      }
      sendResponse({ rates: result.rates });
    });
    return true;
  }
});
