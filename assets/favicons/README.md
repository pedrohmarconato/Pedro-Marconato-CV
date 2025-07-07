# Dynamic Favicon System

This system automatically sets company-specific favicons based on the current page.

## How it works

1. **Auto-detection**: The system detects which company page you're on
2. **Dynamic loading**: Loads the appropriate company favicon
3. **Fallback**: Uses default favicon for general pages

## Supported Companies

- 🏢 **Allos** - Green logo
- 💄 **Grupo Boticário** - Colorful brand logo  
- 🏦 **Sicredi** - Clean corporate logo
- 🍔 **iFood** - Red delivery logo
- 💼 **ContaAzul** - Blue business logo
- 📊 **RD Station** - Orange marketing logo
- 👤 **General** - Default Pedro logo

## Usage

### Automatic (Recommended)
The system automatically detects and sets favicons. Just include the script:

```html
<script src="assets/js/dynamic-favicon.js"></script>
```

### Manual Control
```javascript
// Set specific company favicon
DynamicFavicon.setFavicon('sicredi');

// Detect current company
const company = DynamicFavicon.detectCompany();

// Get favicon data
const faviconData = DynamicFavicon.getFaviconData('allos');
```

## Files Generated

- `assets/favicons/*.svg` - Company SVG favicons
- `assets/favicons/*-favicon.html` - HTML snippets for each company
- `assets/js/dynamic-favicon.js` - Main favicon system
- `favicon-manifest.json` - Complete favicon mapping

## Browser Support

- ✅ Chrome, Firefox, Safari, Edge (SVG favicons)
- ✅ Internet Explorer (PNG fallbacks)
- ✅ Mobile browsers (Apple touch icons)
- ✅ PWA support (Web App Manifest)

## Performance

- 📦 **Tiny size**: SVG favicons are ~1-3KB each
- ⚡ **Fast loading**: Data URIs load instantly
- 🎯 **Smart caching**: Browser handles caching automatically
- 📱 **Mobile optimized**: Includes all mobile icon sizes
