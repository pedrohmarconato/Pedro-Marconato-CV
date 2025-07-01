#!/usr/bin/env python3
import re
import os

# Lista de arquivos para atualizar
files = [
    "boticario.html",
    "boticario_pt.html",
    "ifood.html",
    "ifood_pt.html",
    "rdstation.html",
    "rdstation_pt.html",
    "sicredi.html",
    "sicredi_pt.html"
]

# Novo CSS responsivo
new_responsive_css = """        /* Responsive design */
        @media (max-width: 768px) {
            .cv-container {
                margin: 0;
                border-radius: 0;
                max-width: 100%;
            }
            
            .header {
                padding: 30px 20px;
            }
            
            .header h1 {
                font-size: 22px;
                text-align: center;
            }
            
            .header-tagline,
            .role {
                font-size: 14px;
                text-align: center;
            }
            
            .contact-info {
                justify-content: center;
                flex-direction: column;
                gap: 6px;
            }
            
            .contact-item {
                font-size: 12px;
                padding: 6px 10px;
                width: 100%;
            }
            
            .contact-button {
                padding: 6px 10px;
                font-size: 12px;
                min-height: 36px;
                width: 100%;
            }
            
            .contact-cta {
                font-size: 11px;
            }
            
            .section {
                padding: 20px 15px;
            }
            
            .section-title {
                font-size: 14px;
                margin-bottom: 15px;
                padding: 6px 12px;
            }
            
            /* Education grid */
            .education-tech-container {
                grid-template-columns: 1fr;
                gap: 20px;
            }
            
            .education-grid,
            .education-container {
                grid-template-columns: 1fr;
            }
            
            /* Skills */
            .skills-grid,
            .skills-container {
                grid-template-columns: 1fr;
            }
            
            .skill-items {
                font-size: 11px;
            }
            
            /* Experience */
            .experience-timeline {
                padding-left: 15px;
                margin-left: 0;
            }
            
            .company-header {
                flex-direction: column;
                gap: 3px;
                margin-bottom: 15px;
            }
            
            .company-name {
                font-size: 13px;
            }
            
            .job-title {
                font-size: 12px;
            }
            
            .job-period {
                font-size: 10px;
            }
            
            .achievements li {
                font-size: 11px;
                padding-left: 15px;
                margin-bottom: 8px;
                line-height: 1.5;
            }
            
            /* Remove logos */
            .boticario-logo,
            .sicredi-logo,
            .ifood-logo,
            .rd-logo,
            .rdstation-logo {
                display: none;
            }
            
            /* Projects */
            .projects-container {
                grid-template-columns: 1fr;
            }
            
            .project-item {
                padding: 15px;
            }
            
            /* Header content adjustments */
            .header-content {
                flex-direction: column;
                text-align: center;
                gap: 15px;
            }
            
            .header-text {
                padding-right: 0;
            }
            
            /* Achievement container mobile */
            .achievements-container {
                grid-template-columns: 1fr;
            }
            
            /* Section separator adjustments */
            .section:not(:last-child)::after {
                left: 15px;
                right: 15px;
            }
            
            /* Modals */
            .modal-content {
                width: 95%;
                margin: 5% auto;
                padding: 20px;
            }
            
            .modal input,
            .modal textarea {
                font-size: 16px; /* Prevents zoom on iOS */
                padding: 12px;
            }
            
            .modal button {
                min-height: 44px;
                font-size: 14px;
            }
            
            /* Fixed buttons */
            .print-button,
            .language-toggle {
                position: fixed;
                bottom: 20px;
                top: auto;
                padding: 10px 16px;
                font-size: 12px;
                min-height: 40px;
                z-index: 100;
            }
            
            .print-button {
                right: 20px;
            }
            
            .language-toggle {
                right: auto;
                left: 20px;
            }
        }

        @media (max-width: 480px) {
            .header h1 {
                font-size: 18px;
            }
            
            .section {
                padding: 15px 10px;
            }
            
            .section-title {
                font-size: 12px;
            }
            
            .achievements li {
                padding-left: 12px;
                font-size: 10px;
            }
            
            .company-name {
                font-size: 12px;
            }
            
            .job-title {
                font-size: 11px;
            }
            
            .job-period {
                font-size: 9px;
            }
        }"""

def update_file(filename):
    print(f"Processing {filename}...")
    
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Padrão para encontrar as media queries que vamos substituir
    # Procura por @media (max-width: 768px) até @media print
    pattern = r'(\s*/\*\s*Responsive design\s*\*/\s*\n)?\s*@media\s*\(max-width:\s*768px\)\s*\{[^}]*(?:\}[^}]*)*?\}\s*(?:/\*\s*Extra small devices\s*\*/\s*)?\s*@media\s*\(max-width:\s*480px\)\s*\{[^}]*\}'
    
    # Substitui o conteúdo
    new_content = re.sub(pattern, new_responsive_css, content, flags=re.DOTALL)
    
    # Salva o arquivo atualizado
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"{filename} updated successfully!")

# Processa todos os arquivos
for file in files:
    if os.path.exists(file):
        update_file(file)
    else:
        print(f"File {file} not found, skipping...")

print("\nAll files processed!")