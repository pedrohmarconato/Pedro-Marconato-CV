#!/usr/bin/env python3
"""
Script to update remaining templates to use centralized text system
"""

import os
import re

def update_template_modals(template_path):
    """Update modal texts in a template to use centralized system"""
    with open(template_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Track if changes were made
    changes_made = False
    
    # Update email modal title
    if 'Send Email</h3>' in content:
        content = re.sub(
            r'<h3([^>]*?)>Send Email</h3>',
            r'<h3 id="email-modal-title"\1>Send Email</h3>',
            content
        )
        changes_made = True
    
    # Update phone modal title
    if 'Get in Touch</h3>' in content:
        content = re.sub(
            r'<h3([^>]*?)>Get in Touch</h3>',
            r'<h3 id="phone-modal-title"\1>Get in Touch</h3>',
            content
        )
        changes_made = True
    
    # Update email form labels
    email_form_replacements = [
        (r'<label([^>]*?)>Your Name</label>', r'<label id="email-label-name"\1>Your Name</label>'),
        (r'<label([^>]*?)>Your Email</label>', r'<label id="email-label-email"\1>Your Email</label>'),
        (r'<label([^>]*?)>Subject</label>', r'<label id="email-label-subject"\1>Subject</label>'),
        (r'<label([^>]*?)>Message</label>', r'<label id="email-label-message"\1>Message</label>'),
    ]
    
    # Update phone form labels
    phone_form_replacements = [
        (r'<label([^>]*?)>Your Phone</label>', r'<label id="phone-label-phone"\1>Your Phone</label>'),
        (r'<label([^>]*?)>Best time to contact</label>', r'<label id="phone-label-besttime"\1>Best time to contact</label>'),
        (r'<label([^>]*?)>Message \(Optional\)</label>', r'<label id="phone-label-message"\1>Message (Optional)</label>'),
    ]
    
    # Apply form label replacements
    for pattern, replacement in email_form_replacements + phone_form_replacements:
        if re.search(pattern, content):
            content = re.sub(pattern, replacement, content)
            changes_made = True
    
    # Update buttons
    button_replacements = [
        (r'<button([^>]*?)>Send</button>', r'<button id="email-button"\1>Send</button>'),
        (r'<button([^>]*?)>Request Contact</button>', r'<button id="phone-button"\1>Request Contact</button>'),
        (r'<i class="fab fa-whatsapp"([^>]*?)></i> WhatsApp', r'<i class="fab fa-whatsapp"\1></i> <span id="whatsapp-text">WhatsApp</span>'),
    ]
    
    for pattern, replacement in button_replacements:
        if re.search(pattern, content):
            content = re.sub(pattern, replacement, content)
            changes_made = True
    
    # Update language toggle
    if '<span>EN</span>' in content and 'id="lang-en"' not in content:
        content = content.replace('<span>EN</span>', '<span id="lang-en">EN</span>')
        changes_made = True
    
    if '<span>PT</span>' in content and 'id="lang-pt"' not in content:
        content = content.replace('<span>PT</span>', '<span id="lang-pt">PT</span>')
        changes_made = True
    
    # Add initializeModalTexts call if not present
    if 'initializeModalTexts' not in content and 'DOMContentLoaded' in content:
        # Find the DOMContentLoaded function and add the call
        dom_loaded_pattern = r"(document\.addEventListener\('DOMContentLoaded', function\(\) \{[^}]*?)"
        match = re.search(dom_loaded_pattern, content, re.DOTALL)
        if match:
            insertion_point = match.end()
            # Add the call after initializeBasicContent if it exists, otherwise at the beginning
            if 'initializeBasicContent' in match.group(1):
                init_pattern = r"(initializeBasicContent\([^)]*\);)"
                init_match = re.search(init_pattern, match.group(1))
                if init_match:
                    content = content[:insertion_point - len(match.group(1)) + init_match.end()] + '\n            \n            // Initialize modal texts\n            initializeModalTexts(\'en\');' + content[insertion_point - len(match.group(1)) + init_match.end():]
                    changes_made = True
            else:
                content = content[:insertion_point] + '\n            // Initialize modal texts\n            initializeModalTexts(\'en\');\n            ' + content[insertion_point:]
                changes_made = True
    
    # Save the updated content
    if changes_made:
        with open(template_path, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    """Main function to update all remaining templates"""
    templates_dir = "/home/em_indo/Pedro-Marconato-CV/templates/companies"
    
    # Templates to update (excluding already updated ones)
    templates_to_update = [
        "allos.html",
        "completebari.html", 
        "contaazul.html",
        "ifood.html",
        "rdstation.html"
    ]
    
    print("🔄 Updating remaining templates to use centralized text system...")
    print()
    
    for template_name in templates_to_update:
        template_path = os.path.join(templates_dir, template_name)
        
        if os.path.exists(template_path):
            print(f"📄 Updating {template_name}...")
            
            try:
                updated = update_template_modals(template_path)
                if updated:
                    print(f"   ✅ {template_name} updated successfully")
                else:
                    print(f"   ℹ️  {template_name} - no changes needed")
            except Exception as e:
                print(f"   ❌ Error updating {template_name}: {str(e)}")
        else:
            print(f"   ⚠️  {template_name} not found")
        
        print()
    
    print("🎉 Template update process completed!")
    print()
    print("Summary of changes made:")
    print("- Added IDs to modal titles and form labels")
    print("- Added IDs to buttons and WhatsApp text")
    print("- Added IDs to language toggle elements")
    print("- Added initializeModalTexts() calls where needed")
    print()
    print("All templates should now be using 0% hardcoded text!")

if __name__ == "__main__":
    main()