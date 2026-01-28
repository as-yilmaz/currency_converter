let tooltip = null;
let currentSelection = null;
let rates = null;
let targetCurrency = 'TRY';
let isEnabled = true;

const CURRENCY_SYMBOLS = {
    'Dhs': 'AED',
    'Dh': 'AED',
    'د.إ': 'AED',
    'Af': 'AFN',
    'Afs': 'AFN',
    '؋': 'AFN',
    'Lek': 'ALL',
    '֏': 'AMD',
    'ƒ': 'ANG',
    'NAƒ': 'ANG',
    'NAf': 'ANG',
    'f': 'ANG',
    'Kz': 'AOA',
    '$': ['USD', 'CAD', 'AUD', 'NZD', 'HKD', 'SGD', 'MXN', 'ARS', 'CLP', 'COP'],
    'Arg$': 'ARS', 'Au$': 'AUD', 'A$': 'AUD', 'Afl': 'AWG', '₼': 'AZN', 'KM': 'BAM',
    'BB$': 'BBD', 'BBD$': 'BBD', 'BDS$': 'BBD', '৳': 'BDT', 'лв': 'BGN', 'lv': 'BGN',
    '.د.ب': 'BHD', 'BD': 'BHD', 'FBu': 'BIF', 'BD$': 'BMD', 'B$': 'BND', 'Bs': 'BOB',
    'R$': 'BRL', 'Nu': 'BTN', 'P': 'BWP', 'Br': ['BYN', 'ETB'], 'BZ$': 'BZD',
    'CA$': 'CAD', 'Can$': 'CAD', 'C$': ['CAD', 'NIO'], 'FC': ['CDF', 'KMF'],
    '₣': 'CHF', 'CHF': 'CHF', 'CLP$': 'CLP', '¥': ['JPY', 'CNY'], '円': 'JPY', 'CN¥': 'CNY',
    'Col$': 'COP', '₡': 'CRC', '$MN': 'CUP', 'Esc': 'CVE', 'Kč': 'CZK', 'Fdj': 'DJF',
    'kr': ['DKK', 'SEK', 'NOK', 'ISK'],
    'Dkr': 'DKK', 'RD$': 'DOP', 'دج': 'DZD', 'DA': 'DZD', '.ج.م': 'EGP', 'E£': 'EGP',
    '£E': 'EGP', 'LE': 'EGP', 'EGP': 'EGP', 'ናቕፋ': 'ERN', 'ناكفا': 'ERN', 'Nkf': 'ERN',
    'ብር': 'ETB', '€': 'EUR', 'FJ$': 'FJD', '£': ['GBP', 'EGP', 'LBP', 'SYP', 'SDG'], 
    '₾': 'GEL', 'ლ': 'GEL', 'GH₵': 'GHS', 'GH¢': 'GHS', 'D': 'GMD', 'FG': 'GNF',
    'Fr': 'GNF', 'GFr': 'GNF', 'Q': 'GTQ', 'G$': 'GYD', 'GY$': 'GYD', 'HK$': 'HKD',
    '元': 'HKD', 'L': ['HNL', 'MDL'], 'G': 'HTG', 'Ft': 'HUF', 'Rp': 'IDR',
    '₪': 'ILS', '₹': 'INR', 'د.ع': 'IQD', 'ID': 'IQD',
    '﷼': ['IRR', 'SAR', 'QAR', 'YER', 'OMR'], 
    'RI': 'IRR', 'J$': 'JMD', 'د.أ': 'JOD', 'KSh': 'KES', '⃀': 'KGS', 'сом': 'KGS',
    'som': 'KGS', '៛': 'KHR', '₩': 'KRW', 'د.ك': 'KWD', 'KD': 'KWD', 'CI$': 'KYD',
    '₸': 'KZT', '₭': 'LAK', '₭N': 'LAK', 'ل.ل': 'LBP', 'LL': 'LBP', 'රු': 'LKR',
    '௹': 'LKR', 'Rs': ['INR', 'PKR', 'LKR', 'MUR', 'NPR'], 
    'Re': 'LKR', 'L$': 'LRD', 'LD$': 'LRD', 'M': 'LSL', 'ل.د': 'LYD', 'LD': 'LYD',
    'DH': 'MAD', 'Ar': 'MGA', 'ден': 'MKD', 'den': 'MKD', 'Ks': 'MMK', '₮': 'MNT',
    'MOP$': 'MOP', 'UM': 'MRU', 'Rf': 'MVR', 'MVR': 'MVR', 'ރ': 'MVR',
    'K': ['PGK', 'MMK', 'ZMW'], 'Mex$': 'MXN', 'RM': 'MYR', 'MT': 'MZN', 'MTn': 'MZN',
    'N$': 'NAD', '₦': 'NGN', 'रू': 'NPR', 'NZ$': 'NZD', '$NZ': 'NZD',
    'ر.ع.': 'OMR', ' R.O': 'OMR', 'B/.': 'PAB', 'S/': 'PEN', '₱': 'PHP',
    'zł': 'PLN', '₲': 'PYG', 'ر.ق': 'QAR', 'QR': 'QAR', 'Leu': 'RON', 'Lei': 'RON',
    'РСД': 'RSD', 'DIN': 'RSD', 'Din': 'RSD', '₽': 'RUB', 'FRw': 'RWF', 'RF': 'RWF',
    'R₣': 'RWF', 'ر.س': 'SAR', 'SAR': 'SAR', 'SR': ['SAR', 'SCR'], 'SI$': 'SBD',
    'ج.س': 'SDG', 'LS': ['SDG', 'SYP'], 'S$': 'SGD', 'Le': 'SLE', 'Sh.So': 'SOS',
    'Sur$': 'SRD', 'SSP': 'SSP', 'Db': 'STN', 'ل.س': 'SYP', 'SP': 'SYP',
    'E': 'SZL', '฿': 'THB', 'SM': 'TJS', 'm': 'TMT', 'د.ت': 'TND', 'DT': 'TND',
    'T$': 'TOP', 'PT': 'TOP', '₺': 'TRY', 'TL': 'TRY', 'TT$': 'TTD', 'NT$': 'TWD',
    'NT': 'TWD', 'TSh': 'TZS', '₴': 'UAH', 'USh': 'UGX', 'US$': 'USD', 'U$': 'USD',
    '$U': 'UYU', 'soʻm': 'UZS', 'Bs.S': 'VES', '₫': 'VND', 'VT': 'VUV', 'WS$': 'WST',
    'SAT': 'WST', 'ST': 'WST', 'T': 'WST', 'F.CFA': ['XAF', 'XOF'],
    'EC$': 'XCD', 'F': 'XPF', 'R': 'ZAR', 'ZK': 'ZMW'
};
let displayFormat = 'code';

let uiLanguage = 'en';

function loadSettings() {
  chrome.storage.local.get(['rates', 'targetCurrency', 'enabled', 'displayFormat', 'uiLanguage'], (result) => {
    if (result.rates) rates = result.rates;
    if (result.targetCurrency) targetCurrency = result.targetCurrency;
    if (result.enabled !== undefined) isEnabled = result.enabled;
    if (result.displayFormat) displayFormat = result.displayFormat;
    if (result.uiLanguage) uiLanguage = result.uiLanguage;
  });
}

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local') {
    if (changes.rates) rates = changes.rates.newValue;
    if (changes.targetCurrency) targetCurrency = changes.targetCurrency.newValue;
    if (changes.enabled) isEnabled = changes.enabled.newValue;
    if (changes.displayFormat) displayFormat = changes.displayFormat.newValue;
    if (changes.uiLanguage) uiLanguage = changes.uiLanguage.newValue;
  }
});

loadSettings();

document.addEventListener('mouseup', handleSelection);
document.addEventListener('keyup', handleSelection);
document.addEventListener('scroll', () => hideTooltip());
document.addEventListener('mousedown', (e) => {
  if (tooltip && !tooltip.contains(e.target)) {
    hideTooltip();
  }
});

/**
 * Handles text selection events.
 * Validates the selection length and triggers parsing if valid.
 */
function handleSelection(e) {
  if (!isEnabled) return;
  if (tooltip && tooltip.contains(e.target)) return;

  setTimeout(() => {
    const selection = window.getSelection();
    const text = selection.toString().trim();

    if (text.length > 0 && text.length < 50) { 
      parseAndConvert(text, selection);
    }
  }, 100);
}

/**
 * Resolves the currency symbol to a specific currency code (or list of codes).
 * Uses TLD mapping to disambiguate common symbols like '$' or 'kr'.
 */
function resolveCurrency(candidates) {
  if (typeof candidates === 'string') return [candidates];
  if (!Array.isArray(candidates)) return null;
  
  const hostname = window.location.hostname;
  const tldMap = {
      'se': 'SEK', 'dk': 'DKK', 'no': 'NOK', 'is': 'ISK',
      'jp': 'JPY', 'cn': 'CNY', 'uk': 'GBP', 'gb': 'GBP',
      'au': 'AUD', 'ca': 'CAD', 'nz': 'NZD', 'hk': 'HKD', 'sg': 'SGD', 'mx': 'MXN',
      'tr': 'TRY', 'sa': 'SAR', 'qa': 'QAR', 'ir': 'IRR', 'ye': 'YER', 'om': 'OMR',
      'in': 'INR', 'pk': 'PKR', 'lk': 'LKR', 'mu': 'MUR', 'np': 'NPR'
  };
  
  const domainParts = hostname.split('.');
  const tld = domainParts[domainParts.length - 1];
  const domainCurrency = tldMap[tld];
  
  if (domainCurrency && candidates.includes(domainCurrency)) {
      return [domainCurrency];
  }
  
  if (candidates.length <= 5) {
      return candidates;
  }
  
  return [candidates[0]];
}

/**
 * Parses the selected text to extract currency symbol and amount.
 * Converts the amount to the target currency.
 */
function parseAndConvert(text, selection) {
  let cleanText = text.replace(/[\u200E\u200F\u202A-\u202E\u061C]/g, '').trim();
  
  const regex = /^\s*(.*?)\s*(\d[\d.,\s]*\d)\s*(.*?)\s*$/;
  const match = cleanText.match(regex);
  
  if (!match) return;

  const prefixSymbol = match[1];
  const numberPart = match[2];
  const suffixSymbol = match[3];

  if ((!prefixSymbol || prefixSymbol.length > 10) && (!suffixSymbol || suffixSymbol.length > 10)) return;
  if (!prefixSymbol && !suffixSymbol) return;

  let symbol = prefixSymbol || suffixSymbol;
  if (prefixSymbol && suffixSymbol) {
     const isSuffixKnown = CURRENCY_SYMBOLS[suffixSymbol] || (rates && rates[suffixSymbol]);
     const isPrefixKnown = CURRENCY_SYMBOLS[prefixSymbol] || (rates && rates[prefixSymbol]);
     
     if (isSuffixKnown && !isPrefixKnown) symbol = suffixSymbol;
     else if (!isSuffixKnown && isPrefixKnown) symbol = prefixSymbol;
     else symbol = suffixSymbol.length > prefixSymbol.length ? suffixSymbol : prefixSymbol;
  }

  let resolutionOriginal = CURRENCY_SYMBOLS[symbol];
  
  if (!resolutionOriginal && CURRENCY_SYMBOLS[symbol.trim()]) {
      resolutionOriginal = CURRENCY_SYMBOLS[symbol.trim()];
  }
  
  if (!resolutionOriginal && rates && rates[symbol.trim().toUpperCase()]) {
      resolutionOriginal = symbol.trim().toUpperCase();
  }
  
  if (!resolutionOriginal) {
      const cleanSym = symbol.replace(/[.,\s]/g, '');
       if (CURRENCY_SYMBOLS[cleanSym]) resolutionOriginal = CURRENCY_SYMBOLS[cleanSym];
       else if (rates && rates[cleanSym.toUpperCase()]) resolutionOriginal = cleanSym.toUpperCase();
  }

  if (!resolutionOriginal) return;

  const detectedCurrencies = resolveCurrency(resolutionOriginal);
  if (!detectedCurrencies || detectedCurrencies.length === 0) return;

  let amountStr = numberPart.trim().replace(/\s/g, '');
  
  if (amountStr.includes(',') && amountStr.includes('.')) {
      if (amountStr.lastIndexOf(',') > amountStr.lastIndexOf('.')) {
          amountStr = amountStr.replace(/\./g, '').replace(',', '.');
      } else {
          amountStr = amountStr.replace(/,/g, '');
      }
  } else if (amountStr.includes(',')) {
      const parts = amountStr.split(',');
      const lastPart = parts[parts.length - 1];
      if (lastPart.length === 2) {
          amountStr = amountStr.replace(',', '.');
      } else if (parts.length > 1 && lastPart.length === 3) {
          amountStr = amountStr.replace(/,/g, '');
      } else {
           amountStr = amountStr.replace(',', '.');
      }
  }
  else if (amountStr.includes('.')) {
       const parts = amountStr.split('.');
       if (parts.length > 2) {
           amountStr = amountStr.replace(/\./g, '');
       } else if (parts.length === 2 && parts[1].length === 3) {
           const likelyCurrency = detectedCurrencies[0];
           const thousandSeparatorCurrencies = ['TRY', 'EUR', 'PLN', 'BRL', 'IDR', 'CLP', 'COP', 'HRK', 'RON', 'RUB', 'VND', 'DKK', 'SEK', 'NOK', 'ISK'];
           if (thousandSeparatorCurrencies.includes(likelyCurrency)) {
               amountStr = amountStr.replace(/\./g, '');
           }
       }
  }

  const amount = parseFloat(amountStr);
  if (isNaN(amount) || amount === 0) return;

  const results = [];
  
  detectedCurrencies.forEach(sourceCode => {
    if (rates && rates[sourceCode] && rates[targetCurrency]) {
        const rateSource = rates[sourceCode];
        const rateTarget = rates[targetCurrency];
        const inUSD = amount / rateSource;
        const converted = inUSD * rateTarget;
        
        results.push({
            sourceCode: sourceCode,
            sourceAmount: amount,
            targetAmount: converted,
            targetCode: targetCurrency
        });
    }
  });

  if (results.length > 0) {
      showTooltip(results, selection);
  }
}

function getFormattedSource(code, amount) {
  let displayCode = code;
  
  const countryData = window.COUNTRY_CURRENCY_DB.find(c => c.currency === code);
  let countryName = countryData ? countryData.country : code;
  
  if (window.COUNTRY_TRANSLATIONS && window.COUNTRY_TRANSLATIONS[uiLanguage] && window.COUNTRY_TRANSLATIONS[uiLanguage][countryName]) {
      countryName = window.COUNTRY_TRANSLATIONS[uiLanguage][countryName];
  }

  let format = displayFormat || 'code'; 
  
  switch (format) {
    case 'code':
      displayCode = code;
      break;
    case 'country':
      displayCode = countryName;
      break;
    case 'both_code':
      displayCode = `${code} - ${countryName}`;
      break;
    default:
      displayCode = code;
  }
  
  return displayCode;
}

/**
 * Renders and displays the tooltip with conversion results.
 * Positions the tooltip near the selected text.
 */
function showTooltip(results, selection) {
  hideTooltip();

  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();
  
  if (rect.width === 0 && rect.height === 0) return;

  tooltip = document.createElement('div');
  tooltip.className = 'currency-converter-tooltip';
  
  let contentHtml = '<div class="cc-content">';
  
  results.forEach(res => {
      const formattedResult = new Intl.NumberFormat('en-US', { 
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(res.targetAmount);

      const sourceText = getFormattedSource(res.sourceCode, res.sourceAmount);

      contentHtml += `
        <div class="cc-row">
           <span class="cc-currency-code">${sourceText}</span>
           <span class="cc-separator"> >> </span>
           <span class="cc-result">${formattedResult} ${res.targetCode}</span>
        </div>
      `;
  });
  
  contentHtml += '</div><div class="cc-arrow"></div>';
  tooltip.innerHTML = contentHtml;

  document.body.appendChild(tooltip);

  const tooltipRect = tooltip.getBoundingClientRect();
  let top = rect.top + window.scrollY - tooltipRect.height - 10;
  let left = rect.left + window.scrollX + (rect.width - tooltipRect.width) / 2;
  
  if (top < window.scrollY) {
    top = rect.bottom + window.scrollY + 10;
    tooltip.classList.add('cc-bottom');
  } else {
    tooltip.classList.remove('cc-bottom');
  }
  
  if (left < 0) left = 10;
  
  tooltip.style.top = `${top}px`;
  tooltip.style.left = `${left}px`;
  
  requestAnimationFrame(() => {
    tooltip.classList.add('visible');
  });
}


function hideTooltip() {
  if (tooltip) {
    tooltip.classList.remove('visible');
    setTimeout(() => {
      if (tooltip && tooltip.parentNode) {
        tooltip.parentNode.removeChild(tooltip);
      }
      tooltip = null;
    }, 200);
  }
}
