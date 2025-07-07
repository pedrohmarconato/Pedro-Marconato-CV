#!/usr/bin/env python3
"""
Dynamic Favicon Generator for Pedro Marconato CV
Converts company SVG logos to favicons for each page
"""

import os
import base64
from pathlib import Path

class FaviconGenerator:
    def __init__(self):
        self.svg_path = Path("assets/images")
        self.favicon_path = Path("assets/favicons")
        self.favicon_path.mkdir(exist_ok=True)
        
        # Company to SVG mapping
        self.company_svgs = {
            'allos': 'allos.svg',
            'boticario': 'boticario.svg', 
            'sicredi': 'sicredi.svg',
            'ifood': 'IFood_logo_c.svg',
            'contaazul': 'logo_conta_azul.svg',
            'rdstation': 'rd-station-default.svg',
            'completebari': None,  # PNG file, needs special handling
            'general': None  # Default favicon
        }
        
    def read_svg_file(self, filename):
        """Read and optimize SVG file"""
        try:
            svg_file = self.svg_path / filename
            with open(svg_file, 'r', encoding='utf-8') as f:
                content = f.read()
            return content
        except FileNotFoundError:
            print(f"SVG file not found: {filename}")
            return None
            
    def optimize_svg_for_favicon(self, svg_content, company):
        """Optimize SVG for favicon use"""
        if not svg_content:
            return None
            
        # Remove unnecessary attributes and optimize for small size
        optimizations = [
            'xml:space="preserve"',
            'xmlns:xlink="http://www.w3.org/1999/xlink"',
            'xmlns:xodm="http://www.corel.com/coreldraw/odm/2003"',
            'style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"',
            '<!-- Creator: CorelDRAW -->',
            '<metadata id="CorelCorpID_0Corel-Layer"/>',
        ]
        
        for attr in optimizations:
            svg_content = svg_content.replace(attr, '')
            
        # Company-specific optimizations
        if company == 'sicredi':
            # Sicredi logo is already clean
            pass
        elif company == 'allos':
            # Simplify Allos logo if needed
            pass
        elif company == 'boticario':
            # Boticário logo might need color adjustments for favicon
            pass
            
        # Ensure proper viewport for favicon
        if 'viewBox=' not in svg_content:
            if 'width=' in svg_content and 'height=' in svg_content:
                # Try to extract dimensions and create viewBox
                pass
                
        return svg_content.strip()
        
    def create_svg_favicon(self, company, svg_content):
        """Create optimized SVG favicon"""
        if not svg_content:
            return None
            
        # Add favicon-specific optimizations
        favicon_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
{svg_content.split('>', 1)[1] if '>' in svg_content else svg_content}
</svg>'''
        
        return favicon_svg
        
    def create_data_uri_favicon(self, svg_content):
        """Create data URI for inline favicon"""
        if not svg_content:
            return None
            
        # Encode SVG as base64 data URI
        encoded = base64.b64encode(svg_content.encode('utf-8')).decode('utf-8')
        return f"data:image/svg+xml;base64,{encoded}"
        
    def generate_favicon_html(self, company, data_uri=None, svg_file=None):
        """Generate HTML for favicon meta tags"""
        if data_uri:
            return f'''<!-- {company.title()} Favicon -->
<link rel="icon" type="image/svg+xml" href="{data_uri}">
<link rel="icon" type="image/png" sizes="32x32" href="assets/favicons/{company}-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="assets/favicons/{company}-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="assets/favicons/{company}-180x180.png">'''
        else:
            return f'''<!-- {company.title()} Favicon -->
<link rel="icon" type="image/svg+xml" href="assets/favicons/{company}.svg">
<link rel="icon" type="image/png" sizes="32x32" href="assets/favicons/{company}-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="assets/favicons/{company}-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="assets/favicons/{company}-180x180.png">'''
            
    def create_default_favicon(self):
        """Create default favicon for general pages"""
        default_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1a4b84;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#2d7dd2;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="32" height="32" rx="6" fill="url(#grad)"/>
  <text x="16" y="22" font-family="Inter, sans-serif" font-size="18" font-weight="700" fill="white" text-anchor="middle">P</text>
</svg>'''
        return default_svg
        
    def generate_all_favicons(self):
        """Generate favicons for all companies"""
        results = {}
        
        # Generate company-specific favicons
        for company, svg_file in self.company_svgs.items():
            if company == 'general':
                # Create default favicon
                svg_content = self.create_default_favicon()
                data_uri = self.create_data_uri_favicon(svg_content)
                results[company] = {
                    'svg': svg_content,
                    'data_uri': data_uri,
                    'html': self.generate_favicon_html(company, data_uri)
                }
            elif svg_file:
                # Read and process company SVG
                svg_content = self.read_svg_file(svg_file)
                if svg_content:
                    optimized_svg = self.optimize_svg_for_favicon(svg_content, company)
                    data_uri = self.create_data_uri_favicon(optimized_svg)
                    results[company] = {
                        'svg': optimized_svg,
                        'data_uri': data_uri,
                        'html': self.generate_favicon_html(company, data_uri)
                    }
            else:
                # Handle special cases (PNG files, etc.)
                print(f"Special handling needed for {company}")
                
        return results
        
    def save_favicons(self, results):
        """Save generated favicons to files"""
        for company, data in results.items():
            if data.get('svg'):
                # Save SVG favicon
                svg_file = self.favicon_path / f"{company}.svg"
                with open(svg_file, 'w', encoding='utf-8') as f:
                    f.write(data['svg'])
                    
                # Save HTML snippet
                html_file = self.favicon_path / f"{company}-favicon.html"
                with open(html_file, 'w', encoding='utf-8') as f:
                    f.write(data['html'])
                    
                print(f"✅ Generated favicon for {company}")
                
    def create_favicon_manifest(self, results):
        """Create manifest file for easy integration"""
        manifest = {
            'companies': {},
            'usage': {
                'inline': 'Use data_uri for inline favicons (faster loading)',
                'file': 'Use svg file for external favicon (better caching)',
                'example': '''<!-- In your HTML <head> -->
<!-- Option 1: Inline (faster) -->
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml;base64,...">

<!-- Option 2: File (better caching) -->
<link rel="icon" type="image/svg+xml" href="assets/favicons/company.svg">'''
            }
        }
        
        for company, data in results.items():
            manifest['companies'][company] = {
                'data_uri': data.get('data_uri', ''),
                'svg_file': f"assets/favicons/{company}.svg",
                'html_snippet': data.get('html', '')
            }
            
        import json
        manifest_file = self.favicon_path / 'favicon-manifest.json'
        with open(manifest_file, 'w', encoding='utf-8') as f:
            json.dump(manifest, f, indent=2)
            
        print(f"✅ Created favicon manifest: {manifest_file}")

def main():
    """Main function to generate all favicons"""
    print("🎨 Generating dynamic favicons for Pedro Marconato CV...")
    
    generator = FaviconGenerator()
    results = generator.generate_all_favicons()
    generator.save_favicons(results)
    generator.create_favicon_manifest(results)
    
    print(f"\n📋 Generated favicons for {len(results)} companies:")
    for company in results.keys():
        print(f"   • {company.title()}")
        
    print(f"\n📁 Files saved to: {generator.favicon_path}")
    print("\n🚀 To use in templates:")
    print("   1. Include the HTML snippet from favicon-manifest.json")
    print("   2. Or use the data URI for inline favicons")
    print("   3. Or link to the SVG file for external favicons")

if __name__ == "__main__":
    main()