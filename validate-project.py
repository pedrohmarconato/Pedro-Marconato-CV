#!/usr/bin/env python3
"""
🔍 VALIDADOR DO PROJETO PEDRO MARCONATO CV
Verifica se o projeto segue todas as regras estabelecidas

Uso: python validate-project.py
"""

import os
import re
import glob
from datetime import datetime
from pathlib import Path

class ProjectValidator:
    def __init__(self):
        self.errors = []
        self.warnings = []
        self.info = []
        self.project_root = Path(__file__).parent
        
    def log_error(self, message):
        self.errors.append(f"❌ ERRO: {message}")
        
    def log_warning(self, message):
        self.warnings.append(f"⚠️  AVISO: {message}")
        
    def log_info(self, message):
        self.info.append(f"ℹ️  INFO: {message}")

    def validate_file_structure(self):
        """Valida estrutura de diretórios e arquivos"""
        print("🔍 Validando estrutura de arquivos...")
        
        # Verificar diretórios obrigatórios
        required_dirs = [
            'templates/companies',
            'cv_styles', 
            'assets/js',
            'assets/images',
            'assets/css'
        ]
        
        for dir_path in required_dirs:
            full_path = self.project_root / dir_path
            if not full_path.exists():
                self.log_error(f"Diretório obrigatório não encontrado: {dir_path}")
            else:
                self.log_info(f"Diretório OK: {dir_path}")
        
        # Verificar arquivos proibidos
        forbidden_patterns = [
            '*_backup.html',
            'templates/companies/*.py',
            'templates/companies/*.sh',
            'templates/companies/*.txt',
            'test-*.html',
            '*-transition.html'
        ]
        
        for pattern in forbidden_patterns:
            matches = list(self.project_root.glob(pattern))
            for match in matches:
                self.log_error(f"Arquivo proibido encontrado: {match.relative_to(self.project_root)}")

    def validate_templates(self):
        """Valida templates HTML"""
        print("🔍 Validando templates...")
        
        template_files = list((self.project_root / 'templates/companies').glob('*.html'))
        
        for template_file in template_files:
            self.validate_single_template(template_file)
            
        # Verificar consistência PT/EN
        companies = set()
        for template_file in template_files:
            name = template_file.stem
            if name.endswith('_pt'):
                companies.add(name[:-3])  # Remove '_pt'
            else:
                companies.add(name)
                
        for company in companies:
            en_file = self.project_root / 'templates/companies' / f'{company}.html'
            pt_file = self.project_root / 'templates/companies' / f'{company}_pt.html'
            
            if not en_file.exists():
                self.log_error(f"Template EN não encontrado para: {company}")
            if not pt_file.exists():
                self.log_error(f"Template PT não encontrado para: {company}")
                
        self.log_info(f"Total de empresas encontradas: {len(companies)}")

    def validate_single_template(self, template_file):
        """Valida um template específico"""
        try:
            with open(template_file, 'r', encoding='utf-8') as f:
                content = f.read()
                
            template_name = template_file.stem
            
            # Verificar IDs obrigatórios
            required_ids = [
                'cv-name', 'cv-role', 'cv-email', 'cv-phone', 
                'cv-location', 'cv-linkedin', 'cv-repository',
                'section-skills', 'section-experience', 
                'section-education', 'section-projects'
            ]
            
            for required_id in required_ids:
                if f'id="{required_id}"' not in content:
                    self.log_error(f"ID obrigatório '{required_id}' não encontrado em {template_name}")
                    
            # Verificar scripts obrigatórios
            required_scripts = [
                'cv-texts.js',
                'dynamic-favicon.js'
            ]
            
            for script in required_scripts:
                if script not in content:
                    self.log_error(f"Script obrigatório '{script}' não encontrado em {template_name}")
                    
            # Verificar variáveis CSS incorretas
            wrong_css_patterns = [
                r'--sicredi-green.*:',
                r'--sicredi-dark.*:',
                r'--ifood-.*:.*#(?!EA1D2C|C41826)',  # Cores incorretas para iFood
            ]
            
            for pattern in wrong_css_patterns:
                matches = re.findall(pattern, content, re.IGNORECASE)
                if matches:
                    self.log_warning(f"Possível variável CSS incorreta em {template_name}: {matches}")
                    
            # Verificar DOCTYPE e estrutura básica
            if '<!DOCTYPE html>' not in content:
                self.log_error(f"DOCTYPE ausente em {template_name}")
                
            # Verificar idioma correto
            if template_name.endswith('_pt'):
                if 'lang="pt-BR"' not in content:
                    self.log_warning(f"Idioma PT-BR não definido em {template_name}")
            else:
                if 'lang="en"' not in content:
                    self.log_warning(f"Idioma EN não definido em {template_name}")
                    
        except Exception as e:
            self.log_error(f"Erro ao validar {template_file}: {str(e)}")

    def validate_cv_styles(self):
        """Valida arquivos cv_styles"""
        print("🔍 Validando cv_styles...")
        
        cv_style_files = list((self.project_root / 'cv_styles').glob('*.html'))
        template_files = list((self.project_root / 'templates/companies').glob('*.html'))
        
        # Para cada template, deve existir um cv_style correspondente
        for template_file in template_files:
            template_name = template_file.stem
            
            if template_name.endswith('_pt'):
                expected_cv_style = f"cv_{template_name[:-3]}_style_PT.html"
            else:
                expected_cv_style = f"cv_{template_name}_style_EN.html"
                
            cv_style_path = self.project_root / 'cv_styles' / expected_cv_style
            
            if not cv_style_path.exists():
                self.log_warning(f"cv_style não encontrado para {template_name}: {expected_cv_style}")
                
        self.log_info(f"Total de cv_styles encontrados: {len(cv_style_files)}")

    def validate_assets(self):
        """Valida assets (JS, CSS, imagens)"""
        print("🔍 Validando assets...")
        
        # Verificar arquivos JS obrigatórios
        required_js = [
            'assets/js/cv-texts.js',
            'assets/js/dynamic-favicon.js',
            'assets/js/brands-config.js'
        ]
        
        for js_file in required_js:
            full_path = self.project_root / js_file
            if not full_path.exists():
                self.log_error(f"Arquivo JS obrigatório não encontrado: {js_file}")
            else:
                self.log_info(f"JS OK: {js_file}")

    def validate_brands_config(self):
        """Valida brands-config.js"""
        print("🔍 Validando brands-config.js...")
        
        brands_config_path = self.project_root / 'assets/js/brands-config.js'
        
        if not brands_config_path.exists():
            self.log_error("brands-config.js não encontrado")
            return
            
        try:
            with open(brands_config_path, 'r', encoding='utf-8') as f:
                content = f.read()
                
            # Verificar se há referências a logos inexistentes
            logo_references = re.findall(r"logo: ['\"]([^'\"]+)['\"]", content)
            
            for logo_ref in logo_references:
                if logo_ref and logo_ref != 'null':
                    # Converter path relativo para absoluto
                    logo_path = self.project_root / logo_ref.replace('../', '')
                    if not logo_path.exists():
                        self.log_warning(f"Logo referenciado mas não encontrado: {logo_ref}")
                        
        except Exception as e:
            self.log_error(f"Erro ao validar brands-config.js: {str(e)}")

    def check_documentation(self):
        """Verifica documentação"""
        print("🔍 Validando documentação...")
        
        required_docs = [
            'README.md',
            'REGRAS_PROJETO.md',
            'DIAGRAMA_COMPONENTES.md'
        ]
        
        for doc in required_docs:
            doc_path = self.project_root / doc
            if not doc_path.exists():
                self.log_error(f"Documentação obrigatória não encontrada: {doc}")
            else:
                self.log_info(f"Documentação OK: {doc}")

    def generate_report(self):
        """Gera relatório final"""
        print("\n" + "="*60)
        print("📊 RELATÓRIO DE VALIDAÇÃO")
        print("="*60)
        print(f"⏰ Data/Hora: {datetime.now().strftime('%d/%m/%Y %H:%M:%S')}")
        print(f"📁 Projeto: {self.project_root}")
        print()
        
        # Estatísticas
        total_issues = len(self.errors) + len(self.warnings)
        print(f"📊 ESTATÍSTICAS:")
        print(f"   ❌ Erros: {len(self.errors)}")
        print(f"   ⚠️  Avisos: {len(self.warnings)}")
        print(f"   ℹ️  Informações: {len(self.info)}")
        print(f"   📋 Total de problemas: {total_issues}")
        print()
        
        # Exibir problemas
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
        
        # Status final
        if self.errors:
            print("🚨 STATUS: FALHA - Erros críticos encontrados!")
            print("   ➡️  Corrija os erros antes de fazer commit")
            return False
        elif self.warnings:
            print("⚠️  STATUS: ATENÇÃO - Avisos encontrados")
            print("   ➡️  Revise os avisos, mas pode prosseguir")
            return True
        else:
            print("✅ STATUS: SUCESSO - Projeto conforme as regras!")
            print("   ➡️  Pode fazer commit com segurança")
            return True

    def run_validation(self):
        """Executa todas as validações"""
        print("🛡️  VALIDADOR DO PROJETO PEDRO MARCONATO CV")
        print("="*50)
        
        self.validate_file_structure()
        self.validate_templates()
        self.validate_cv_styles()
        self.validate_assets()
        self.validate_brands_config()
        self.check_documentation()
        
        return self.generate_report()

def main():
    """Função principal"""
    validator = ProjectValidator()
    success = validator.run_validation()
    
    # Exit code para scripts automatizados
    exit(0 if success else 1)

if __name__ == "__main__":
    main()