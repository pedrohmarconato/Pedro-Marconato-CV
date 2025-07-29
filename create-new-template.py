#!/usr/bin/env python3
"""
🎯 CRIADOR DE NOVO TEMPLATE - PEDRO MARCONATO CV
Cria automaticamente novos templates seguindo o padrão oficial

Uso: python create-new-template.py
"""

import os
import re
from pathlib import Path
from datetime import datetime

class TemplateCreator:
    def __init__(self):
        self.project_root = Path(__file__).parent
        self.templates_dir = self.project_root / 'templates/companies'
        self.cv_styles_dir = self.project_root / 'cv_styles'
        
        # Template base (versão simplificada)
        self.base_template = '''<!DOCTYPE html>
<html lang="{lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pedro Marconato - {empresa_display}</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        :root {{
            /* {empresa_display} Official Colors */
            --{empresa_lower}-primary: {primary_color};
            --{empresa_lower}-secondary: {secondary_color};
            --{empresa_lower}-accent: {accent_color};
            
            /* Applied Colors */
            --primary-color: var(--{empresa_lower}-primary);
            --secondary-color: var(--{empresa_lower}-secondary);
            --accent-color: var(--{empresa_lower}-accent);
            --text-color: #2c3e50;
            --border-color: rgba(0, 0, 0, 0.1);
            --background-gradient: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
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
            background: #f8f9fa;
            min-height: 100vh;
            position: relative;
            overflow-x: hidden;
        }}
        
        /* Animated background */
        .animated-bg {{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 50%, #f8f9fa 100%);
            background-size: 400% 400%;
            animation: gradientShift 20s ease infinite;
            z-index: -2;
        }}
        
        @keyframes gradientShift {{
            0% {{ background-position: 0% 50%; }}
            50% {{ background-position: 100% 50%; }}
            100% {{ background-position: 0% 50%; }}
        }}
        
        /* Container PADRÃO - 1000px centralizado */
        .cv-container {{
            max-width: 1000px;
            margin: 30px auto;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            position: relative;
            border: 1px solid var(--border-color);
        }}
        
        /* Header */
        .header {{
            background: var(--background-gradient);
            color: white;
            padding: 60px 50px;
            text-align: center;
            position: relative;
        }}
        
        .header h1 {{
            font-size: 2.5em;
            font-weight: 700;
            margin-bottom: 10px;
            letter-spacing: -0.5px;
        }}
        
        .header h2 {{
            font-size: 1.2em;
            font-weight: 400;
            opacity: 0.9;
            margin-bottom: 20px;
        }}
        
        .contact-info {{
            font-size: 0.95em;
            opacity: 0.9;
            line-height: 1.8;
        }}
        
        .contact-info a {{
            color: white;
            text-decoration: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.3);
            transition: border-color 0.3s ease;
        }}
        
        .contact-info a:hover {{
            border-bottom-color: white;
        }}
        
        /* Content sections */
        .content {{
            padding: 50px;
        }}
        
        .section {{
            margin-bottom: 40px;
        }}
        
        .section-title {{
            font-size: 1.5em;
            font-weight: 700;
            color: var(--primary-color);
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid var(--border-color);
        }}
        
        /* Print button */
        .print-button {{
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(255, 255, 255, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.3);
            color: white;
            padding: 8px 16px;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 0.9em;
        }}
        
        .print-button:hover {{
            background: rgba(255, 255, 255, 0.3);
        }}
        
        /* Responsive */
        @media (max-width: 768px) {{
            .cv-container {{
                margin: 10px;
                border-radius: 15px;
            }}
            
            .header {{
                padding: 40px 30px;
            }}
            
            .header h1 {{
                font-size: 2em;
            }}
            
            .content {{
                padding: 30px;
            }}
        }}
        
        /* Print styles */
        @media print {{
            body {{
                background: white;
            }}
            
            .animated-bg,
            .print-button {{
                display: none;
            }}
            
            .cv-container {{
                margin: 0;
                box-shadow: none;
                border: none;
            }}
        }}
    </style>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <!-- Favicon Meta Tags -->
    <meta name="theme-color" content="{primary_color}">
    <meta name="msapplication-TileColor" content="{primary_color}">
</head>
<body>
    <div class="animated-bg"></div>
    
    <div class="cv-container">
        <header class="header">
            <button class="print-button" onclick="window.open('../../cv_styles/cv_{empresa_lower}_style_{lang_upper}.html', '_blank')">
                <i class="fas fa-print"></i> {print_text}
            </button>
            
            <h1 id="cv-name">PEDRO HENRIQUE LIMA MARCONATO</h1>
            <h2 id="cv-role">{role_text}</h2>
            
            <div class="contact-info">
                <div>
                    <span id="cv-email">pedrohmarconato@gmail.com</span> | 
                    <span id="cv-phone">+55 (55) 981147758</span> | 
                    <span id="cv-location">Cachoeira do Sul, RS</span>
                </div>
                <div>
                    <a href="https://linkedin.com/in/pedrohmarconato" id="cv-linkedin">LinkedIn</a> | 
                    <a href="https://github.com/pedrohmarconato/Pedro-Marconato-CV" id="cv-repository">{repo_text}</a>
                </div>
            </div>
        </header>
        
        <div class="content">
            <section class="section">
                <h2 class="section-title">{profile_title}</h2>
                <p id="cv-profile">{profile_text}</p>
            </section>
            
            <section class="section">
                <h2 class="section-title" id="section-skills">{skills_title}</h2>
                <div id="skills-container">
                    <!-- Skills will be loaded by cv-texts.js -->
                </div>
            </section>
            
            <section class="section">
                <h2 class="section-title" id="section-experience">{experience_title}</h2>
                <div id="experience-container">
                    <!-- Experience will be loaded by cv-texts.js -->
                </div>
            </section>
            
            <section class="section">
                <h2 class="section-title" id="section-education">{education_title}</h2>
                <div id="education-container">
                    <!-- Education will be loaded by cv-texts.js -->
                </div>
            </section>
            
            <section class="section">
                <h2 class="section-title" id="section-projects">{projects_title}</h2>
                <div id="projects-container">
                    <!-- Projects will be loaded by cv-texts.js -->
                </div>
            </section>
        </div>
    </div>
    
    <!-- SCRIPTS OBRIGATÓRIOS -->
    <script src="../../cv-texts.js"></script>
    <script src="../../assets/js/dynamic-favicon.js"></script>
    <script>
        // Initialize content when page loads
        document.addEventListener('DOMContentLoaded', function() {{
            // Initialize with {lang_display} content
            if (typeof initializeContent !== 'undefined') {{
                initializeContent('{lang_code}');
            }}
            
            // Initialize dynamic favicon
            if (typeof DynamicFavicon !== 'undefined') {{
                DynamicFavicon.init();
            }}
        }});
    </script>
</body>
</html>'''

    def log(self, message, level='info'):
        icons = {'info': 'ℹ️', 'success': '✅', 'warning': '⚠️', 'error': '❌', 'input': '📝'}
        print(f"{icons.get(level, 'ℹ️')} {message}")
        
    def validate_color(self, color):
        """Valida formato de cor hexadecimal"""
        if re.match(r'^#[0-9A-Fa-f]{6}$', color):
            return True
        return False
        
    def get_user_input(self):
        """Obtém informações do usuário"""
        print("🎯 CRIADOR DE NOVO TEMPLATE")
        print("="*50)
        print("Este assistente criará um novo template seguindo o padrão oficial")
        print("="*50)
        print()
        
        # Nome da empresa
        while True:
            empresa = input("📝 Nome da empresa (ex: Google, Microsoft): ").strip()
            if empresa:
                empresa_lower = empresa.lower().replace(' ', '')
                # Verificar se já existe
                if (self.templates_dir / f"{empresa_lower}.html").exists():
                    self.log(f"Template para {empresa} já existe!", 'error')
                    continue
                break
            self.log("Nome da empresa é obrigatório", 'error')
            
        # Cores
        print("\n🎨 Cores da marca (formato hexadecimal #XXXXXX)")
        
        while True:
            primary = input("📝 Cor primária (ex: #0066CC): ").strip()
            if self.validate_color(primary):
                break
            self.log("Formato inválido. Use #XXXXXX", 'error')
            
        while True:
            secondary = input("📝 Cor secundária (ex: #004499): ").strip()
            if self.validate_color(secondary):
                break
            self.log("Formato inválido. Use #XXXXXX", 'error')
            
        while True:
            accent = input("📝 Cor de destaque (ex: #87CEEB): ").strip()
            if self.validate_color(accent):
                break
            self.log("Formato inválido. Use #XXXXXX", 'error')
            
        return {
            'empresa': empresa,
            'empresa_lower': empresa_lower,
            'empresa_display': empresa,
            'primary_color': primary,
            'secondary_color': secondary,
            'accent_color': accent
        }
        
    def create_template(self, data, lang='en'):
        """Cria um template específico"""
        # Configurações por idioma
        if lang == 'en':
            lang_config = {
                'lang': 'en',
                'lang_code': 'en',
                'lang_upper': 'EN',
                'lang_display': 'English',
                'print_text': 'Print CV',
                'role_text': 'CRM Management and Data Intelligence',
                'repo_text': 'Repository',
                'profile_title': 'Professional Profile',
                'profile_text': 'Professional profile content will be loaded here...',
                'skills_title': 'Skills & Tools',
                'experience_title': 'Professional Experience',
                'education_title': 'Education',
                'projects_title': 'Projects & Innovation'
            }
            filename = f"{data['empresa_lower']}.html"
        else:
            lang_config = {
                'lang': 'pt-BR',
                'lang_code': 'pt',
                'lang_upper': 'PT',
                'lang_display': 'Portuguese',
                'print_text': 'Imprimir CV',
                'role_text': 'Gestão de CRM e Inteligência de Dados',
                'repo_text': 'Repositório',
                'profile_title': 'Perfil Profissional',
                'profile_text': 'O conteúdo do perfil profissional será carregado aqui...',
                'skills_title': 'Habilidades e Ferramentas',
                'experience_title': 'Experiência Profissional',
                'education_title': 'Formação Acadêmica',
                'projects_title': 'Projetos e Inovação'
            }
            filename = f"{data['empresa_lower']}_pt.html"
            
        # Combinar dados
        template_data = {**data, **lang_config}
        
        # Gerar conteúdo
        content = self.base_template.format(**template_data)
        
        # Salvar arquivo
        file_path = self.templates_dir / filename
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
            
        return file_path
        
    def create_cv_style(self, data, lang='EN'):
        """Cria arquivo cv_style básico"""
        cv_style_content = f'''<!DOCTYPE html>
<html lang="{lang.lower()}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pedro Henrique Marconato - CV</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        :root {{
            /* {data['empresa_display']} Colors */
            --primary-color: {data['primary_color']};
            --secondary-color: {data['secondary_color']};
            --accent-color: {data['accent_color']};
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
        
        /* CV container for print */
        .cv-container {{
            max-width: 210mm;
            margin: 0 auto;
            padding: 20mm;
            background: white;
        }}
        
        /* Basic styles for print */
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
        <p>CRM Management and Data Intelligence</p>
        <!-- CV content will be populated here -->
    </div>
</body>
</html>'''
        
        filename = f"cv_{data['empresa_lower']}_style_{lang}.html"
        file_path = self.cv_styles_dir / filename
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(cv_style_content)
            
        return file_path
        
    def update_brands_config(self, data):
        """Adiciona nova marca ao brands-config.js"""
        brands_config_path = self.project_root / 'assets/js/brands-config.js'
        
        if not brands_config_path.exists():
            self.log("brands-config.js não encontrado", 'warning')
            return
            
        # Ler arquivo atual
        with open(brands_config_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Criar configuração da nova marca
        new_brand_config = f'''
    {data['empresa_lower']}: {{
        name: '{data['empresa_display']}',
        colors: {{
            primary: '{data['primary_color']}',
            secondary: '{data['secondary_color']}',
            accent: '{data['accent_color']}',
            text: '#000000',
            whiteText: '#FFFFFF',
            grayText: '#333333',
            border: 'rgba(0, 0, 0, 0.2)'
        }},
        gradient: 'linear-gradient(135deg, {data['primary_color']} 0%, {data['secondary_color']} 100%)',
        logo: null,
        tagline: {{
            en: 'Excellence in Innovation',
            pt: 'Excelência em Inovação'
        }},
        shapes: 'circles',
        animations: 'standard'
    }},'''
        
        # Inserir antes do fechamento do objeto
        insert_position = content.rfind('};')
        if insert_position > 0:
            # Remover vírgula do último item atual
            last_comma = content.rfind('},', 0, insert_position)
            if last_comma > 0:
                content = content[:last_comma+2] + content[last_comma+2:]
                
            # Inserir nova configuração
            new_content = content[:insert_position] + new_brand_config + '\n' + content[insert_position:]
            
            # Salvar arquivo atualizado
            with open(brands_config_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
                
            self.log("brands-config.js atualizado", 'success')
        else:
            self.log("Não foi possível atualizar brands-config.js", 'error')
            
    def run(self):
        """Executa o processo completo"""
        # Obter dados do usuário
        data = self.get_user_input()
        
        print("\n" + "="*50)
        print("📋 CRIANDO TEMPLATES...")
        print("="*50)
        
        try:
            # Criar template EN
            en_file = self.create_template(data, 'en')
            self.log(f"Template EN criado: {en_file.name}", 'success')
            
            # Criar template PT
            pt_file = self.create_template(data, 'pt')
            self.log(f"Template PT criado: {pt_file.name}", 'success')
            
            # Criar cv_styles
            cv_en = self.create_cv_style(data, 'EN')
            self.log(f"CV Style EN criado: {cv_en.name}", 'success')
            
            cv_pt = self.create_cv_style(data, 'PT')
            self.log(f"CV Style PT criado: {cv_pt.name}", 'success')
            
            # Atualizar brands-config.js
            self.update_brands_config(data)
            
            print("\n" + "="*50)
            print("🎉 TEMPLATES CRIADOS COM SUCESSO!")
            print("="*50)
            print("\n📋 Próximos passos:")
            print("   1. Execute 'python validate-project.py' para validar")
            print("   2. Teste os templates nos dois idiomas")
            print("   3. Personalize o conteúdo específico da empresa")
            print("   4. Adicione logo se disponível")
            print("\n✅ Arquivos criados:")
            print(f"   - templates/companies/{data['empresa_lower']}.html")
            print(f"   - templates/companies/{data['empresa_lower']}_pt.html")
            print(f"   - cv_styles/cv_{data['empresa_lower']}_style_EN.html")
            print(f"   - cv_styles/cv_{data['empresa_lower']}_style_PT.html")
            
        except Exception as e:
            self.log(f"Erro ao criar templates: {str(e)}", 'error')
            
def main():
    """Função principal"""
    creator = TemplateCreator()
    creator.run()

if __name__ == "__main__":
    main()