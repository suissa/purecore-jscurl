# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [0.2.2] - 2026-01-04

### What's Changed

- ✨ feat: Smart Mode! Methods are now optional (GET/POST/PUT inferred from usage)
- 📝 docs: Updated CLI help with new usage examples
- 🏷️ chore: Renamed package to `tscurl`

## [0.2.1] - 2026-01-04

### What's Changed

- ✨ feat: Refactor to `r3q` name and implementation
- ♻️ refactor: Implement Axios-like interface using native `fetch`
- ⚡️ perf: Added optimization for body handling and nominal types
- 🔧 chore: Migrated codebase to TypeScript

## [0.2.0] - 2024-XX-XX

### Adicionado

- ✨ README.md completo com documentação detalhada
- 📝 CHANGELOG.md para rastreamento de versões
- 🔧 .gitignore com configurações padrão

### Documentação

- 📚 Seção "Como Funciona" explicando a arquitetura interna
- 🧪 Seção "Como Testar" com exemplos práticos
- 📖 API Reference completa para todos os métodos HTTP
- 💻 Exemplos de uso para todos os métodos (GET, POST, PUT, DELETE, PATCH)

## [0.1.0] - Versão Inicial

### Adicionado

- ✨ Ferramenta CLI JS-cURL (requrl)
- 🚀 Suporte para métodos HTTP: GET, POST, PUT, DELETE, PATCH
- 🎨 Saída colorida e formatada no terminal
- 🔧 Detecção automática de tipo de conteúdo (JSON/texto)
- 📦 Zero dependências (usa apenas APIs nativas do Node.js)
