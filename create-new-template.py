#!/usr/bin/env python3
"""
CRIADOR DE NOVO TEMPLATE - PEDRO MARCONATO CV
Cria automaticamente novos templates seguindo o padrão oficial.

Uso interativo:      python create-new-template.py
Uso não-interativo:  python create-new-template.py <Empresa> <#primaria> <#secundaria> <#destaque>

Arquivos gerados/atualizados para cada empresa:
  templates/companies/<empresa>.html      (página EN)
  templates/companies/<empresa>_pt.html   (página PT)
  cv_styles/cv_<empresa>_style_EN.html    (impressão EN — currículo clássico ESTÁTICO, branded)
  cv_styles/cv_<empresa>_style_PT.html    (impressão PT — currículo clássico ESTÁTICO, branded)
  assets/js/brands-config.js              (cores/gradiente da marca)
  index.html                              (companyMappings — busca da home)
"""

import re
import sys
from pathlib import Path
from string import Template

PAGE_TEMPLATE = Template('''<!DOCTYPE html>
<html lang="$lang">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pedro Marconato - $empresa_display</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        :root {
            /* $empresa_display Official Colors */
            --$empresa_lower-primary: $primary_color;
            --$empresa_lower-secondary: $secondary_color;
            --$empresa_lower-accent: $accent_color;

            /* Applied Colors */
            --primary-color: var(--$empresa_lower-primary);
            --secondary-color: var(--$empresa_lower-secondary);
            --accent-color: var(--$empresa_lower-accent);
            --text-color: #2c3e50;
            --border-color: rgba(0, 0, 0, 0.1);
            --background-gradient: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            color: var(--text-color);
            line-height: 1.6;
            background: #f8f9fa;
            min-height: 100vh;
            position: relative;
            overflow-x: hidden;
        }

        .animated-bg {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 50%, #f8f9fa 100%);
            background-size: 400% 400%;
            animation: gradientShift 20s ease infinite;
            z-index: -2;
        }

        @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        /* Container PADRÃO - 1000px centralizado */
        .cv-container {
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
        }

        .header {
            background: var(--background-gradient);
            color: white;
            padding: 60px 50px;
            text-align: center;
            position: relative;
        }

        .header h1 { font-size: 2.5em; font-weight: 700; margin-bottom: 10px; letter-spacing: -0.5px; }
        .header h2 { font-size: 1.2em; font-weight: 400; opacity: 0.9; margin-bottom: 20px; }

        .contact-info { font-size: 0.95em; opacity: 0.9; line-height: 1.8; }
        .contact-info a {
            color: white;
            text-decoration: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.3);
            transition: border-color 0.3s ease;
        }
        .contact-info a:hover { border-bottom-color: white; }

        .content { padding: 50px; }
        .section { margin-bottom: 40px; }

        .section-title {
            font-size: 1.5em;
            font-weight: 700;
            color: var(--primary-color);
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid var(--border-color);
        }

        /* Skills (markup gerado por renderSkills) */
        .skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
            gap: 30px;
        }
        .tool-item { margin-bottom: 14px; }
        .tool-name {
            display: flex;
            justify-content: space-between;
            font-weight: 500;
            margin-bottom: 5px;
        }
        .tool-percentage { color: var(--accent-color); font-size: 0.85em; font-weight: 600; }
        .dots-container { display: flex; gap: 4px; }
        .dot {
            width: 10px; height: 10px;
            border-radius: 50%;
            background: var(--border-color);
        }
        .dot.filled { background: var(--primary-color); }

        /* Experiência (markup gerado por renderExperienceTimeline) */
        .experience-item {
            position: relative;
            padding: 25px 25px 25px 70px;
            margin-bottom: 25px;
            background: rgba(0, 0, 0, 0.02);
            border-radius: 12px;
            border-left: 4px solid var(--primary-color);
        }
        .job-title {
            font-size: 1.15em;
            font-weight: 700;
            color: var(--primary-color);
            margin-bottom: 4px;
        }
        .job-number {
            position: absolute;
            left: 20px; top: 25px;
            width: 34px; height: 34px;
            border-radius: 50%;
            background: var(--background-gradient);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.9em;
            font-weight: 700;
        }
        .experience-item .company { font-weight: 600; }
        .experience-item .period { font-size: 0.9em; color: var(--accent-color); margin-bottom: 10px; }
        .job-description { margin-bottom: 15px; }

        .achievements-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 12px;
        }
        .achievement-item {
            display: flex;
            gap: 10px;
            padding: 12px;
            background: white;
            border: 1px solid var(--border-color);
            border-radius: 8px;
        }
        .achievement-icon { color: var(--primary-color); font-size: 1.1em; padding-top: 2px; }
        .achievement-title { font-weight: 600; font-size: 0.92em; }
        .achievement-description { font-size: 0.85em; }

        /* Tooltips das experiências (markup gerado por renderTooltip) */
        .tooltip { position: relative; display: inline-block; margin-left: 6px; }
        .tooltip-icon { color: var(--accent-color); font-size: 0.8em; cursor: help; }
        .tooltip-text {
            visibility: hidden;
            opacity: 0;
            position: absolute;
            z-index: 50;
            top: 24px; left: 50%;
            transform: translateX(-50%);
            width: 340px;
            max-width: 80vw;
            background: white;
            color: var(--text-color);
            border: 1px solid var(--border-color);
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
            padding: 15px;
            font-size: 0.8em;
            font-weight: 400;
            text-align: left;
            transition: opacity 0.2s ease;
        }
        .tooltip:hover .tooltip-text { visibility: visible; opacity: 1; }
        .tooltip-header {
            font-weight: 700;
            color: var(--primary-color);
            margin-bottom: 8px;
        }
        .tooltip-section { margin-bottom: 8px; }
        .tooltip-section-title { font-weight: 600; margin-bottom: 3px; }
        .tooltip-list { padding-left: 18px; }

        /* Educação (markup gerado por renderEducation) */
        .education-item {
            padding: 20px;
            margin-bottom: 15px;
            background: rgba(0, 0, 0, 0.02);
            border-radius: 12px;
            border-left: 4px solid var(--accent-color);
        }
        .degree { font-weight: 700; color: var(--primary-color); }
        .university { font-weight: 500; }
        .thesis { font-size: 0.9em; margin-top: 4px; }

        /* Projetos (markup gerado por renderProjects) */
        .project-item {
            padding: 20px;
            margin-bottom: 15px;
            background: rgba(0, 0, 0, 0.02);
            border-radius: 12px;
            border-left: 4px solid var(--secondary-color);
        }
        .project-title { font-weight: 700; color: var(--primary-color); margin-bottom: 6px; }
        .tech-tag {
            display: inline-block;
            padding: 3px 10px;
            margin: 3px 4px 0 0;
            background: var(--background-gradient);
            color: white;
            border-radius: 12px;
            font-size: 0.75em;
            font-weight: 500;
        }

        .cta-button {
            display: inline-block;
            margin-top: 10px;
            padding: 8px 14px;
            background: var(--background-gradient);
            color: white;
            border-radius: 8px;
            text-decoration: none;
            font-size: 0.85em;
        }

        /* Print button — FAB fixo inferior-direito (padrão das referências) */
        .print-button {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(135deg, $primary_color 0%, $secondary_color 100%);
            color: white;
            border: none;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            transition: all 0.3s ease;
            z-index: 100;
        }
        .print-button:hover { transform: scale(1.1); box-shadow: 0 6px 30px rgba(0, 0, 0, 0.4); }
        .print-button i { font-size: 24px; }

        /* Language toggle — pílula fixa superior-direita (padrão das referências) */
        .language-toggle {
            position: fixed;
            top: 30px;
            right: 30px;
            background: rgba(255, 255, 255, 0.96);
            backdrop-filter: blur(10px);
            border-radius: 30px;
            padding: 5px;
            display: flex;
            align-items: center;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
            transition: all 0.3s ease;
            z-index: 100;
        }
        .language-toggle:hover { transform: translateY(-2px); }
        .language-option {
            color: var(--text-color);
            text-decoration: none;
            padding: 8px 20px;
            border-radius: 25px;
            font-size: 14px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 6px;
            transition: all 0.3s ease;
        }
        .language-option.active {
            background: linear-gradient(135deg, $primary_color 0%, $secondary_color 100%);
            color: white;
        }

        /* Responsive */
        @media (max-width: 768px) {
            .cv-container { margin: 10px; border-radius: 15px; }
            .header { padding: 70px 30px 40px; }
            .header h1 { font-size: 2em; }
            .content { padding: 30px; }
            .print-button, .language-toggle {
                position: fixed;
                bottom: 20px;
                top: auto;
            }
            .print-button { right: 20px; }
            .language-toggle { right: auto; left: 20px; }
        }

        /* Print styles */
        @media print {
            body { background: white; }
            .animated-bg, .print-button, .language-toggle { display: none; }
            .cv-container { margin: 0; box-shadow: none; border: none; }
        }
    </style>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <meta name="theme-color" content="$primary_color">
    <meta name="msapplication-TileColor" content="$primary_color">
</head>
<body>
    <div class="animated-bg"></div>

    <!-- Controles fixos fora do container (backdrop-filter quebraria position:fixed) -->
    <div class="language-toggle">
        <a href="$en_filename" class="language-option $en_active">$en_check EN</a>
        <a href="$pt_filename" class="language-option $pt_active">$pt_check PT</a>
    </div>

    <button class="print-button" title="$print_text" onclick="var win = window.open('../../cv_styles/cv_${empresa_lower}_style_$lang_upper.html', '_blank'); win.onload = function() { win.print(); }">
        <i class="fas fa-file-pdf"></i>
    </button>

    <div class="cv-container">
        <header class="header">
            <h1 id="cv-name">PEDRO HENRIQUE LIMA MARCONATO</h1>
            <h2 id="cv-role">$role_text</h2>

            <div class="contact-info">
                <div>
                    <span id="cv-email">pedrohmarconato@gmail.com</span> |
                    <span id="cv-phone">+55 (55) 981147758</span> |
                    <span id="cv-location"><span>Cachoeira do Sul, RS</span></span>
                </div>
                <div>
                    <a href="https://linkedin.com/in/pedrohmarconato" id="cv-linkedin">LinkedIn</a> |
                    <a href="https://github.com/pedrohmarconato" id="cv-repository">$repo_text</a>
                </div>
            </div>
        </header>

        <div class="content">
            <section class="section">
                <h2 class="section-title" id="section-profile">$profile_title</h2>
                <p id="cv-profile">$profile_text</p>
            </section>

            <section class="section">
                <h2 class="section-title" id="section-skills">$skills_title</h2>
                <div class="skills-grid">
                    <div id="skills-strategic"></div>
                    <div id="skills-tools"></div>
                    <div id="skills-emerging"></div>
                </div>
            </section>

            <section class="section">
                <h2 class="section-title" id="section-experience">$experience_title</h2>
                <div id="experience-container"></div>
            </section>

            <section class="section">
                <h2 class="section-title" id="section-education">$education_title</h2>
                <div id="education-container"></div>
            </section>

            <section class="section">
                <h2 class="section-title" id="section-projects">$projects_title</h2>
                <div id="projects-container"></div>
            </section>
        </div>
    </div>

    <!-- SCRIPTS OBRIGATÓRIOS -->
    <script src="../../assets/js/cv-texts.js"></script>
    <script src="../../assets/js/dynamic-favicon.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            var lang = '$lang_code';
            initializeBasicContent(lang);
            renderSkills('skills-strategic', 'strategic', lang);
            renderSkills('skills-tools', 'tools', lang);
            renderSkills('skills-emerging', 'emerging', lang);
            renderExperienceTimeline(lang);
            renderEducation(lang);
            renderProjects(lang);
            initializeModalTexts(lang);
        });
    </script>
</body>
</html>
''')

# Impressão ESTÁTICA (currículo clássico != página): rebranda o currículo
# canônico (cv_boticario_style_{EN,PT}.html) aplicando a camada de marca.
# O conteúdo do currículo mora só na base canônica; a página (dinâmica) e o
# PDF (estático) são propositalmente dois conteúdos distintos.

# Âncoras exatas da base canônica (Boticário) usadas na rebrandização.
_A_TITLE = "<title>Pedro Henrique Marconato - CV</title>"
_A_IMPORT = ("@import url('https://fonts.googleapis.com/css2?"
             "family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;"
             "1,300;1,400;1,500;1,600;1,700&display=swap');")
_A_BODYFONT = ("font-family: 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, "
               "'Segoe UI', Roboto, sans-serif;")
_A_SKILLTAG_BG = "            background: rgba(123, 194, 36, 0.15);"
_A_SKILLTAG_BORDER = "            border: 1px solid rgba(123, 194, 36, 0.3);"
_A_THEME1 = '<meta name="theme-color" content="#011E38">'
_A_THEME2 = '<meta name="msapplication-TileColor" content="#011E38">'
_A_LOGO_CSS = """        .boticario-logo {
            position: absolute;
            bottom: 20px;
            right: 40px;
            width: 160px;
            height: auto;
            opacity: 0.9;
        }"""
_A_LOGO_IMG = ('<img src="../assets/images/boticario.svg" alt="O Boticário" '
               'class="boticario-logo">')


def render_print_scaffold(base, data):
    """Currículo estático da nova empresa a partir da base canônica.

    Scaffold: header escuro (gradiente da marca), fonte Inter, SEM logo. A
    elevação da marca (espelhando uma marca existente) adiciona logo, fontes
    e tratamentos especiais de header (ex.: hero claro/amarelo)."""
    primary = data['primary_color']
    secondary = data['secondary_color']
    accent = data['accent_color']
    display = data['empresa_display']

    def repl(t, old, new, tag):
        if old not in t:
            raise ValueError(f"base canônica sem âncora '{tag}' — impressão não gerada")
        return t.replace(old, new, 1)

    t = base
    t = repl(t, _A_TITLE,
             f"<title>Pedro Henrique Marconato - CV ({display})</title>", "title")
    t = repl(t, _A_IMPORT,
             "@import url('https://fonts.googleapis.com/css2?"
             "family=Inter:wght@300;400;500;600;700&display=swap');", "import")
    root = (
        "        :root {\n"
        f"            /* {display} Colors */\n"
        f"            --primary-color: {primary};\n"
        f"            --secondary-color: {secondary};\n"
        f"            --accent-color: {accent};\n"
        "            --light-accent: #F4F6F9;\n"
        "            --text-color: #2c3e50;\n"
        "            --border-color: rgba(0, 0, 0, 0.12);\n"
        f"            --background-gradient: linear-gradient(135deg, {primary} 0%, {secondary} 100%);\n"
        "        }"
    )
    t2, n = re.subn(r"        :root \{.*?--background-gradient:.*?\n        \}",
                    lambda m: root, t, count=1, flags=re.S)
    if n != 1:
        raise ValueError("base canônica sem âncora ':root' — impressão não gerada")
    t = t2
    t = repl(t, _A_BODYFONT,
             "font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;",
             "bodyfont")
    t = repl(t, _A_SKILLTAG_BG, f"            background: {accent}26;", "tagbg")
    t = repl(t, _A_SKILLTAG_BORDER, f"            border: 1px solid {accent}4D;", "tagborder")
    t = repl(t, _A_THEME1, f'<meta name="theme-color" content="{primary}">', "theme1")
    t = repl(t, _A_THEME2, f'<meta name="msapplication-TileColor" content="{primary}">', "theme2")
    # scaffold sem logo — a elevação da marca insere .brand-logo + <img>
    t = repl(t, _A_LOGO_CSS,
             "        /* logo da marca: adicionar .brand-logo na elevação */", "logo_css")
    t = repl(t, _A_LOGO_IMG, "", "logo_img")
    return t


LANG_CONFIG = {
    'en': {
        'lang': 'en',
        'lang_code': 'en',
        'lang_upper': 'EN',
        'print_text': 'Print CV',
        'role_text': 'CRM Management and Data Intelligence',
        'repo_text': 'Repository',
        'profile_title': 'Professional Profile',
        'profile_text': 'Loading professional profile...',
        'skills_title': 'Skills & Tools',
        'experience_title': 'Professional Experience',
        'education_title': 'Education',
        'projects_title': 'Projects & Innovation',
        'en_active': 'active',
        'pt_active': '',
        'en_check': '<i class="fas fa-check-circle"></i>',
        'pt_check': '',
    },
    'pt': {
        'lang': 'pt-BR',
        'lang_code': 'pt',
        'lang_upper': 'PT',
        'print_text': 'Imprimir CV',
        'role_text': 'Gestão de CRM e Inteligência de Dados',
        'repo_text': 'Repositório',
        'profile_title': 'Perfil Profissional',
        'profile_text': 'Carregando perfil profissional...',
        'skills_title': 'Habilidades e Ferramentas',
        'experience_title': 'Experiência Profissional',
        'education_title': 'Formação Acadêmica',
        'projects_title': 'Projetos e Inovação',
        'en_active': '',
        'pt_active': 'active',
        'en_check': '',
        'pt_check': '<i class="fas fa-check-circle"></i>',
    },
}


class TemplateCreator:
    def __init__(self):
        self.project_root = Path(__file__).parent
        self.templates_dir = self.project_root / 'templates/companies'
        self.cv_styles_dir = self.project_root / 'cv_styles'
        self.index_path = self.project_root / 'index.html'

    def log(self, message, level='info'):
        icons = {'info': 'ℹ️', 'success': '✅', 'warning': '⚠️', 'error': '❌', 'input': '📝'}
        print(f"{icons.get(level, 'ℹ️')} {message}")

    def validate_color(self, color):
        return bool(re.match(r'^#[0-9A-Fa-f]{6}$', color))

    def build_data(self, empresa, primary, secondary, accent):
        empresa_lower = empresa.lower().replace(' ', '-')
        for color in (primary, secondary, accent):
            if not self.validate_color(color):
                raise ValueError(f"Cor inválida: {color} (use #XXXXXX)")
        if (self.templates_dir / f"{empresa_lower}.html").exists():
            raise ValueError(f"Template para {empresa} já existe!")
        return {
            'empresa': empresa,
            'empresa_lower': empresa_lower,
            'empresa_display': empresa,
            'primary_color': primary,
            'secondary_color': secondary,
            'accent_color': accent,
            'en_filename': f"{empresa_lower}.html",
            'pt_filename': f"{empresa_lower}_pt.html",
        }

    def get_user_input(self):
        print("🎯 CRIADOR DE NOVO TEMPLATE")
        print("=" * 50)
        while True:
            empresa = input("📝 Nome da empresa (ex: Google): ").strip()
            if not empresa:
                self.log("Nome da empresa é obrigatório", 'error')
                continue
            print("\n🎨 Cores da marca (formato #XXXXXX)")
            primary = input("📝 Cor primária: ").strip()
            secondary = input("📝 Cor secundária: ").strip()
            accent = input("📝 Cor de destaque: ").strip()
            try:
                return self.build_data(empresa, primary, secondary, accent)
            except ValueError as e:
                self.log(str(e), 'error')

    def create_template(self, data, lang):
        content = PAGE_TEMPLATE.substitute({**data, **LANG_CONFIG[lang]})
        filename = data['pt_filename'] if lang == 'pt' else data['en_filename']
        file_path = self.templates_dir / filename
        file_path.write_text(content, encoding='utf-8')
        return file_path

    def create_cv_style(self, data, lang):
        lang_upper = LANG_CONFIG[lang]['lang_upper']
        base_path = self.cv_styles_dir / f"cv_boticario_style_{lang_upper}.html"
        if not base_path.exists():
            raise FileNotFoundError(
                f"base canônica ausente: {base_path.name} (necessária p/ impressão estática)")
        base = base_path.read_text(encoding='utf-8')
        content = render_print_scaffold(base, data)
        filename = f"cv_{data['empresa_lower']}_style_{lang_upper}.html"
        file_path = self.cv_styles_dir / filename
        file_path.write_text(content, encoding='utf-8')
        return file_path

    def update_brands_config(self, data):
        brands_config_path = self.project_root / 'assets/js/brands-config.js'
        if not brands_config_path.exists():
            self.log("brands-config.js não encontrado", 'warning')
            return
        content = brands_config_path.read_text(encoding='utf-8')
        if re.search(rf"^\s*'?{re.escape(data['empresa_lower'])}'?:", content, re.M):
            self.log(f"{data['empresa_lower']} já existe no brands-config.js", 'warning')
            return
        # chave sempre com aspas: slugs com hífen (ex.: grupo-rbs) quebrariam sem elas
        js_key = f"'{data['empresa_lower']}'"
        new_brand_config = f'''
    {js_key}: {{
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
        insert_position = content.rfind('};')
        if insert_position < 0:
            self.log("Não foi possível atualizar brands-config.js", 'error')
            return
        # garante vírgula após a última entrada existente antes de anexar a nova
        head = content[:insert_position].rstrip()
        if head.endswith('}'):
            head += ','
        new_content = head + '\n' + new_brand_config + '\n' + content[insert_position:]
        brands_config_path.write_text(new_content, encoding='utf-8')
        self.log("brands-config.js atualizado", 'success')

    def update_index_mappings(self, data):
        """Adiciona a empresa ao companyMappings do index.html (busca da home)."""
        if not self.index_path.exists():
            self.log("index.html não encontrado", 'warning')
            return
        content = self.index_path.read_text(encoding='utf-8')
        anchor = 'const companyMappings = {'
        if anchor not in content:
            self.log("companyMappings não encontrado no index.html", 'error')
            return
        en_path = f"templates/companies/{data['en_filename']}"
        pt_path = f"templates/companies/{data['pt_filename']}"
        if en_path in content:
            self.log(f"{en_path} já está no index.html", 'warning')
            return
        keywords_en = sorted({data['empresa_lower'], data['en_filename'],
                              data['empresa'].lower()})
        keywords_pt = sorted({f"{data['empresa_lower']}_pt", data['pt_filename']})
        entry = (f'{anchor}\n'
                 f'  "{en_path}": {keywords_en},\n'
                 f'  "{pt_path}": {keywords_pt},').replace("'", '"')
        content = content.replace(anchor, entry, 1)
        self.index_path.write_text(content, encoding='utf-8')
        self.log("index.html (companyMappings) atualizado", 'success')

    def run(self, data=None):
        if data is None:
            data = self.get_user_input()

        print("\n" + "=" * 50)
        print("📋 CRIANDO TEMPLATES...")
        print("=" * 50)

        en_file = self.create_template(data, 'en')
        self.log(f"Template EN criado: {en_file.name}", 'success')
        pt_file = self.create_template(data, 'pt')
        self.log(f"Template PT criado: {pt_file.name}", 'success')
        cv_en = self.create_cv_style(data, 'en')
        self.log(f"CV Style EN criado: {cv_en.name}", 'success')
        cv_pt = self.create_cv_style(data, 'pt')
        self.log(f"CV Style PT criado: {cv_pt.name}", 'success')
        self.update_brands_config(data)
        self.update_index_mappings(data)

        print("\n" + "=" * 50)
        print("🎉 TEMPLATES CRIADOS COM SUCESSO!")
        print("=" * 50)
        print("\n📋 Próximos passos:")
        print("   1. Execute 'python validate-project.py' para validar")
        print("   2. Teste os templates nos dois idiomas (página e impressão)")
        print("   3. Ajuste cores/detalhes visuais específicos da marca se necessário")
        print("\n✅ Arquivos criados/atualizados:")
        print(f"   - templates/companies/{data['en_filename']}")
        print(f"   - templates/companies/{data['pt_filename']}")
        print(f"   - cv_styles/cv_{data['empresa_lower']}_style_EN.html")
        print(f"   - cv_styles/cv_{data['empresa_lower']}_style_PT.html")
        print("   - assets/js/brands-config.js")
        print("   - index.html (companyMappings)")


def main():
    creator = TemplateCreator()
    if len(sys.argv) == 5:
        data = creator.build_data(sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4])
        creator.run(data)
    elif len(sys.argv) == 1:
        creator.run()
    else:
        print(__doc__)
        sys.exit(1)


if __name__ == "__main__":
    main()
