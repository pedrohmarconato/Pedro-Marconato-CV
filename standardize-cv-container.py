#!/usr/bin/env python3
"""
🎯 PADRONIZADOR DE CONTAINERS CV
Padroniza todos os templates para usar container de 1000px centralizado

Padrão escolhido: Documento (como Macfor)
- max-width: 1000px
- margin: 30px auto
- Aparência consistente em todas as telas
"""

import os
import re
from pathlib import Path

class ContainerStandardizer:
    def __init__(self):
        self.project_root = Path(__file__).parent
        self.templates_dir = self.project_root / 'templates/companies'
        self.files_updated = 0
        self.files_checked = 0
        
    def log(self, message, level='info'):
        icons = {'info': 'ℹ️', 'success': '✅', 'warning': '⚠️', 'error': '❌'}
        print(f"{icons.get(level, 'ℹ️')} {message}")
        
    def find_cv_container_css(self, content):
        """Encontra a definição CSS do .cv-container"""
        # Padrão para encontrar .cv-container { ... }
        pattern = r'\.cv-container\s*{\s*([^}]+)}'
        matches = list(re.finditer(pattern, content, re.DOTALL))
        
        if not matches:
            return None
            
        # Retorna a primeira ocorrência (não media query)
        for match in matches:
            # Verifica se não está dentro de media query
            before_match = content[:match.start()]
            if '@media' not in before_match.split('\n')[-5:]:  # Últimas 5 linhas antes
                return match
        
        return matches[0] if matches else None
        
    def standardize_container(self, content):
        """Padroniza o container para 1000px centralizado"""
        match = self.find_cv_container_css(content)
        
        if not match:
            self.log(f"Container .cv-container não encontrado", 'warning')
            return content, False
            
        old_css = match.group(0)
        old_properties = match.group(1)
        
        # Extrai propriedades existentes (exceto max-width e margin)
        properties = []
        for line in old_properties.split('\n'):
            line = line.strip()
            if line and not any(prop in line for prop in ['max-width:', 'margin:', 'margin-top:', 'margin-bottom:', 'margin-left:', 'margin-right:']):
                properties.append(line)
        
        # Adiciona propriedades padrão no início
        standard_properties = [
            "max-width: 1000px;",
            "margin: 30px auto;"
        ]
        
        # Combina propriedades
        all_properties = standard_properties + properties
        
        # Remove propriedades duplicadas e vazias
        seen = set()
        final_properties = []
        for prop in all_properties:
            if prop and prop not in seen:
                seen.add(prop)
                final_properties.append(prop)
        
        # Reconstrói o CSS
        new_css = f".cv-container {{\n"
        for prop in final_properties:
            new_css += f"            {prop}\n"
        new_css += "        }"
        
        # Substitui no conteúdo
        new_content = content.replace(old_css, new_css)
        
        return new_content, True
        
    def process_template(self, file_path):
        """Processa um template individual"""
        self.files_checked += 1
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                
            # Verifica se já está padronizado
            if 'max-width: 1000px' in content and 'margin: 30px auto' in content:
                self.log(f"{file_path.name} - Já padronizado", 'success')
                return
                
            # Padroniza o container
            new_content, updated = self.standardize_container(content)
            
            if updated:
                # Salva o arquivo atualizado
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                    
                self.files_updated += 1
                self.log(f"{file_path.name} - Atualizado com sucesso", 'success')
            else:
                self.log(f"{file_path.name} - Não foi possível atualizar", 'error')
                
        except Exception as e:
            self.log(f"{file_path.name} - Erro: {str(e)}", 'error')
            
    def run(self):
        """Executa a padronização em todos os templates"""
        print("🎯 PADRONIZADOR DE CONTAINERS CV")
        print("="*50)
        print("📋 Padrão escolhido: Documento (1000px centralizado)")
        print("="*50)
        print()
        
        # Lista todos os templates HTML
        template_files = list(self.templates_dir.glob('*.html'))
        
        if not template_files:
            self.log("Nenhum template encontrado!", 'error')
            return
            
        self.log(f"Encontrados {len(template_files)} templates para verificar")
        print()
        
        # Processa cada template
        for template_file in sorted(template_files):
            self.process_template(template_file)
            
        print()
        print("="*50)
        print("📊 RESUMO DA PADRONIZAÇÃO")
        print("="*50)
        print(f"✅ Templates verificados: {self.files_checked}")
        print(f"🔄 Templates atualizados: {self.files_updated}")
        print(f"✨ Templates já padronizados: {self.files_checked - self.files_updated}")
        print()
        
        if self.files_updated > 0:
            print("🎉 Padronização concluída com sucesso!")
            print("📝 Todos os templates agora usam container de 1000px centralizado")
        else:
            print("✅ Todos os templates já estavam padronizados!")
            
    def verify_standardization(self):
        """Verifica se todos os templates estão padronizados"""
        print("\n🔍 VERIFICAÇÃO DE PADRONIZAÇÃO")
        print("="*50)
        
        non_standard = []
        
        for template_file in sorted(self.templates_dir.glob('*.html')):
            with open(template_file, 'r', encoding='utf-8') as f:
                content = f.read()
                
            if 'max-width: 1000px' not in content or 'margin: 30px auto' not in content:
                non_standard.append(template_file.name)
                
        if non_standard:
            print("⚠️  Templates não padronizados:")
            for template in non_standard:
                print(f"   - {template}")
        else:
            print("✅ Todos os templates estão padronizados!")
            
        return len(non_standard) == 0

def main():
    """Função principal"""
    standardizer = ContainerStandardizer()
    
    # Executa padronização
    standardizer.run()
    
    # Verifica resultado
    standardizer.verify_standardization()
    
    print("\n💡 Dica: Execute 'python validate-project.py' para validação completa")

if __name__ == "__main__":
    main()