#!/usr/bin/env python3
"""
🔍 VALIDADOR DO PROJETO PEDRO MARCONATO CV
Verifica se o projeto segue todas as regras estabelecidas (REGRAS_PROJETO.md)

Uso: python validate-project.py
"""

import re
from datetime import datetime
from pathlib import Path

# Funções de inicialização que EXISTEM no cv-texts.js
VALID_INIT_MARKERS = ('initializeBasicContent', 'initializeCV', 'getText')
STUB_SIZE_BYTES = 5000


class ProjectValidator:
    def __init__(self):
        self.errors = []
        self.warnings = []
        self.info = []
        self.project_root = Path(__file__).parent
        self.templates_dir = self.project_root / 'templates/companies'
        self.cv_styles_dir = self.project_root / 'cv_styles'

    def log_error(self, message):
        self.errors.append(f"❌ ERRO: {message}")

    def log_warning(self, message):
        self.warnings.append(f"⚠️  AVISO: {message}")

    def log_info(self, message):
        self.info.append(f"ℹ️  INFO: {message}")

    # ------------------------------------------------------------------
    def validate_file_structure(self):
        """Valida estrutura de diretórios e arquivos"""
        print("🔍 Validando estrutura de arquivos...")

        required_dirs = [
            'templates/companies',
            'cv_styles',
            'assets/js',
            'assets/images',
            'assets/css',
        ]
        for dir_path in required_dirs:
            if not (self.project_root / dir_path).exists():
                self.log_error(f"Diretório obrigatório não encontrado: {dir_path}")
            else:
                self.log_info(f"Diretório OK: {dir_path}")

        # Arquivos proibidos
        forbidden_patterns = [
            '*_backup.html',
            'templates/companies/*.py',
            'templates/companies/*.sh',
            'templates/companies/*.txt',
            'test-*.html',
            '*-transition.html',
        ]
        for pattern in forbidden_patterns:
            for match in self.project_root.glob(pattern):
                self.log_error(f"Arquivo proibido encontrado: {match.relative_to(self.project_root)}")

        # Fonte única do cv-texts.js: só em assets/js/
        strays = [p for p in self.project_root.rglob('cv-texts.js')
                  if p.relative_to(self.project_root).as_posix() != 'assets/js/cv-texts.js'
                  and '.git' not in p.parts]
        for stray in strays:
            self.log_error(f"Cópia proibida do cv-texts.js: {stray.relative_to(self.project_root)} "
                           f"(fonte única é assets/js/cv-texts.js)")

        # Nomenclatura legada de cv_styles (sem sufixo de idioma) é proibida
        for f in self.cv_styles_dir.glob('cv_*_style.html'):
            self.log_error(f"Estilo de impressão com nome legado (sem _EN/_PT): cv_styles/{f.name}")

    # ------------------------------------------------------------------
    def validate_templates(self):
        """Valida templates HTML"""
        print("🔍 Validando templates...")

        template_files = sorted(self.templates_dir.glob('*.html'))
        companies = set()
        for template_file in template_files:
            self.validate_single_template(template_file)
            name = template_file.stem
            companies.add(name[:-3] if name.endswith('_pt') else name)

        # Consistência PT/EN
        for company in sorted(companies):
            if not (self.templates_dir / f'{company}.html').exists():
                self.log_error(f"Template EN não encontrado para: {company}")
            if not (self.templates_dir / f'{company}_pt.html').exists():
                self.log_error(f"Template PT não encontrado para: {company}")

        self.companies = companies
        self.log_info(f"Total de empresas encontradas: {len(companies)}")

    def validate_single_template(self, template_file):
        try:
            content = template_file.read_text(encoding='utf-8')
        except Exception as e:
            self.log_error(f"Erro ao ler {template_file.name}: {e}")
            return

        name = template_file.stem
        company = name[:-3] if name.endswith('_pt') else name
        lang_suffix = 'PT' if name.endswith('_pt') else 'EN'

        # IDs obrigatórios
        required_ids = [
            'cv-name', 'cv-role', 'cv-email', 'cv-phone',
            'cv-location', 'cv-linkedin', 'cv-repository',
            'section-skills', 'section-experience',
            'section-education', 'section-projects',
        ]
        for required_id in required_ids:
            if f'id="{required_id}"' not in content:
                self.log_error(f"ID obrigatório '{required_id}' não encontrado em {name}")
        if 'id="cv-profile"' not in content:
            self.log_warning(f"ID 'cv-profile' ausente em {name} (usa variação fora do padrão)")

        # Scripts obrigatórios — caminho correto (assets/js)
        if 'assets/js/cv-texts.js' not in content:
            self.log_error(f"Script obrigatório 'assets/js/cv-texts.js' não referenciado em {name}")
        if re.search(r'src="\.\./\.\./cv-texts\.js"', content):
            self.log_error(f"{name} referencia cv-texts.js na raiz (deve ser assets/js/cv-texts.js)")
        if 'dynamic-favicon.js' not in content:
            self.log_error(f"Script obrigatório 'dynamic-favicon.js' não encontrado em {name}")

        # Inicialização: initializeContent() NÃO existe no cv-texts.js
        if re.search(r'\binitializeContent\s*\(', content):
            self.log_error(f"{name} chama initializeContent(), função inexistente "
                           f"(use initializeBasicContent/renderSkills/render*)")
        if not any(marker in content for marker in VALID_INIT_MARKERS):
            self.log_error(f"{name} não usa nenhuma função de inicialização do cv-texts.js "
                           f"({', '.join(VALID_INIT_MARKERS)})")

        # Botão de impressão: deve apontar para o cv_style do MESMO idioma e existir
        style_refs = set(re.findall(r'cv_styles/(cv_[\w.-]+_style(?:_EN|_PT)?\.html)', content))
        expected_style = f'cv_{company}_style_{lang_suffix}.html'
        if not style_refs:
            self.log_error(f"{name} não referencia nenhum estilo de impressão (cv_styles)")
        else:
            for ref in style_refs:
                if not (self.cv_styles_dir / ref).exists():
                    self.log_error(f"{name} referencia estilo inexistente: {ref}")
                if ref != expected_style:
                    self.log_error(f"{name} imprime {ref} (esperado {expected_style})")

        # DOCTYPE e idioma
        if '<!DOCTYPE html>' not in content:
            self.log_error(f"DOCTYPE ausente em {name}")
        if name.endswith('_pt'):
            if 'lang="pt-BR"' not in content:
                self.log_warning(f"Idioma PT-BR não definido em {name}")
        elif 'lang="en"' not in content:
            self.log_warning(f"Idioma EN não definido em {name}")

        # Caminhos absolutos quebram no subpath do GitHub Pages
        for match in re.findall(r'(?:src|href)="(/[^"]+)"', content):
            self.log_error(f"{name} usa caminho absoluto '{match}' (quebra no GitHub Pages)")

    # ------------------------------------------------------------------
    def validate_cv_styles(self):
        """Valida arquivos cv_styles"""
        print("🔍 Validando cv_styles...")

        cv_style_files = sorted(self.cv_styles_dir.glob('*.html'))

        for template_file in self.templates_dir.glob('*.html'):
            name = template_file.stem
            if name.endswith('_pt'):
                expected = f"cv_{name[:-3]}_style_PT.html"
            else:
                expected = f"cv_{name}_style_EN.html"
            if not (self.cv_styles_dir / expected).exists():
                self.log_error(f"cv_style não encontrado para {name}: {expected}")

        # Stubs: arquivos suspeitosamente pequenos não são um CV imprimível
        for f in cv_style_files:
            if f.stat().st_size < STUB_SIZE_BYTES:
                self.log_warning(f"cv_styles/{f.name} tem só {f.stat().st_size} bytes — possível stub")

        self.log_info(f"Total de cv_styles encontrados: {len(cv_style_files)}")

    # ------------------------------------------------------------------
    def validate_local_references(self):
        """Todo src= local deve resolver para um arquivo existente"""
        print("🔍 Validando referências locais (src=)...")

        pages = (list(self.templates_dir.glob('*.html'))
                 + list(self.cv_styles_dir.glob('*.html'))
                 + [self.project_root / 'index.html'])
        checked = 0
        for page in pages:
            if not page.exists():
                continue
            content = page.read_text(encoding='utf-8', errors='replace')
            for src in re.findall(r'src="([^"]+)"', content):
                if src.startswith(('http', 'data:', '//')) or len(src) > 200:
                    continue
                checked += 1
                target = (page.parent / src).resolve()
                if not target.exists():
                    rel = page.relative_to(self.project_root)
                    self.log_error(f"Referência quebrada em {rel}: {src}")
        self.log_info(f"Referências locais src= verificadas: {checked}")

    # ------------------------------------------------------------------
    def validate_css_variables(self):
        """Variáveis CSS de uma empresa não podem aparecer no template de outra"""
        print("🔍 Validando variáveis CSS entre marcas...")

        companies = getattr(self, 'companies', set())
        for template_file in self.templates_dir.glob('*.html'):
            name = template_file.stem
            company = name[:-3] if name.endswith('_pt') else name
            if company == 'general':
                continue
            content = template_file.read_text(encoding='utf-8', errors='replace')
            declared = set(re.findall(r'--([a-z0-9_-]+?)-[a-z-]+\s*:', content))
            for other in companies - {company, 'general'}:
                if other in declared:
                    self.log_warning(f"{name} define variáveis CSS da marca '{other}'")

    # ------------------------------------------------------------------
    def validate_assets(self):
        """Valida assets (JS obrigatórios)"""
        print("🔍 Validando assets...")
        required_js = [
            'assets/js/cv-texts.js',
            'assets/js/dynamic-favicon.js',
            'assets/js/brands-config.js',
        ]
        for js_file in required_js:
            if not (self.project_root / js_file).exists():
                self.log_error(f"Arquivo JS obrigatório não encontrado: {js_file}")
            else:
                self.log_info(f"JS OK: {js_file}")

    # ------------------------------------------------------------------
    def validate_brands_config(self):
        """Valida brands-config.js (logos consumidos a partir de templates/companies/)"""
        print("🔍 Validando brands-config.js...")

        brands_config_path = self.project_root / 'assets/js/brands-config.js'
        if not brands_config_path.exists():
            self.log_error("brands-config.js não encontrado")
            return

        content = brands_config_path.read_text(encoding='utf-8')
        for logo_ref in re.findall(r"logo: ['\"]([^'\"]+)['\"]", content):
            if not logo_ref or logo_ref == 'null':
                continue
            # Consumidores vivem em templates/companies/ → prefixo correto é ../../
            resolved = (self.templates_dir / logo_ref).resolve()
            if not resolved.exists():
                self.log_warning(f"Logo do brands-config.js não resolve a partir de "
                                 f"templates/companies/: {logo_ref}")

    # ------------------------------------------------------------------
    def check_documentation(self):
        """Verifica documentação"""
        print("🔍 Validando documentação...")
        required_docs = ['README.md', 'REGRAS_PROJETO.md', 'TEMPLATE_PADRAO.md', 'CLAUDE.md']
        for doc in required_docs:
            if not (self.project_root / doc).exists():
                self.log_error(f"Documentação obrigatória não encontrada: {doc}")
            else:
                self.log_info(f"Documentação OK: {doc}")

    # ------------------------------------------------------------------
    def generate_report(self):
        print("\n" + "=" * 60)
        print("📊 RELATÓRIO DE VALIDAÇÃO")
        print("=" * 60)
        print(f"⏰ Data/Hora: {datetime.now().strftime('%d/%m/%Y %H:%M:%S')}")
        print(f"📁 Projeto: {self.project_root}")
        print()

        total_issues = len(self.errors) + len(self.warnings)
        print("📊 ESTATÍSTICAS:")
        print(f"   ❌ Erros: {len(self.errors)}")
        print(f"   ⚠️  Avisos: {len(self.warnings)}")
        print(f"   ℹ️  Informações: {len(self.info)}")
        print(f"   📋 Total de problemas: {total_issues}")
        print()

        if self.errors:
            print("❌ ERROS CRÍTICOS:")
            for error in self.errors:
                print(f"   {error}")
            print()
        if self.warnings:
            print("⚠️  AVISOS:")
            for warning in self.warnings:
                print(f"   {warning}")
            print()
        if self.info:
            print("ℹ️  INFORMAÇÕES:")
            for info in self.info:
                print(f"   {info}")
            print()

        if self.errors:
            print("🚨 STATUS: FALHA - Erros críticos encontrados!")
            print("   ➡️  Corrija os erros antes de fazer commit")
            return False
        if self.warnings:
            print("⚠️  STATUS: ATENÇÃO - Avisos encontrados")
            print("   ➡️  Revise os avisos, mas pode prosseguir")
            return True
        print("✅ STATUS: SUCESSO - Projeto conforme as regras!")
        print("   ➡️  Pode fazer commit com segurança")
        return True

    def run_validation(self):
        print("🛡️  VALIDADOR DO PROJETO PEDRO MARCONATO CV")
        print("=" * 50)
        self.validate_file_structure()
        self.validate_templates()
        self.validate_cv_styles()
        self.validate_local_references()
        self.validate_css_variables()
        self.validate_assets()
        self.validate_brands_config()
        self.check_documentation()
        return self.generate_report()


def main():
    validator = ProjectValidator()
    success = validator.run_validation()
    exit(0 if success else 1)


if __name__ == "__main__":
    main()
