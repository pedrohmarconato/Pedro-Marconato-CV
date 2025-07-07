#!/usr/bin/env python3
"""
Favicon Integration Script
Automatically adds favicon support to all HTML templates
"""

import os
from pathlib import Path
import re

def update_html_files():
    """Update all HTML files to include dynamic favicon system"""
    
    # Favicon script tag to add
    favicon_script = '''    <!-- Dynamic Favicon System -->
    <script src="assets/js/dynamic-favicon.js"></script>'''
    
    # Meta tags for better favicon support
    favicon_meta = '''    <!-- Favicon Meta Tags -->
    <meta name="theme-color" content="#1a4b84">
    <meta name="msapplication-TileColor" content="#1a4b84">
    <meta name="msapplication-config" content="assets/favicons/browserconfig.xml">'''
    
    # Find all HTML files
    html_files = []
    
    # Root directory files
    root_files = ['index.html', 'index-optimized.html', 'cv_general.html', 'door-transition.html']
    for file in root_files:
        if Path(file).exists():
            html_files.append(Path(file))
    
    # Template files
    template_dirs = ['templates/companies', 'cv_styles']
    for template_dir in template_dirs:
        template_path = Path(template_dir)
        if template_path.exists():
            html_files.extend(template_path.glob('*.html'))
    
    print(f"Found {len(html_files)} HTML files to update:")
    
    for html_file in html_files:
        try:
            # Read file content
            with open(html_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Skip if already has dynamic favicon
            if 'dynamic-favicon.js' in content:
                print(f"  ⏭️  {html_file} - Already has dynamic favicon")
                continue
            
            # Add meta tags before </head>
            if '</head>' in content and 'theme-color' not in content:
                content = content.replace('</head>', f'{favicon_meta}\n</head>')
            
            # Add script before </body> or before </html>
            if '</body>' in content:
                content = content.replace('</body>', f'{favicon_script}\n</body>')
            elif '</html>' in content:
                content = content.replace('</html>', f'{favicon_script}\n</html>')
            else:
                # Add to end of file
                content += f'\n{favicon_script}'
            
            # Fix relative paths for nested files
            if 'templates/' in str(html_file) or 'cv_styles/' in str(html_file):
                # Update script path for nested directories
                content = content.replace('src="assets/js/dynamic-favicon.js"', 'src="../../assets/js/dynamic-favicon.js"')
            
            # Write updated content
            with open(html_file, 'w', encoding='utf-8') as f:
                f.write(content)
            
            print(f"  ✅ {html_file} - Updated with dynamic favicon")
            
        except Exception as e:
            print(f"  ❌ {html_file} - Error: {e}")

def create_browserconfig():
    """Create browserconfig.xml for Windows tiles"""
    browserconfig = '''<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
    <msapplication>
        <tile>
            <square150x150logo src="assets/favicons/general-150x150.png"/>
            <TileColor>#1a4b84</TileColor>
        </tile>
    </msapplication>
</browserconfig>'''
    
    favicon_dir = Path('assets/favicons')
    browserconfig_file = favicon_dir / 'browserconfig.xml'
    
    with open(browserconfig_file, 'w', encoding='utf-8') as f:
        f.write(browserconfig)
    
    print(f"✅ Created {browserconfig_file}")

def create_manifest():
    """Create web app manifest"""
    manifest = '''{
    "name": "Pedro Marconato CV",
    "short_name": "Pedro CV",
    "description": "Pedro Henrique Lima Marconato - CRM Management and Data Intelligence Professional",
    "start_url": "/",
    "display": "standalone",
    "background_color": "#1a4b84",
    "theme_color": "#1a4b84",
    "icons": [
        {
            "src": "assets/favicons/general-32x32.png",
            "sizes": "32x32",
            "type": "image/png"
        },
        {
            "src": "assets/favicons/general-180x180.png",
            "sizes": "180x180",
            "type": "image/png"
        }
    ]
}'''
    
    with open('manifest.json', 'w', encoding='utf-8') as f:
        f.write(manifest)
    
    print("✅ Created manifest.json")

def create_readme():
    """Create README for favicon system"""
    readme = '''# Dynamic Favicon System

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
'''
    
    readme_file = Path('assets/favicons/README.md')
    with open(readme_file, 'w', encoding='utf-8') as f:
        f.write(readme)
    
    print(f"✅ Created {readme_file}")

def main():
    """Main function"""
    print("🎨 Integrating Dynamic Favicon System...")
    print()
    
    # Update HTML files
    update_html_files()
    print()
    
    # Create additional files
    create_browserconfig()
    create_manifest()
    create_readme()
    
    print()
    print("🚀 Dynamic Favicon System Integration Complete!")
    print()
    print("✨ Benefits:")
    print("   • Company-specific favicons automatically set")
    print("   • Real-time favicon updates on company selection")
    print("   • Full browser compatibility with fallbacks")
    print("   • PWA-ready with web app manifest")
    print("   • Performance optimized with data URIs")
    print()
    print("🔗 Test the system:")
    print("   1. Open any company page - favicon updates automatically")
    print("   2. Type company name on index page - favicon changes in real-time")
    print("   3. Check browser developer tools for favicon loading")

if __name__ == "__main__":
    main()