# Quick Currency Converter

A modern, fast, and light-weight browser extension that automatically detects and converts currencies in selected text.

## Features

- **Automatic Detection**: Select any text containing a price, and the extension detects the currency automatically.
- **Smart Conversion**: Converts the detected amount to your target currency instantly.
- **Multi-Currency Support**: Supports over 160 currencies with accurate real-time rates.
- **Customizable**:
  - Choose your preferred target currency.
  - Switch between Light and Dark themes.
  - Select display formats (Code, Country, or Both).
  - Multi-language support (English, Turkish, Spanish, German, French, and more).

## Installation

1. Clone this repository.
2. Open your browser's extension management page (e.g., `chrome://extensions`).
3. Enable **Developer Mode**.
4. Click **Load unpacked** and select the extension directory.

## Usage

1. **Select Text**: Highlight any text on a webpage that contains a price (e.g., "$19.99" or "50€").
2. **View Tooltip**: A tooltip will appear near your selection showing the converted amount in your target currency.
3. **Popup Settings**: Click the extension icon to:
   - Change target currency.
   - Toggle the extension on/off.
   - Change theme or language.
   - Customize display format.

## Technologies Used

- HTML5, CSS3, JavaScript (ES6+)
- Chrome Extension API (Manifest V3)
- ExchangeRate-API for real-time currency data

## Privacy

This extension runs locally in your browser. It fetches currency rates from a public API but does not collect or transmit your browsing data.

## License

MIT
