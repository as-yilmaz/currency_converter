document.addEventListener('DOMContentLoaded', () => {
  const targetCurrencySelect = document.getElementById('target-currency');
  const languageSelect = document.getElementById('language-select');
  const themeSelect = document.getElementById('theme-select');
  const extensionToggle = document.getElementById('extension-toggle');
  const displayFormatSelect = document.getElementById('display-format');

  const uiElements = {
    app_title: document.getElementById('app_title'),
    lbl_language: document.getElementById('lbl_language'),
    lbl_display_format: document.getElementById('lbl_display_format'),
    lbl_target_currency: document.getElementById('lbl_target_currency'),
    lbl_theme: document.getElementById('lbl_theme'),
    footer_text: document.getElementById('footer_text'),
    opt_format_code: document.getElementById('opt_format_code'),
    opt_format_country: document.getElementById('opt_format_country'),
    opt_format_both: document.getElementById('opt_format_both'),
    opt_theme_system: document.getElementById('opt_theme_system'),
    opt_theme_light: document.getElementById('opt_theme_light'),
    opt_theme_dark: document.getElementById('opt_theme_dark')
  };

  const COUNTRY_TO_CURRENCY = {
    'TR': 'TRY', 'US': 'USD', 'GB': 'GBP', 'DE': 'EUR', 'FR': 'EUR', 'IT': 'EUR', 'ES': 'EUR',
    'JP': 'JPY', 'CN': 'CNY', 'RU': 'RUB', 'AZ': 'AZN', 'SA': 'SAR', 'AE': 'AED', 'KR': 'KRW',
    'IN': 'INR', 'CA': 'CAD', 'AU': 'AUD', 'BR': 'BRL', 'MX': 'MXN', 'PL': 'PLN', 'SE': 'SEK',
    'CH': 'CHF', 'NL': 'EUR', 'BE': 'EUR', 'AT': 'EUR', 'GR': 'EUR', 'PT': 'EUR', 'IE': 'EUR',
    'FI': 'EUR', 'DK': 'DKK', 'NO': 'NOK', 'CZ': 'CZK', 'HU': 'HUF', 'RO': 'RON', 'BG': 'EUR',
    'HR': 'EUR', 'UA': 'UAH', 'TH': 'THB', 'VN': 'VND', 'ID': 'IDR', 'MY': 'MYR', 'SG': 'SGD',
    'HK': 'HKD', 'TW': 'TWD', 'PH': 'PHP', 'ZA': 'ZAR', 'EG': 'EGP', 'IL': 'ILS', 'NZ': 'NZD',
    'AR': 'ARS', 'CL': 'CLP', 'CO': 'COP', 'PE': 'PEN', 'QA': 'QAR', 'KW': 'KWD', 'BH': 'BHD',
    'OM': 'OMR', 'JO': 'JOD', 'LB': 'LBP', 'IQ': 'IQD', 'KZ': 'KZT', 'UZ': 'UZS', 'BY': 'BYN',
    'RS': 'RSD', 'BA': 'BAM', 'MK': 'MKD', 'AL': 'ALL', 'GE': 'GEL', 'AM': 'AMD', 'MD': 'MDL'
  };

  const ALL_CURRENCIES = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'TRY', name: 'Turkish Lira', symbol: '₺' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
    { code: 'RUB', name: 'Russian Ruble', symbol: '₽' },
    { code: 'AZN', name: 'Azerbaijani Manat', symbol: '₼' },
    { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼' },
    { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ' },
    { code: 'KRW', name: 'South Korean Won', symbol: '₩' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'CA$' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
    { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' },
    { code: 'MXN', name: 'Mexican Peso', symbol: 'Mex$' },
    { code: 'PLN', name: 'Polish Zloty', symbol: 'zł' },
    { code: 'SEK', name: 'Swedish Krona', symbol: 'kr' },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr' },
    { code: 'DKK', name: 'Danish Krone', symbol: 'kr' },
    { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr' },
    { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč' },
    { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft' },
    { code: 'RON', name: 'Romanian Leu', symbol: 'lei' },
    { code: 'BGN', name: 'Bulgarian Lev', symbol: 'лв' }, 
    { code: 'UAH', name: 'Ukrainian Hryvnia', symbol: '₴' },
    { code: 'THB', name: 'Thai Baht', symbol: '฿' },
    { code: 'VND', name: 'Vietnamese Dong', symbol: '₫' },
    { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp' },
    { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM' },
    { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' },
    { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$' },
    { code: 'TWD', name: 'New Taiwan Dollar', symbol: 'NT$' },
    { code: 'PHP', name: 'Philippine Peso', symbol: '₱' },
    { code: 'ZAR', name: 'South African Rand', symbol: 'R' },
    { code: 'EGP', name: 'Egyptian Pound', symbol: 'E£' },
    { code: 'ILS', name: 'Israeli New Shekel', symbol: '₪' },
    { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$' },
    { code: 'KWD', name: 'Kuwaiti Dinar', symbol: 'KD' },
    { code: 'QAR', name: 'Qatari Riyal', symbol: 'QR' },
  ];

  /**
   * Populates the language selection dropdown.
   * Sorts languages: Browser Language > Top 10 > Others.
   */
  function populateLanguages() {
    const browserLang = navigator.language.split('-')[0];
    const languages = window.AVAILABLE_LANGUAGES || []; 

    const top10Codes = ['en', 'es', 'zh', 'de', 'fr', 'ru', 'pt', 'ja', 'it', 'tr'];
    
    let browserLangObj = languages.find(l => l.code === browserLang);
    if (!browserLangObj) {
        browserLangObj = { code: browserLang, name: `${browserLang.toUpperCase()} (System)` };
    }

    const top10Langs = languages.filter(l => top10Codes.includes(l.code) && l.code !== browserLang);
    const otherLangs = languages.filter(l => !top10Codes.includes(l.code) && l.code !== browserLang);
    
    const finalLangList = [];
    
    const supportedBrowserLang = languages.find(l => l.code === browserLang);
    if (supportedBrowserLang) {
        finalLangList.push(supportedBrowserLang);
        finalLangList.push({ separator: true });
    }

    top10Langs.forEach(l => finalLangList.push(l));
    
    if (top10Langs.length > 0 && otherLangs.length > 0) {
        finalLangList.push({ separator: true });
    }

    otherLangs.forEach(l => finalLangList.push(l));

    if (languageSelect) {
      languageSelect.innerHTML = '';
      
      finalLangList.forEach(item => {
        if (item.separator) {
            const separator = document.createElement('option');
            separator.disabled = true;
            separator.text = '──────────';
            languageSelect.add(separator);
        } else {
            const option = document.createElement('option');
            option.value = item.code;
            option.text = item.name;
            if (item.code === browserLang) {
                option.style.fontWeight = 'bold';
            }
            languageSelect.add(option);
        }
      });
      
      chrome.storage.local.get(['uiLanguage'], (result) => {
        if (result.uiLanguage) {
          languageSelect.value = result.uiLanguage;
        } else {
          if (languages.find(l => l.code === browserLang)) {
              languageSelect.value = browserLang;
          } else {
              languageSelect.value = 'en';
          }
        }
        updateTranslations(languageSelect.value);
      });
    }
  }

  function updateTranslations(langCode) {
    if (!window.TRANSLATIONS) return;

    const t = window.TRANSLATIONS[langCode] || window.TRANSLATIONS['en'];

    if (uiElements.app_title) uiElements.app_title.textContent = t.app_title;
    if (uiElements.lbl_language) uiElements.lbl_language.textContent = t.lbl_language;
    if (uiElements.lbl_display_format) uiElements.lbl_display_format.textContent = t.lbl_display_format;
    if (uiElements.lbl_target_currency) uiElements.lbl_target_currency.textContent = t.lbl_target_currency;
    if (uiElements.lbl_theme) uiElements.lbl_theme.textContent = t.lbl_theme;
    if (uiElements.footer_text) uiElements.footer_text.textContent = t.footer_text;
    
    if (uiElements.opt_format_code) uiElements.opt_format_code.textContent = t.opt_format_code;
    if (uiElements.opt_format_country) uiElements.opt_format_country.textContent = t.opt_format_country;
    if (uiElements.opt_format_both) uiElements.opt_format_both.textContent = t.opt_format_both;

    if (uiElements.opt_theme_system) uiElements.opt_theme_system.textContent = t.opt_theme_system;
    if (uiElements.opt_theme_light) uiElements.opt_theme_light.textContent = t.opt_theme_light;
    if (uiElements.opt_theme_dark) uiElements.opt_theme_dark.textContent = t.opt_theme_dark;
  }

  /**
   * Populates the currency selection dropdown.
   * Prioritizes local currency and top 4 major currencies using separators.
   */
  function populateCurrencies() {
    const browserLang = navigator.language; 
    const countryCode = browserLang.split('-')[1] || browserLang.split('-')[0].toUpperCase();
    let localCurrencyCode = COUNTRY_TO_CURRENCY[countryCode] || 'USD';
    
    const top4Currencies = ['USD', 'EUR', 'GBP', 'JPY'].filter(c => c !== localCurrencyCode);
    const otherCurrencies = ALL_CURRENCIES.filter(c => c.code !== localCurrencyCode && !top4Currencies.includes(c.code));
    
    if (targetCurrencySelect) {
      targetCurrencySelect.innerHTML = '';

      const localCurr = ALL_CURRENCIES.find(c => c.code === localCurrencyCode) || { code: localCurrencyCode, name: localCurrencyCode, symbol: '' };
      const localOpt = new Option(`📍 ${localCurr.name} (${localCurr.code})`, localCurr.code);
      localOpt.style.fontWeight = 'bold';
      targetCurrencySelect.add(localOpt);

      const sep1 = document.createElement('option');
      sep1.disabled = true;
      sep1.text = '──────────';
      targetCurrencySelect.add(sep1);

      top4Currencies.forEach(code => {
        const curr = ALL_CURRENCIES.find(c => c.code === code);
        if (curr) {
          targetCurrencySelect.add(new Option(`⭐️ ${curr.name} (${curr.code})`, curr.code));
        }
      });

      const sep2 = document.createElement('option');
      sep2.disabled = true;
      sep2.text = '──────────';
      targetCurrencySelect.add(sep2);

      otherCurrencies.sort((a, b) => a.name.localeCompare(b.name)).forEach(curr => {
        targetCurrencySelect.add(new Option(`${curr.name} (${curr.code})`, curr.code));
      });
    }
  }

  populateLanguages();
  populateCurrencies();

  chrome.storage.local.get(['targetCurrency', 'theme', 'enabled', 'uiLanguage', 'displayFormat'], (result) => {
    if (result.targetCurrency && targetCurrencySelect) targetCurrencySelect.value = result.targetCurrency;
    if (result.theme && themeSelect) {
       themeSelect.value = result.theme;
       applyTheme(result.theme);
    }
    if (result.enabled !== undefined && extensionToggle) extensionToggle.checked = result.enabled;
    if (result.displayFormat && displayFormatSelect) displayFormatSelect.value = result.displayFormat;
  });

  if (targetCurrencySelect) {
    targetCurrencySelect.addEventListener('change', () => {
      chrome.storage.local.set({ targetCurrency: targetCurrencySelect.value });
    });
  }

  if (displayFormatSelect) {
    displayFormatSelect.addEventListener('change', () => {
      chrome.storage.local.set({ displayFormat: displayFormatSelect.value });
    });
  }

  if (languageSelect) {
    languageSelect.addEventListener('change', () => {
      const selectedLang = languageSelect.value;
      chrome.storage.local.set({ uiLanguage: selectedLang });
      updateTranslations(selectedLang);
    });
  }

  if (themeSelect) {
    themeSelect.addEventListener('change', () => {
      chrome.storage.local.set({ theme: themeSelect.value });
      applyTheme(themeSelect.value);
    });
  }

  if (extensionToggle) {
    extensionToggle.addEventListener('change', () => {
      chrome.storage.local.set({ enabled: extensionToggle.checked });
    });
  }

  function applyTheme(theme) {
    if (theme === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
    } else {
      document.body.setAttribute('data-theme', theme);
    }
  }
});
