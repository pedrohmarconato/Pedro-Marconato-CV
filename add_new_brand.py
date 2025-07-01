#!/usr/bin/env python3
"""
Automação para Adicionar Nova Marca ao CV Pedro Marconato
=========================================================

Este script automatiza completamente o processo de adicionar uma nova marca ao sistema.

Uso: python add_new_brand.py

O script irá solicitar:
1. Nome da marca
2. Keywords para busca
3. Cores da marca (primária e secundária)
4. Nome do logo (opcional)
"""

import os
import re
import json
from pathlib import Path

class BrandAutomation:
    def __init__(self):
        self.base_path = Path(__file__).parent
        self.templates_path = self.base_path / "templates" / "companies"
        self.styles_path = self.base_path / "cv_styles"
        self.index_path = self.base_path / "index.html"
        
    def get_brand_info(self):
        """Coleta informações da nova marca do usuário"""
        print("🚀 AUTOMAÇÃO: Adicionar Nova Marca")
        print("=" * 40)
        
        brand_name = input("Nome da marca (ex: microsoft): ").lower().strip()
        if not brand_name:
            raise ValueError("Nome da marca é obrigatório!")
            
        print(f"\nKeywords para busca (separadas por vírgula)")
        print(f"Exemplo: microsoft, ms, msft, azure")
        keywords_input = input("Keywords: ").lower().strip()
        keywords = [k.strip() for k in keywords_input.split(",") if k.strip()]
        
        print(f"\nCores da marca (formato hex)")
        primary_color = input("Cor primária (ex: #00a1f1): ").strip()
        secondary_color = input("Cor secundária (ex: #0078d4): ").strip()
        
        logo_file = input("Nome do arquivo do logo (opcional, ex: microsoft_logo.svg): ").strip()
        
        return {
            'name': brand_name,
            'keywords': keywords,
            'primary_color': primary_color or '#4A90E2',
            'secondary_color': secondary_color or '#2C5AA0',
            'logo_file': logo_file
        }
    
    def create_html_template(self, brand_info, is_portuguese=False):
        """Cria template HTML baseado no template geral"""
        template_path = self.templates_path / "general.html"
        if is_portuguese:
            template_path = self.templates_path / "general_pt.html"
            
        if not template_path.exists():
            raise FileNotFoundError(f"Template base não encontrado: {template_path}")
            
        with open(template_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Substituições básicas
        replacements = {
            # Cores CSS
            '--primary-blue': brand_info['primary_color'],
            '--secondary-blue': brand_info['secondary_color'],
            '--primary-color': brand_info['primary_color'],
            '--secondary-color': brand_info['secondary_color'],
            '--accent-color': self._lighten_color(brand_info['primary_color']),
            
            # Paths dos arquivos de estilo PDF
            'cv_general_style_EN.html': f"cv_{brand_info['name']}_style_EN.html",
            'cv_general_style.html': f"cv_{brand_info['name']}_style.html",
            
            # Links de navegação
            'general.html': f"{brand_info['name']}.html",
            'general_pt.html': f"{brand_info['name']}_pt.html"
        }
        
        for old, new in replacements.items():
            content = content.replace(old, new)
        
        # Adicionar logo se fornecido
        if brand_info['logo_file']:
            logo_html = f'''
            <img src="../../assets/images/{brand_info['logo_file']}" 
                 alt="{brand_info['name'].title()}" 
                 class="{brand_info['name']}-logo" 
                 style="position: absolute; bottom: 20px; right: 20px; width: 120px; opacity: 0.8;">
            '''
            # Inserir logo antes do fechamento do header
            content = content.replace('</header>', f'    {logo_html}\n        </header>')
        
        return content
    
    def create_pdf_style(self, brand_info, is_english=True):
        """Cria arquivo de estilo PDF baseado no estilo geral"""
        base_file = "cv_general_style_EN.html" if is_english else "cv_general_style.html"
        style_path = self.styles_path / base_file
        
        if not style_path.exists():
            raise FileNotFoundError(f"Estilo base não encontrado: {style_path}")
            
        with open(style_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Substituir cores
        replacements = {
            '#4A90E2': brand_info['primary_color'],
            '#2C5AA0': brand_info['secondary_color'],
            '--primary-blue': brand_info['primary_color'],
            '--secondary-blue': brand_info['secondary_color']
        }
        
        for old, new in replacements.items():
            content = content.replace(old, new)
            
        return content
    
    def update_index_mapping(self, brand_info):
        """Atualiza o mapeamento no index.html"""
        with open(self.index_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Encontrar a seção companyMappings
        pattern = r"(const companyMappings = \{[^}]+)\s*\};"
        match = re.search(pattern, content, re.DOTALL)
        
        if not match:
            raise ValueError("Não foi possível encontrar companyMappings no index.html")
        
        # Adicionar nova entrada
        new_mapping = f"'templates/companies/{brand_info['name']}.html': {json.dumps(brand_info['keywords'])}"
        
        # Substituir o mapeamento
        old_mappings = match.group(1)
        new_mappings = old_mappings + f",\n                {new_mapping}"
        
        updated_content = content.replace(old_mappings + "            };", new_mappings + "\n            };")
        
        return updated_content
    
    def _lighten_color(self, hex_color):
        """Clareia uma cor hex para criar accent color"""
        if not hex_color.startswith('#'):
            return '#6BA3E5'  # fallback
            
        try:
            # Remove # e converte para RGB
            hex_color = hex_color[1:]
            r = int(hex_color[0:2], 16)
            g = int(hex_color[2:4], 16) 
            b = int(hex_color[4:6], 16)
            
            # Clareia em 20%
            r = min(255, int(r * 1.2))
            g = min(255, int(g * 1.2))
            b = min(255, int(b * 1.2))
            
            return f"#{r:02x}{g:02x}{b:02x}"
        except:
            return '#6BA3E5'  # fallback
    
    def create_brand_files(self, brand_info):
        """Cria todos os arquivos necessários para a nova marca"""
        print(f"\n📁 Criando arquivos para {brand_info['name'].title()}...")
        
        files_created = []
        
        # 1. Template HTML em inglês
        html_en = self.create_html_template(brand_info, is_portuguese=False)
        html_en_path = self.templates_path / f"{brand_info['name']}.html"
        with open(html_en_path, 'w', encoding='utf-8') as f:
            f.write(html_en)
        files_created.append(str(html_en_path))
        
        # 2. Template HTML em português
        html_pt = self.create_html_template(brand_info, is_portuguese=True)
        html_pt_path = self.templates_path / f"{brand_info['name']}_pt.html"
        with open(html_pt_path, 'w', encoding='utf-8') as f:
            f.write(html_pt)
        files_created.append(str(html_pt_path))
        
        # 3. Estilo PDF em inglês
        pdf_en = self.create_pdf_style(brand_info, is_english=True)
        pdf_en_path = self.styles_path / f"cv_{brand_info['name']}_style_EN.html"
        with open(pdf_en_path, 'w', encoding='utf-8') as f:
            f.write(pdf_en)
        files_created.append(str(pdf_en_path))
        
        # 4. Estilo PDF em português
        pdf_pt = self.create_pdf_style(brand_info, is_english=False)
        pdf_pt_path = self.styles_path / f"cv_{brand_info['name']}_style.html"
        with open(pdf_pt_path, 'w', encoding='utf-8') as f:
            f.write(pdf_pt)
        files_created.append(str(pdf_pt_path))
        
        # 5. Atualizar index.html
        updated_index = self.update_index_mapping(brand_info)
        with open(self.index_path, 'w', encoding='utf-8') as f:
            f.write(updated_index)
        files_created.append(str(self.index_path))
        
        return files_created
    
    def run(self):
        """Executa a automação completa"""
        try:
            # Coletar informações
            brand_info = self.get_brand_info()
            
            # Confirmar dados
            print(f"\n📋 RESUMO:")
            print(f"Marca: {brand_info['name'].title()}")
            print(f"Keywords: {', '.join(brand_info['keywords'])}")
            print(f"Cor primária: {brand_info['primary_color']}")
            print(f"Cor secundária: {brand_info['secondary_color']}")
            if brand_info['logo_file']:
                print(f"Logo: {brand_info['logo_file']}")
            
            confirm = input(f"\n✅ Confirma criação? (y/N): ").lower().strip()
            if confirm != 'y':
                print("❌ Operação cancelada.")
                return
            
            # Criar arquivos
            files_created = self.create_brand_files(brand_info)
            
            # Sucesso!
            print(f"\n🎉 SUCESSO! Marca {brand_info['name'].title()} adicionada!")
            print(f"\n📄 Arquivos criados:")
            for file_path in files_created:
                print(f"  ✓ {file_path}")
            
            print(f"\n🔗 URLs disponíveis:")
            print(f"  • http://localhost/templates/companies/{brand_info['name']}.html")
            print(f"  • http://localhost/templates/companies/{brand_info['name']}_pt.html")
            
            print(f"\n🏷️  Para testar no index, digite qualquer uma dessas palavras:")
            print(f"  {', '.join(brand_info['keywords'])}")
            
            if brand_info['logo_file']:
                print(f"\n📸 LEMBRETE: Adicione o arquivo {brand_info['logo_file']} na pasta assets/images/")
                
        except Exception as e:
            print(f"\n❌ ERRO: {e}")
            return 1
        
        return 0

if __name__ == "__main__":
    automation = BrandAutomation()
    exit(automation.run())