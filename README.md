<p align="center">
<img src="https://i.imgur.com/kGxA3FO.png" />
</p>

> **Uma ferramenta CLI poderosa para fazer requisições HTTP usando sintaxe JavaScript pura!**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)

## 📖 Sobre o Projeto

O **requrl** (também conhecido como `jsurl`) é uma ferramenta de linha de comando que permite fazer requisições HTTP usando JavaScript diretamente no terminal. Ao invés de decorar sintaxes complexas de cURL ou usar ferramentas com configurações verbosas, você pode usar JavaScript puro e familiar!

### ✨ Por que usar requrl?

- 🎯 **Sintaxe JavaScript familiar** - Use `await`, objetos, arrays, tudo que você já conhece
- 🚀 **Rápido e direto** - Execute requisições complexas em uma única linha
- 🎨 **Saída colorida e formatada** - Resultados bonitos e legíveis no terminal
- 🔧 **Flexível** - Suporta todos os métodos HTTP (GET, POST, PUT, DELETE, PATCH)
- 📦 **Zero dependências** - Usa apenas APIs nativas do Node.js

## 🚀 Instalação

### Instalação Local para Desenvolvimento (Recomendado para testar)

Se você clonou ou baixou este repositório, pode instalar localmente:

```bash
# Usando npm
npm link

# Ou usando bun
bun link
```

Isso criará os comandos `requrl` e `jscurl` globalmente apontando para este diretório.

### Instalação Global (Quando publicado no npm)

```bash
npm install -g @purecore/requrl
```

Ou usando `bun`:

```bash
bun install -g @purecore/requrl
```

### Uso Direto (Sem instalação)

Você também pode usar diretamente com Node.js:

```bash
node requrl.js "await req.get('https://api.github.com/users/octocat')"
```

## 💻 Como Usar

### Uso Básico

Após a instalação, você pode usar o comando `jscurl` ou `requrl`:

```bash
# GET simples
jscurl "await req.get('https://api.github.com/users/octocat')"

# POST com body
jscurl "await req.post('https://api.example.com/users', { name: 'João', age: 30 })"

# Com headers customizados
jscurl "await req.get('https://api.example.com/data', { headers: { 'Authorization': 'Bearer token123' } })"
```

### Exemplos Completos

#### 1. GET Request Simples

```bash
jscurl "await req.get('https://jsonplaceholder.typicode.com/posts/1')"
```

#### 2. POST Request com JSON

```bash
jscurl "await req.post('https://jsonplaceholder.typicode.com/posts', { title: 'Meu Post', body: 'Conteúdo do post', userId: 1 })"
```

#### 3. PUT Request

```bash
jscurl "await req.put('https://jsonplaceholder.typicode.com/posts/1', { id: 1, title: 'Título Atualizado', body: 'Novo conteúdo', userId: 1 })"
```

#### 4. DELETE Request

```bash
jscurl "await req.delete('https://jsonplaceholder.typicode.com/posts/1')"
```

#### 5. PATCH Request

```bash
jscurl "await req.patch('https://jsonplaceholder.typicode.com/posts/1', { title: 'Apenas título atualizado' })"
```

#### 6. Com Headers Customizados

```bash
jscurl "await req.get('https://api.github.com/user', { headers: { 'Authorization': 'token ghp_xxxxxxxxxxxx', 'Accept': 'application/vnd.github.v3+json' } })"
```

#### 7. Com Opções Adicionais do Fetch

```bash
jscurl "await req.get('https://api.example.com/data', { headers: { 'X-Custom-Header': 'valor' }, redirect: 'follow' })"
```

## 🏗️ Como Funciona

O requrl funciona de forma inteligente e elegante:

1. **Parser de Código JavaScript**: O comando recebe uma string contendo código JavaScript válido
2. **AsyncFunction**: Usa `AsyncFunction` do JavaScript para executar código assíncrono dinamicamente
3. **Objeto `req`**: Expõe métodos HTTP simplificados (`get`, `post`, `put`, `delete`, `patch`)
4. **Fetch API Nativa**: Utiliza a API `fetch` nativa do Node.js (disponível a partir do Node.js 18+)
5. **Formatação Inteligente**: Detecta automaticamente o tipo de conteúdo e formata a resposta (JSON ou texto)
6. **Saída Colorida**: Usa códigos ANSI para colorir e formatar a saída no terminal

### Arquitetura Interna

```text
┌─────────────────┐
│  Terminal CLI   │
│  (jscurl cmd)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Code Parser     │
│  (AsyncFunction) │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  req Object      │
│  (HTTP Methods)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Fetch API       │
│  (Native Node)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Formatter       │
│  (Colors/JSON)   │
└─────────────────┘
```

## 🧪 Como Testar

### Testes Manuais

Você pode testar a ferramenta com APIs públicas:

```bash
# Teste com JSONPlaceholder
jscurl "await req.get('https://jsonplaceholder.typicode.com/posts/1')"

# Teste com GitHub API
jscurl "await req.get('https://api.github.com/users/octocat')"

# Teste POST
jscurl "await req.post('https://jsonplaceholder.typicode.com/posts', { title: 'Test', body: 'Test body', userId: 1 })"
```

### Estrutura de Resposta

A ferramenta retorna um objeto padronizado:

```javascript
{
  status: 200,
  statusText: 'OK',
  headers: { /* todos os headers da resposta */ },
  data: { /* corpo da resposta (JSON ou texto) */ }
}
```

### Tratamento de Erros

Em caso de erro, a resposta incluirá:

```javascript
{
  error: "Mensagem de erro descritiva"
}
```

## 🔧 Desenvolvimento

### Pré-requisitos

- Node.js 18+ (para suporte nativo ao `fetch`)
- npm ou bun

### Estrutura do Projeto

```text
jscurl/
├── requrl.js      # Código principal
├── package.json     # Configurações do pacote
└── README.md       # Este arquivo
```

### Como Foi Feito

O requrl foi desenvolvido com foco em simplicidade e poder:

1. **Shebang Line**: `#!/usr/bin/env node` permite executar o arquivo diretamente
2. **Bin Configuration**: O `package.json` define os comandos `requrl` e `jscurl` no campo `bin`
3. **AsyncFunction**: Permite executar código JavaScript assíncrono dinamicamente, incluindo `await`
4. **Fetch API**: Aproveita a API `fetch` nativa do Node.js 18+, eliminando dependências externas
5. **Detecção de Tipo**: Analisa o header `Content-Type` para decidir entre `JSON.parse()` ou `text()`
6. **Cores ANSI**: Implementa um sistema simples de cores para melhorar a legibilidade

### Características Técnicas

- ✅ **Zero Dependencies**: Usa apenas APIs nativas do Node.js
- ✅ **ES Modules**: Suporta `import/export` (tipo: "module")
- ✅ **Type Detection**: Detecta automaticamente JSON vs texto
- ✅ **Error Handling**: Tratamento robusto de erros com mensagens claras
- ✅ **Flexible Options**: Suporta todas as opções do `fetch` API

## 📚 API Reference

### `req.get(url, options?)`

Faz uma requisição GET.

**Parâmetros:**

- `url` (string): URL da requisição
- `options` (object, opcional): Opções adicionais (headers, etc.)

**Exemplo:**

```bash
jscurl "await req.get('https://api.example.com/data', { headers: { 'Authorization': 'Bearer token' } })"
```

### `req.post(url, body?, options?)`

Faz uma requisição POST.

**Parâmetros:**

- `url` (string): URL da requisição
- `body` (any, opcional): Corpo da requisição (será convertido para JSON se for objeto)
- `options` (object, opcional): Opções adicionais

**Exemplo:**

```bash
jscurl "await req.post('https://api.example.com/users', { name: 'João' })"
```

### `req.put(url, body?, options?)`

Faz uma requisição PUT.

### `req.delete(url, options?)`

Faz uma requisição DELETE.

### `req.patch(url, body?, options?)`

Faz uma requisição PATCH.

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m '✨ feat: Adiciona AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abrir um Pull Request

## 📝 Changelog

Veja todas as mudanças no [CHANGELOG.md](./CHANGELOG.md).

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👤 Autor

suissAI

## 🙏 Agradecimentos

- Node.js pela API `fetch` nativa
- Comunidade JavaScript por toda a inspiração
- Todos os contribuidores que ajudam a melhorar este projeto

## 🔗 Fontes de Informação

- [Node.js Fetch API Documentation](https://nodejs.org/api/globals.html#fetch)
- [MDN Web Docs - Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [npm Package.json Bin Field](https://docs.npmjs.com/cli/v9/configuring-npm/package-json#bin)
- [ANSI Color Codes](https://en.wikipedia.org/wiki/ANSI_escape_code)

---

⭐ **Gostou do projeto? Dê uma estrela!** ⭐
