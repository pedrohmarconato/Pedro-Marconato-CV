#!/usr/bin/env python3
"""
🔧 CORRETOR AUTOMÁTICO DE TEMPLATES
Corrige todos os templates para seguir o padrão obrigatório

Baseado na validação, corrige:
- IDs obrigatórios faltando
- Scripts obrigatórios ausentes
- Variáveis CSS incorretas
- cv_styles faltando
"""

import os
import re
from pathlib import Path

class TemplateFixer:
    def __init__(self):
        self.project_root = Path(__file__).parent
        self.templates_dir = self.project_root / 'templates/companies'
        self.cv_styles_dir = self.project_root / 'cv_styles'
        self.fixed_count = 0
        
    def log(self, message, level='info'):
        icons = {'info': 'ℹ️', 'success': '✅', 'warning': '⚠️', 'error': '❌', 'fix': '🔧'}
        print(f"{icons.get(level, 'ℹ️')} {message}")
        
    def fix_missing_ids(self, file_path, content):
        """Adiciona IDs obrigatórios que estão faltando"""
        updated = False
        
        # IDs básicos obrigatórios
        required_ids = {
            'cv-name': 'PEDRO HENRIQUE LIMA MARCONATO',
            'cv-role': 'CRM Management and Data Intelligence',
            'cv-email': 'pedrohmarconato@gmail.com',
            'cv-phone': '+55 (55) 981147758',
            'cv-location': 'Cachoeira do Sul, RS',
            'cv-linkedin': 'LinkedIn',
            'cv-repository': 'Repository'
        }
        
        # Verificar e adicionar IDs básicos
        for required_id, default_text in required_ids.items():
            if f'id="{required_id}"' not in content:
                # Estratégias múltiplas para encontrar e adicionar IDs
                patterns = [
                    # Padrão 1: Texto simples
                    (f'{default_text}', f'<span id="{required_id}">{default_text}</span>'),
                    # Padrão 2: Entre tags
                    (f'>{default_text}<', f' id="{required_id}">{default_text}<'),
                    # Padrão 3: Email específico
                    ('pedrohmarconato@gmail.com', '<span id="cv-email">pedrohmarconato@gmail.com</span>'),
                    # Padrão 4: Telefone específico
                    ('+55 (55) 981147758', '<span id="cv-phone">+55 (55) 981147758</span>'),
                    # Padrão 5: Localização específica
                    ('Cachoeira do Sul, RS', '<span id="cv-location">Cachoeira do Sul, RS</span>'),
                    # Padrão 6: Links
                    ('<a href="https://linkedin.com', '<a href="https://linkedin.com" id="cv-linkedin"'),
                    ('<a href="https://github.com', '<a href="https://github.com" id="cv-repository"'),
                    # Padrão 7: Textos em português
                    ('Repositório', '<a id="cv-repository">Repositório</a>'),
                    ('LinkedIn', '<a id="cv-linkedin">LinkedIn</a>')
                ]
                
                for pattern, replacement in patterns:
                    if pattern in content and f'id="{required_id}"' not in content:
                        content = content.replace(pattern, replacement, 1)
                        self.log(f"Adicionado ID {required_id}", 'fix')
                        updated = True
                        break
                        
                # Se ainda não encontrou, tentar inserir em locais comuns
                if f'id="{required_id}"' not in content:
                    if required_id == 'cv-phone' and '+55' in content:
                        content = content.replace('+55', '<span id="cv-phone">+55', 1)
                        content = content.replace('981147758', '981147758</span>', 1)
                        self.log(f"Adicionado ID {required_id} (phone fix)", 'fix')
                        updated = True
                    elif required_id == 'cv-location' and 'Cachoeira do Sul' in content:
                        content = content.replace('Cachoeira do Sul, RS', '<span id="cv-location">Cachoeira do Sul, RS</span>')
                        self.log(f"Adicionado ID {required_id} (location fix)", 'fix')
                        updated = True
                    elif required_id == 'cv-repository' and 'Repository' in content:
                        content = content.replace('Repository', '<span id="cv-repository">Repository</span>')
                        self.log(f"Adicionado ID {required_id} (repository fix)", 'fix')
                        updated = True
                        
        # IDs de seção obrigatórios
        section_ids = {
            'section-skills': ['SKILLS', 'HABILIDADES', 'Skills', 'Habilidades', 'SKILLS & TOOLS', 'HABILIDADES E FERRAMENTAS'],
            'section-experience': ['EXPERIENCE', 'EXPERIÊNCIA', 'Experience', 'Experiência', 'PROFESSIONAL EXPERIENCE', 'EXPERIÊNCIA PROFISSIONAL'],
            'section-education': ['EDUCATION', 'FORMAÇÃO', 'EDUCAÇÃO', 'Education', 'Formação', 'Educação'],
            'section-projects': ['PROJECTS', 'PROJETOS', 'Projects', 'Projetos', 'PROJECTS & INNOVATION', 'PROJETOS E INOVAÇÃO']
        }
        
        for section_id, possible_texts in section_ids.items():
            if f'id="{section_id}"' not in content:
                for text in possible_texts:
                    # Procurar por títulos de seção sem ID
                    patterns = [
                        (f'<h2 class="section-title">{text}', f'<h2 class="section-title" id="{section_id}">{text}'),
                        (f'<h2>{text}', f'<h2 id="{section_id}">{text}'),
                        (f'<h3 class="section-title">{text}', f'<h3 class="section-title" id="{section_id}">{text}'),
                    ]
                    
                    for pattern, replacement in patterns:
                        if pattern in content:
                            content = content.replace(pattern, replacement, 1)
                            self.log(f"Adicionado ID {section_id}", 'fix')
                            updated = True
                            break
                    if updated:
                        break
                        
        return content, updated
        
    def fix_missing_scripts(self, file_path, content):
        """Adiciona scripts obrigatórios que estão faltando"""
        updated = False
        
        # Verificar cv-texts.js
        if 'cv-texts.js' not in content:
            script_section = '''    <!-- CV Texts System -->
    <script src="../../cv-texts.js"></script>
    <script>
        // Initialize content when page loads
        document.addEventListener('DOMContentLoaded', function() {
            if (typeof initializeContent !== 'undefined') {
                initializeContent('en'); // ou 'pt' para versão PT
            }
        });
    </script>
    
</body>'''
            
            # Substituir </body> por script + </body>
            if '</body>' in content:
                content = content.replace('</body>', script_section)
                self.log("Adicionado cv-texts.js", 'fix')
                updated = True
                
        # Verificar dynamic-favicon.js
        if 'dynamic-favicon.js' not in content:
            # Adicionar antes de </body>
            favicon_script = '    <script src="../../assets/js/dynamic-favicon.js"></script>\n</body>'
            if '</body>' in content:
                content = content.replace('</body>', favicon_script)
                self.log("Adicionado dynamic-favicon.js", 'fix')
                updated = True
                
        return content, updated
        
    def fix_css_variables(self, file_path, content):
        """Corrige variáveis CSS incorretas"""
        updated = False
        
        # Extrair nome da empresa do arquivo
        empresa = file_path.stem.replace('_pt', '')
        
        # Correções específicas por empresa
        corrections = {
            'ifood': {
                '--sicredi-green': '--ifood-red',
                '--sicredi-dark-green': '--ifood-dark-red',
                '--sicredi-light-neutral': '--ifood-light-gray',
                '--sicredi-dark-neutral': '--ifood-dark-gray'
            },
            'rdstation': {
                '--sicredi-green': '--rdstation-green',
                '--sicredi-dark-green': '--rdstation-dark-green'
            }
        }
        
        if empresa in corrections:
            for wrong_var, correct_var in corrections[empresa].items():
                if wrong_var in content:
                    content = content.replace(wrong_var, correct_var)
                    self.log(f"Corrigido {wrong_var} -> {correct_var}", 'fix')
                    updated = True
                    
        return content, updated
        
    def create_missing_cv_style(self, empresa, lang='PT'):
        """Cria cv_style faltando"""
        cv_style_name = f"cv_{empresa}_style_{lang}.html"
        cv_style_path = self.cv_styles_dir / cv_style_name
        
        if cv_style_path.exists():
            return False
            
        # Template básico para cv_style
        template = f'''<!DOCTYPE html>
<html lang="{lang.lower()}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pedro Henrique Marconato - CV</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        :root {{
            --primary-color: #1a4b84;
            --secondary-color: #2c5aa0;
            --accent-color: #3a73c2;
            --text-color: #2c3e50;
            --border-color: rgba(0, 0, 0, 0.1);
        }}
        
        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }}
        
        body {{
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            color: var(--text-color);
            line-height: 1.6;
            background: white;
        }}
        
        .cv-container {{
            max-width: 210mm;
            margin: 0 auto;
            padding: 20mm;
            background: white;
        }}
        
        h1, h2 {{
            color: var(--primary-color);
        }}
        
        @media print {{
            body {{
                margin: 0;
                padding: 0;
            }}
            
            .cv-container {{
                margin: 0;
                padding: 15mm;
            }}
        }}
    </style>
</head>
<body>
    <div class="cv-container">
        <h1>Pedro Henrique Lima Marconato</h1>
        <h2>CRM Management and Data Intelligence</h2>
        <p>Contact: pedrohmarconato@gmail.com | +55 (55) 981147758</p>
        <p>Location: Cachoeira do Sul, RS</p>
        
        <h2>Professional Profile</h2>
        <p>Professional in CRM Management and Data Intelligence focused on quantifiable results...</p>
        
        <h2>Skills & Tools</h2>
        <p>PowerBI, Oracle/Databricks, Python/SQL, CRM Management...</p>
        
        <h2>Professional Experience</h2>
        <p>CRM Coordinator at Realize CFI (Sep/2022 - Present)</p>
        
        <h2>Education</h2>
        <p>Master's in Administration - Federal University of Santa Maria</p>
        
        <h2>Projects & Innovation</h2>
        <p>Various CRM and data intelligence projects...</p>
    </div>
</body>
</html>'''
        
        try:
            with open(cv_style_path, 'w', encoding='utf-8') as f:
                f.write(template)
            self.log(f"Criado cv_style: {cv_style_name}", 'fix')
            return True
        except Exception as e:
            self.log(f"Erro ao criar {cv_style_name}: {str(e)}", 'error')
            return False
            
    def fix_template(self, file_path):
        """Corrige um template específico"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                
            original_content = content
            updated = False
            
            # Aplicar correções
            content, ids_updated = self.fix_missing_ids(file_path, content)
            content, scripts_updated = self.fix_missing_scripts(file_path, content)
            content, css_updated = self.fix_css_variables(file_path, content)
            
            updated = ids_updated or scripts_updated or css_updated
            
            # Salvar se houve mudanças
            if updated:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                self.fixed_count += 1
                self.log(f"Template corrigido: {file_path.name}", 'success')
            else:
                self.log(f"Template OK: {file_path.name}", 'info')
                
        except Exception as e:
            self.log(f"Erro ao corrigir {file_path.name}: {str(e)}", 'error')
            
    def fix_missing_cv_styles(self):
        """Cria cv_styles faltando"""
        self.log("Verificando cv_styles faltando...", 'info')
        
        # Lista de empresas que precisam de cv_styles PT
        companies = [
            'general', 'allos', 'boticario', 'macfor', 'sicredi', 'cea',
            'ifood', 'neogroup', 'contaazul', 'rdstation', 'completebari',
            'wehandle', 'renner', 'willbank', 'raio'
        ]
        
        created_count = 0
        for company in companies:
            if self.create_missing_cv_style(company, 'PT'):
                created_count += 1
                
        if created_count > 0:
            self.log(f"Criados {created_count} cv_styles PT", 'success')
        else:
            self.log("Todos os cv_styles PT já existem", 'info')
            
    def run(self):
        """Executa todas as correções"""
        print("🔧 CORRETOR AUTOMÁTICO DE TEMPLATES")
        print("="*50)
        print("Corrigindo todos os templates para seguir o padrão...")
        print("="*50)
        print()
        
        # Listar todos os templates
        template_files = list(self.templates_dir.glob('*.html'))
        
        if not template_files:
            self.log("Nenhum template encontrado!", 'error')
            return
            
        self.log(f"Encontrados {len(template_files)} templates para revisar")
        print()
        
        # Corrigir cada template
        for template_file in sorted(template_files):
            self.fix_template(template_file)
            
        print()
        # Criar cv_styles faltando
        self.fix_missing_cv_styles()
        
        print()
        print("="*50)
        print("📊 RESUMO DAS CORREÇÕES")
        print("="*50)
        print(f"✅ Templates corrigidos: {self.fixed_count}")
        print(f"📄 Templates verificados: {len(template_files)}")
        print()
        
        if self.fixed_count > 0:
            print("🎉 Correções aplicadas com sucesso!")
            print("📝 Execute 'python validate-project.py' para verificar")
        else:
            print("✅ Todos os templates já estavam corretos!")

if __name__ == "__main__":
    fixer = TemplateFixer()
    fixer.run()